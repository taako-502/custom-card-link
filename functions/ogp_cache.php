<?php
namespace Ccl_Plugin\functions\ogp_cache;

use Ccl_Plugin\library\Get_OGP_InWP;

/**
 * OGPキャッシュのキー生成用にURLを正規化する
 *
 * フラグメントはHTTPリクエストに送信されないため除外する。
 * 一方、スキームとクエリ文字列は取得結果に影響する可能性があるため維持する。
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

	$user_info = '';
	if(isset($parts['user'])) {
		$user_info = $parts['user'];
		if(isset($parts['pass'])) {
			$user_info .= ':'.$parts['pass'];
		}
		$user_info .= '@';
	}

	$port  = isset($port) ? ':'.$port : '';
	$path  = empty($parts['path']) ? '/' : $parts['path'];
	$query = isset($parts['query']) ? '?'.$parts['query'] : '';

	return $scheme.'://'.$user_info.$host.$port.$path.$query;
}

/**
 * OGPキャッシュのキーを取得する
 *
 * @param string $url
 * @return string
 */
function get_cache_key($url) {
	return 'ccl_ogp_v1_'.hash('sha256', normalize_url_for_cache($url));
}

/**
 * キャッシュを考慮して外部URLのOGP情報を取得する
 *
 * 同一リクエスト内では静的変数の値を再利用し、リクエストをまたぐ場合は
 * WordPress Transientに保存した値を再利用する。
 *
 * @param string $url
 * @return array
 */
function get_cached_ogp($url) {
	static $request_cache = [];

	$cache_key = get_cache_key($url);
	if(array_key_exists($cache_key, $request_cache)) {
		return $request_cache[$cache_key];
	}

	$cached = get_transient($cache_key);
	if(
		is_array($cached)
		&& ($cached['version'] ?? null) === 1
		&& isset($cached['data'])
		&& is_array($cached['data'])
	) {
		$request_cache[$cache_key] = $cached['data'];
		return $request_cache[$cache_key];
	}

	$ogps = Get_OGP_InWP::get($url);

	$request_cache[$cache_key] = $ogps;

	$default_expiration = empty($ogps)
		? 5 * MINUTE_IN_SECONDS
		: DAY_IN_SECONDS;

	/**
	 * OGP情報をキャッシュする期間を変更する
	 *
	 * 0以下を返すとTransientへの保存を無効化する。
	 *
	 * @param int    $default_expiration キャッシュ期間（秒）
	 * @param string $url                取得対象のURL
	 * @param array  $ogps               取得したOGP情報
	 */
	$expiration = (int) apply_filters(
		'ccl_ogp_cache_expiration',
		$default_expiration,
		$url,
		$ogps
	);

	if($expiration > 0) {
		set_transient(
			$cache_key,
			array(
				'version' => 1,
				'data'    => $ogps,
			),
			$expiration
		);
	}

	return $request_cache[$cache_key];
}
