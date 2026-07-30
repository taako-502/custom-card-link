<?php
Namespace Ccl_Plugin;

/*
Plugin Name: Custom Card Link
Plugin URI: https://github.com/taako-502/custom-card-link
Description: 外部リンクを表示するGutenbergブロック
Version: 1.1.2
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
	wp_enqueue_media();
	$asset_file = include_once ( __DIR__ . '/build/admin.asset.php') ;
	$dependencies = array_unique(
		array_merge($asset_file['dependencies'], array('wp-api'))
	);
	wp_enqueue_script(
		CCL_SLUG,
		plugin_dir_url( __FILE__ ).'build/admin.js',
		$dependencies,
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

				$post_id = url_to_postid($url);
				if($post_id == 0 && isCurrentRequestUrl($url)) {
					return;
				}

				// 内部リンクはWordPressの投稿データを使用するため、HTTPリクエストは不要
				$ogps = $post_id == 0
					? get_cached_ogp($url)
					: [];

				// エディターのServerSideRenderではURL確定時に非同期更新を予約する。
				// 公開画面の描画経路では予約もHTTP通信も行わない。
				if(
					$post_id === 0
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
 * リンク先の情報を取得する
 * @param  int    $post_id
 * @param  array  $ogps
 * @param  string $url
 * @return array
 */
function getLinkInfo($post_id, $ogps, $url = '') {
	if($post_id != 0) {
		//内部リンクの場合
		$image_id       = (int) get_post_thumbnail_id($post_id);
		$image          = (string) get_the_post_thumbnail_url($post_id, 'large');
		$image_width    = 0;
		$image_height   = 0;
		$post_title     = get_the_title($post_id );
		$description    = getDescription($post_id, MAX_DESCRIPTION_CHAR_OF_NUM);
		$description_sp = getDescription($post_id, MAX_DESCRIPTION_CHAR_OF_NUM);
		$link_type      = 'internal';
	} else {
		//外部リンク
		$image_id       = 0;
		$image          = $ogps['og:image'] ?? '';
		$image_width    = getPositiveImageDimension($ogps['og:image:width'] ?? 0);
		$image_height   = getPositiveImageDimension($ogps['og:image:height'] ?? 0);
		$post_title     = $ogps['og:title'] ?? ($ogps['title'] ?? '');
		$description    = $ogps['og:description'] ?? ($ogps['description'] ?? '');
		if($post_title === '') {
			$post_title = wp_parse_url($url, PHP_URL_HOST) ?: $url;
		}
		$description_sp = $description;
		$link_type      = 'external';
	}
	return array(
		'image'       => $image,
		'image_id'    => $image_id,
		'image_width' => $image_width,
		'image_height' => $image_height,
		'link_type'   => $link_type,
		'title'       => $post_title,
		'description' => $description,
	);
}

/**
 * OGP画像寸法を正の整数へ正規化する
 *
 * @param mixed $value
 * @return int
 */
function getPositiveImageDimension($value) {
	$value = filter_var($value, FILTER_VALIDATE_INT, array('options' => array('min_range' => 1)));
	return $value === false ? 0 : $value;
}

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

/**
 * 記事情報をディスクリプションに変換
 * @param  int     $id  記事ID
 * @param  integer $len 文字数
 * @return string           ディスクリプション
 */
function getDescription($id, $len){
	$description = get_post($id)->post_content;
	$description = str_replace(array("\r\n","\r","\n","&nbsp;"),'',$description);
	$description = wp_strip_all_tags($description);
	$description = preg_replace('/\[.*\]/','',$description);
	return mb_substr($description, 0, $len);
}
