<?php
Namespace Ccl_Plugin;

/*
Plugin Name: Custom Card Link
Plugin URI: https://github.com/taako-502/custom-card-link
Description: 外部リンクを表示するGutenbergブロック
Version: 1.0.1
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
require_once __DIR__ .'/functions/rest_api.php';
require_once __DIR__ .'/functions/style.php';
require_once __DIR__ .'/functions/data.php';

use function Ccl_Plugin\functions\data\get_setting;

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
* サーバ側処理
*/
add_action('init', function() {
	register_block_type_from_metadata(__DIR__ . '/build',
		array(
			'render_callback' => function($attributes) {
				//入力チェック
				$url     = $attributes['url'] ?? '';
				$ogps    = \Ccl_Plugin\library\Get_OGP_InWP::get(trim($url));
				$post_id = url_to_postid($url);
				if($url == '' && !is_singular()) {
					return __('Please enter the URL.', 'ccl-plugin');
				} else if(($ogps == [] && $post_id == 0) && !is_singular()){
					return __('Please enter a valid URL.', 'ccl-plugin');
				}
				if($url == '' || ($ogps == [] && $post_id == 0)){
					return;
				}

				//リンク先の情報と設定画面の設定情報をマージ
				$settings = array_merge(get_setting(), getLinkInfo($post_id, $ogps));

				//HTMLの作成
				$ccl = new \Ccl_Plugin\classes\CustomCardLink($url, $settings);
				return $ccl->make_ccl();
			},
		)
	);
});

/**
 * リンク先の情報を取得する
 * @param  string $post_id
 * @param  array  $ogps
 * @param  string $title_num
 * @param  string $title_num_sp
 * @param  string $description_num
 * @param  string $description_num_sp
 * @return array
 */
function getLinkInfo($post_id, $ogps) {
	if($post_id != 0) {
		//内部リンクの場合
		$image          = get_the_post_thumbnail_url($post_id , 'large' );
		$post_title     = get_the_title($post_id );
		$description    = getDescription($post_id, MAX_DESCRIPTION_CHAR_OF_NUM);
		$description_sp = getDescription($post_id, MAX_DESCRIPTION_CHAR_OF_NUM);
		$link_type      = 'internal';
	} else {
		//外部リンク
		$image          = $ogps['og:image'] ?? '';
		$post_title     = $ogps['og:title'] ?? '';
		$description    = $ogps['og:description'] ?? '';
		$description_sp = $description;
		$link_type      = 'external';
	}
	return array(
		'image'       => $image,
		'link_type'   => $link_type,
		'title'       => $post_title,
		'description' => $description,
	);
}

/**
 * 記事情報をディスクリプションに変換
 * @param  string  $content 記事情報
 * @param  integer $len     文字数
 * @return string           ディスクリプション
 */
function getDescription($id, $len){
	$description = get_post($id)->post_content;
	$description = str_replace(array("\r\n","\r","\n","&nbsp;"),'',$description);
	$description = wp_strip_all_tags($description);
	$description = preg_replace('/\[.*\]/','',$description);
	return mb_substr($description, 0, $len);
}
