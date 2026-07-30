<?php
namespace Ccl_Plugin\functions\ogp_cache;

use Ccl_Plugin\library\Get_OGP_InWP;

const CACHE_VERSION = 2;
const UPDATE_HOOK = 'ccl_refresh_ogp';
const DEFAULT_TTL = DAY_IN_SECONDS;
const FAILURE_RETRY = 15 * MINUTE_IN_SECONDS;
const LOCK_TTL = 60;
const MIGRATION_VERSION = 2;
const MIGRATION_HOOK = 'ccl_backfill_ogp';
const MIGRATION_BATCH_SIZE = 50;

/**
 * URLをキャッシュキー用に正規化する
 *
 * @param string $url
 * @return string
 */
function normalize_url_for_cache($url) {
	$url   = trim($url);
	$parts = wp_parse_url($url);

	if(!is_array($parts) || empty($parts['scheme']) || empty($parts['host'])) {
		return preg_replace('/#.*$/', '', $url);
	}

	$scheme = strtolower($parts['scheme']);
	$host   = strtolower($parts['host']);
	$port   = $parts['port'] ?? null;
	if(($scheme === 'http' && $port === 80) || ($scheme === 'https' && $port === 443)) {
		$port = null;
	}

	$port  = isset($port) ? ':'.$port : '';
	$path  = empty($parts['path']) ? '/' : $parts['path'];
	$query = isset($parts['query']) ? '?'.$parts['query'] : '';

	return $scheme.'://'.$host.$port.$path.$query;
}

/**
 * @param string $url
 * @return string
 */
function get_cache_key($url) {
	return 'ccl_ogp_v1_'.hash('sha256', normalize_url_for_cache($url));
}

/**
 * 保存済みOGPを取得する。期限切れでも削除せず返す。
 *
 * @param string $url
 * @return array
 */
function get_cache_entry($url) {
	static $request_cache = [];

	$key = get_cache_key($url);
	if(array_key_exists($key, $request_cache)) {
		return $request_cache[$key];
	}

	$cached = get_transient($key);
	if(!is_array($cached)) {
		$request_cache[$key] = [];
		return [];
	}

	// Issue #14のv1キャッシュを読み取り互換で移行する。
	if(($cached['version'] ?? null) === 1 && is_array($cached['data'] ?? null)) {
		$cached = make_entry($url, $cached['data'], 'success', 0);
	}

	if(($cached['version'] ?? null) !== CACHE_VERSION) {
		$request_cache[$key] = [];
		return [];
	}

	$request_cache[$key] = $cached;
	return $cached;
}

/**
 * 描画用の保存済みデータだけを返す（HTTP通信・イベント予約なし）。
 *
 * @param string $url
 * @return array
 */
function get_cached_ogp($url) {
	$entry = get_cache_entry($url);
	return is_array($entry['data'] ?? null) ? $entry['data'] : [];
}

/**
 * @param string $url
 * @param array  $data
 * @param string $status
 * @param int    $fetched_at
 * @return array
 */
function make_entry($url, $data, $status, $fetched_at) {
	$ttl = (int) apply_filters('ccl_ogp_cache_expiration', DEFAULT_TTL, $url, $data);
	if($ttl <= 0) {
		$ttl = DEFAULT_TTL;
	}
	return array(
		'version'     => CACHE_VERSION,
		'url'         => normalize_url_for_cache($url),
		'site_name'   => $data['og:site_name'] ?? '',
		'title'       => $data['og:title'] ?? ($data['title'] ?? ''),
		'description' => $data['og:description'] ?? ($data['description'] ?? ''),
		'thumbnail'   => $data['og:image'] ?? ($data['thumbnail'] ?? ''),
		'favicon'     => get_favicon($data),
		'fetched_at'  => $fetched_at,
		'expires_at'  => $fetched_at + max(1, $ttl),
		'status'      => $status,
		'retry_after' => $status === 'failed' ? $fetched_at + FAILURE_RETRY : 0,
		'data'        => $data,
	);
}

/**
 * @param array $data
 * @return string
 */
function get_favicon($data) {
	$icon = $data['icon'] ?? '';
	if(is_array($icon)) {
		$icon = $icon[0] ?? '';
	}
	return $icon ?: ($data['apple-touch-icon'] ?? '');
}

/**
 * 更新イベントを重複なしで予約する。
 *
 * @param string $url
 * @param bool   $force
 * @return bool
 */
function schedule_refresh($url, $force = false) {
	$url = normalize_url_for_cache($url);
	if(!Get_OGP_InWP::is_safe_url($url)) {
		return false;
	}

	$entry = get_cache_entry($url);
	$now = time();
	if(!$force && !empty($entry)) {
		if(($entry['status'] ?? '') === 'success' && ($entry['expires_at'] ?? 0) > $now) {
			return false;
		}
		if(($entry['status'] ?? '') === 'failed' && ($entry['retry_after'] ?? 0) > $now) {
			return false;
		}
	}

	$args = array($url);
	if(wp_next_scheduled(UPDATE_HOOK, $args)) {
		return false;
	}

	return (bool) wp_schedule_single_event($now + 1, UPDATE_HOOK, $args);
}

/**
 * Cronジョブ: ロック取得後に取得し、成功/失敗状態を保存する。
 *
 * @param string $url
 * @return void
 */
function refresh_ogp($url) {
	$lock_key = get_cache_key($url).'_lock';
	$lock_token = acquire_lock($lock_key);
	if($lock_token === false) {
		return;
	}

	try {
		$result = Get_OGP_InWP::get_result($url);
		$now = time();
		$old = get_cache_entry($url);
		if(is_wp_error($result)) {
			$data = is_array($old['data'] ?? null) ? $old['data'] : [];
			$entry = make_entry($url, $data, 'failed', $now);
			if(!empty($old['fetched_at'])) {
				$entry['fetched_at'] = $old['fetched_at'];
				$entry['expires_at'] = $old['expires_at'] ?? 0;
			}
		} else {
			$entry = make_entry($url, $result, 'success', $now);
		}
		set_transient(get_cache_key($url), $entry);

		// 成功時は有効期限、失敗時はretry_afterに次回更新を予約する。
		$next_at = $entry['status'] === 'success'
			? $entry['expires_at']
			: $entry['retry_after'];
		$args = array(normalize_url_for_cache($url));
		if(!wp_next_scheduled(UPDATE_HOOK, $args)) {
			wp_schedule_single_event($next_at, UPDATE_HOOK, $args);
		}
	} finally {
		release_lock($lock_key, $lock_token);
	}
}

/**
 * add_optionを利用して同一URLの更新ロックを原子的に取得する。
 *
 * @param string $lock_key
 * @return string|false
 */
function acquire_lock($lock_key) {
	$now = time();
	$token = wp_generate_uuid4();
	$value = array(
		'token'      => $token,
		'expires_at' => $now + LOCK_TTL,
	);
	if(add_option($lock_key, $value, '', false)) {
		return $token;
	}

	$current = get_option($lock_key, array());
	$expires_at = is_array($current)
		? (int) ($current['expires_at'] ?? 0)
		: (int) $current;
	if($expires_at >= $now) {
		return false;
	}

	delete_option($lock_key);
	// delete_option()によるDB状態変更をPHPStanは追跡できない。
	// @phpstan-ignore ternary.alwaysFalse
	return add_option($lock_key, $value, '', false) ? $token : false;
}

/**
 * 自身が取得したロックだけを解放する。
 *
 * @param string $lock_key
 * @param string $token
 * @return void
 */
function release_lock($lock_key, $token) {
	$current = get_option($lock_key, array());
	if(is_array($current) && hash_equals((string) ($current['token'] ?? ''), $token)) {
		delete_option($lock_key);
	}
}

/**
 * 投稿内の外部リンクカードを再帰的に抽出して更新予約する。
 *
 * @param array $blocks
 * @return void
 */
function schedule_blocks($blocks) {
	foreach($blocks as $block) {
		if(($block['blockName'] ?? '') === 'custom-card-link/custom-card-link') {
			$url = trim($block['attrs']['url'] ?? '');
			if($url !== '' && url_to_postid($url) === 0) {
				schedule_refresh($url);
			}
		}
		if(!empty($block['innerBlocks'])) {
			schedule_blocks($block['innerBlocks']);
		}
	}
}

add_action(UPDATE_HOOK, __NAMESPACE__.'\\refresh_ogp');
add_action(MIGRATION_HOOK, __NAMESPACE__.'\\backfill_ogp');

/**
 * 既存投稿を小分けに走査し、外部リンクカードの更新を予約する。
 *
 * @param int $page
 * @return void
 */
function backfill_ogp($page = 1) {
	$post_ids = get_posts(array(
		'post_type'              => 'any',
		'post_status'            => array('publish', 'draft', 'pending', 'private', 'future'),
		'fields'                 => 'ids',
		'posts_per_page'         => MIGRATION_BATCH_SIZE,
		'paged'                  => max(1, (int) $page),
		'orderby'                => 'ID',
		'order'                  => 'ASC',
		'no_found_rows'          => true,
		'update_post_meta_cache' => false,
		'update_post_term_cache' => false,
	));

	foreach($post_ids as $post_id) {
		$post = get_post($post_id);
		if($post) {
			schedule_blocks(parse_blocks($post->post_content));
		}
	}

	if(count($post_ids) === MIGRATION_BATCH_SIZE) {
		wp_schedule_single_event(time() + 10, MIGRATION_HOOK, array($page + 1));
	}
}

// アップグレード後の最初の管理画面リクエストで一度だけ移行を開始する。
add_action('admin_init', function() {
	if((int) get_option('ccl_ogp_migration_version', 0) >= MIGRATION_VERSION) {
		return;
	}
	$scheduled = wp_next_scheduled(MIGRATION_HOOK, array(1));
	if(!$scheduled) {
		$scheduled = wp_schedule_single_event(time() + 1, MIGRATION_HOOK, array(1));
	}
	if($scheduled) {
		update_option('ccl_ogp_migration_version', MIGRATION_VERSION, false);
	}
});

add_action('save_post', function($post_id, $post) {
	if(wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
		return;
	}
	schedule_blocks(parse_blocks($post->post_content));
}, 10, 2);
