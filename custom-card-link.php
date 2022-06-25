<?php
Namespace Ccl_Plugin;
/*
Plugin Name: Custom Card Link
Plugin URI: https://github.com/taako-502/custom-card-link
Description: 外部リンクを表示するGutenbergブロック
Version: 20220613
Author: Takao
Author URI: https://github.com/taako-502
License: GPL2
*/
const OPTION_GROUP = 'custom-card-link';
const CCL_SLUG     = 'custom-card-link';
const DB_NAME      = 'custom_card_link_settings';

require_once __DIR__ .'/classes/CustomCardLink.php';
require_once __DIR__ .'/library/Get_OGP_InWP/get_ogp_inwp.php';
require_once __DIR__ .'/functions/rest_api.php';
require_once __DIR__ .'/functions/style.php';
require_once __DIR__ .'/functions/data.php';

use function Ccl_Plugin\functions\data\get_setting;

/**
 * 管理画面追加
 */
add_action('admin_menu', function() {
	add_menu_page(
		'カスタムカードリンク',
		'カスタムカードリンク - デザイン設定',
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
	wp_enqueue_script (
		CCL_SLUG,
		plugin_dir_url( __FILE__ ).'build/admin.js',
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);
});

/**
* サーバ側処理
*/
add_action('init', function() {
	register_block_type_from_metadata(__DIR__ . '/build',
		array(
			'render_callback' => function($attributes) {
				$url     = $attributes['url'] ?? '';
				$ogps    = \Ccl_Plugin\library\Get_OGP_InWP::get(trim($url));
				$post_id = url_to_postid($url);
				if($url == '' && !is_singular()) {
					return 'URLを入力してください。';
				} else if(($ogps == [] && $post_id == 0) && !is_singular()){
					return '有効なURLを入力してください。';
				}
				//全部空
				if($url == '' || ($ogps == [] && $post_id == 0)){
					return;
				}

				if($post_id != 0) {
					//内部リンクの場合
					$image          = get_the_post_thumbnail_url( $post_id , 'large' );
					$post_title     = get_the_title( $post_id );
					$description    = getDescription( $post_id, get_setting('description_num_of_char'));
					$description_sp = getDescription( $post_id, get_setting('description_num_of_char_sp'));
					$link_type      = 'internal';
				} else {
					//外部リンク
					$image          = $ogps['og:image'] ?? '';
					$post_title     = $ogps['og:title'] ?? '';
					$description    = $ogps['og:description'] ?? '';
					$description_sp = $description;
					$link_type      = 'external';
				}
				$title          = format_title($post_title, get_setting('title_num_of_char'));
				$title_sp       = format_title($post_title, get_setting('title_num_of_char_sp'));
				$description    = format_description($description, get_setting('description_num_of_char'));
				$description_sp = format_description($description_sp, get_setting('description_num_of_char_sp'));
				$ccl = new \Ccl_Plugin\classes\CustomCardLink(get_setting());
				return $ccl->make_ccl($url, $link_type, $image, $title, $title_sp, $description, $description_sp);
			},
		)
	);
});

/**
 * タイトルの整形
 * @param  string $title
 * @param  int $num
 * @return string
 */
function format_title($title, $num) {
	return mb_strlen($title) <= $num ? mb_substr($title, 0, $num) : mb_substr($title, 0, $num).'...';
}

/**
 * ディスクリプションの整形
 * @param  string $title
 * @param  int $num
 * @return string
 */
function format_description($description, $num) {
	return $num == 0 ? mb_substr($description, 0, $num) : mb_substr($description, 0, $num).'...';
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
