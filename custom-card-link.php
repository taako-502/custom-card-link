<?php
Namespace Ccl_Plugin;

/*
Plugin Name: Custom Card Link
Plugin URI: https://github.com/taako-502/custom-card-link
Description: 外部リンクを表示するGutenbergブロック
Version: 1.1.6
Author: takao502
Author URI: https://github.com/taako-502
Text Domain: ccl-plugin
Domain Path: /languages
License: GPL2
*/
const OPTION_GROUP                = 'custom-card-link';
const CCL_SLUG                    = 'custom-card-link';
const TEXT_DOMAIN                 = 'ccl-plugin';
const DB_NAME                     = 'custom_card_link_settings';
const MAX_DESCRIPTION_CHAR_OF_NUM = 200; //setting-pc.jsおよびsetting-sp.jsとあわせる

require_once __DIR__ .'/classes/CustomCardLink.php';
require_once __DIR__ .'/library/Get_OGP_InWP/get_ogp_inwp.php';
require_once __DIR__ .'/functions/internal_link.php';
require_once __DIR__ .'/functions/ogp_cache.php';
require_once __DIR__ .'/functions/rest_api.php';
require_once __DIR__ .'/functions/style.php';
require_once __DIR__ .'/functions/data.php';

use function Ccl_Plugin\functions\data\get_setting;
use function Ccl_Plugin\functions\ogp_cache\get_cached_ogp;
use function Ccl_Plugin\functions\ogp_cache\schedule_refresh;

/**
 * 翻訳ファイルの読み込み
 */
add_action('init', function() {
	load_plugin_textdomain(
		TEXT_DOMAIN,
		false,
		// 公式リポジトリに登録する場合は不要
		// basename( plugin_dir_url( __FILE__ ) ) . '/languages'

	);
});

/**
 * 管理画面追加
 */
add_action('admin_menu', function() {
	add_menu_page(
		__('Custom Card Link', 'ccl-plugin'),
		__('Custom Card Link - Settings', 'ccl-plugin'),
		'manage_options',
		OPTION_GROUP,
		function() {
			echo '<div id="ccl-admin"></div>';
		},
		'',
		58
	);
});

/**
 * 管理画面エンキュー
 */
add_action('admin_enqueue_scripts', function($hook_suffix) {
	// 作成したオプションページ以外では読み込まない
	if ( 'toplevel_page_'.OPTION_GROUP !== $hook_suffix ) {
		return;
	}

	// CSSファイルの読み込み
	wp_enqueue_style(
		CCL_SLUG,
		plugin_dir_url( __FILE__ ).'build/admin.css',
		array('wp-components')
	);

	// JavaScriptファイルの読み込み
	$asset_file = include_once ( __DIR__ . '/build/admin.asset.php') ;
	wp_enqueue_script(
		CCL_SLUG,
		plugin_dir_url( __FILE__ ).'build/admin.js',
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);

	// FIXME: うまく読み込めない
	wp_set_script_translations(
		CCL_SLUG,
		TEXT_DOMAIN,
		// 公式リポジトリに登録する場合は不要
		// basename( plugin_dir_url( __FILE__ ) ) . '/languages'
	);
});

/**
 * URLを比較用に正規化する
 *
 * クエリ文字列とフラグメントはページの識別に使用せず、
 * 末尾のスラッシュの有無も同一URLとして扱う。
 *
 * @param string $url
 * @return string
 */
function normalizeUrlForComparison($url) {
	$parts = wp_parse_url(trim($url));
	if(!is_array($parts) || empty($parts['host'])) {
		return '';
	}

	$host = strtolower($parts['host']);
	$scheme = strtolower($parts['scheme'] ?? '');
	$port = $parts['port'] ?? null;
	if(($scheme === 'http' && $port === 80) || ($scheme === 'https' && $port === 443)) {
		$port = null;
	}
	$port = isset($port) ? ':'.$port : '';
	$path = $parts['path'] ?? '/';
	$path = '/'.ltrim($path, '/');
	$path = untrailingslashit($path);

	return $host.$port.$path;
}

/**
 * 指定されたURLが現在表示中のURLか判定する
 *
 * @param string $url
 * @return bool
 */
function isCurrentRequestUrl($url) {
	if(empty($_SERVER['HTTP_HOST']) || empty($_SERVER['REQUEST_URI'])) {
		return false;
	}

	$scheme      = is_ssl() ? 'https://' : 'http://';
	$host        = sanitize_text_field(wp_unslash($_SERVER['HTTP_HOST']));
	$request_uri = wp_unslash($_SERVER['REQUEST_URI']);
	$current_url = $scheme.$host.$request_uri;

	return normalizeUrlForComparison($url) === normalizeUrlForComparison($current_url);
}

/**
 * サーバ側処理
 */
add_action('init', function() {
	register_block_type_from_metadata(__DIR__ . '/build',
		array(
			'render_callback' => function($attributes) {
				//入力チェック
				$url = trim($attributes['url'] ?? '');
				if($url == '') {
					if(!is_singular()) {
						return __('Please enter the URL.', 'ccl-plugin');
					}
					return;
				}

				$post_id = (int) url_to_postid($url);
				if($post_id == 0 && isCurrentRequestUrl($url)) {
					return;
				}
				$is_internal_url = $post_id !== 0 || isInternalSiteUrl($url);
				if($post_id !== 0 && !isPubliclyViewableInternalPost($post_id)) {
					if(
						defined('REST_REQUEST')
						&& REST_REQUEST
						&& current_user_can('edit_posts')
					) {
						return '<p class="ccl__notice">'
							.esc_html__('This link cannot be displayed because the post is not publicly accessible.', 'ccl-plugin')
							.'</p>';
					}
					return '';
				}

				// 内部リンクはWordPressの投稿データを使用するため、HTTPリクエストは不要
				// 投稿IDを解決できない同一サイトURLも、外部OGP取得へ回さない。
				$ogps = !$is_internal_url
					? get_cached_ogp($url)
					: [];

				// エディターのServerSideRenderではURL確定時に非同期更新を予約する。
				// 公開画面の描画経路では予約もHTTP通信も行わない。
				if(
					!$is_internal_url
					&& defined('REST_REQUEST')
					&& REST_REQUEST
					&& current_user_can('edit_posts')
				) {
					schedule_refresh($url);
				}

				//リンク先の情報と設定画面の設定情報をマージ
				/** @var array<string, mixed> $plugin_settings */
				$plugin_settings = get_setting();
				$settings = array_merge($plugin_settings, getLinkInfo($post_id, $ogps, $url));
				$settings['image_sizes'] = getCardImageSizes($plugin_settings);

				//HTMLの作成
				$ccl = new \Ccl_Plugin\classes\CustomCardLink($url, $settings);
				return $ccl->make_ccl();
			},
		)
	);
});

/**
 * カードの実表示幅に合わせたsizes属性を作成する
 *
 * @param array<string, mixed> $settings
 * @return string
 */
function getCardImageSizes($settings) {
	$breakpoint = max(0, (int) ($settings['breakpoint'] ?? 640));
	$desktop = getCardImageSlotSize(
		$settings['layout'] ?? 'card',
		(int) ($settings['max_width'] ?? 600),
		(int) ($settings['padding'] ?? 28)
	);
	$mobile = getCardImageSlotSize(
		$settings['layout_sp'] ?? 'card',
		(int) ($settings['max_width_sp'] ?? 600),
		(int) ($settings['padding_sp'] ?? 28)
	);

	return '(max-width: '.$breakpoint.'px) '.$mobile.', '.$desktop;
}

/**
 * レイアウトごとの画像スロット幅を返す
 *
 * @param string $layout
 * @param int    $max_width
 * @param int    $padding
 * @return string
 */
function getCardImageSlotSize($layout, $max_width, $padding) {
	$content_width = max(1, $max_width - (2 * $padding));
	if($layout === 'list') {
		$maximum = max(1, (int) floor($content_width * 0.3));
		return 'min('.$maximum.'px, 30vw)';
	}
	return 'min('.$content_width.'px, calc(100vw - '.max(0, 2 * $padding).'px))';
}
