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
const DB_NAME      = 'custom_link_card_settings';

require_once __DIR__ .'/library/Get_OGP_InWP/get_ogp_inwp.php';
require_once __DIR__ .'/library/plugin-update-checker/plugin-update-checker.php';
require_once __DIR__ .'/functions/rest_api.php';
require_once __DIR__ .'/functions/style.php';
require_once __DIR__ .'/functions/data.php';

use function Ccl_Plugin\functions\data\get_setting;

/**
 * プラグインアップデーター
 */
$myUpdateChecker = \Puc_v4_Factory::buildUpdateChecker(
	'https://github.com/taako-502/custom-card-link/',
	__FILE__,
	'custom-card-link'
);
$myUpdateChecker->setBranch('main');

/**
* サーバ側処理
*/
add_action('init', function() {
	register_block_type_from_metadata(__DIR__ . '/build',
		array(
			'render_callback' => function($attributes) {
				$url     = isset($attributes['url']) ? trim($attributes['url']) : '';
				$ogps    = \Ccl_Plugin\library\Get_OGP_InWP::get($url);
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
				} else {
					//外部リンク
					$image          = $ogps['og:image'] ?? '';
					$post_title     = $ogps['og:title'] ?? '';
					$description    = $ogps['og:description'] ?? '';
					$description_sp = $description;
				}
				$title                    = mb_strlen($post_title) > get_setting('title_num_of_char')
					? mb_substr($post_title, 0, get_setting('title_num_of_char')).'...'
					: mb_substr($post_title, 0, get_setting('title_num_of_char'));
				$title_sp                 = mb_strlen($post_title) > get_setting('title_num_of_char_sp')
					? mb_substr($post_title, 0, get_setting('title_num_of_char_sp')).'...'
					: mb_substr($post_title, 0, get_setting('title_num_of_char_sp'));
				$description              = mb_substr($description, 0, get_setting('description_num_of_char')).'...';
				$description_sp           = mb_substr($description_sp, 0, get_setting('description_num_of_char_sp')).'...';
				$layout                   = get_setting('layout');
				$layout_sp                = get_setting('layout_sp');
				$padding                  = get_setting('padding');
				$border_radius            = get_setting('border_radius');
				$border_radius_sp         = get_setting('border_radius_sp');
				$hover_use                = get_setting('hover_use');
				$hover_top                = get_setting('hover_top');
				$hover_transition_time    = get_setting('hover_transition_time');
				return makeEtcCard(
					$url,
					$image,
					$title,
					$title_sp,
					$description,
					$description_sp,
					$layout,
					$layout_sp,
					$padding,
					$border_radius,
					$border_radius_sp,
					$hover_use,
					$hover_top,
					$hover_transition_time,
				);
			},
		)
	);
});

/**
 * 外部リンクカード
 * @param  string $url
 * @param  string $image
 * @param  string $title
 * @param  string $description
 * @return string
 */
function makeEtcCard($url, $image, $title, $title_sp, $description, $description_sp, $layout, $layout_sp, $padding,
                                    $border_radius, $border_radius_sp, $hover_use, $hover_top, $hover_transition_time) {
	$main_class  = 'ccl ccl--'.$layout;
	$main_class .= ' ccl-sp--'.$layout_sp;
	$main_class .= $border_radius != 0 ? ' u-border-radius--'.$border_radius.'px' : '';
	$main_class .= ' u-padding--'.$padding.'px';
	$main_class .= ' ccl--hover-'.$hover_use;
	$main_class .= ' u-hover-top--'.( $hover_top * -1 ).'px';
	$main_class .= $hover_transition_time != 0 ? ' u-transition--top-box-shadow--'.number_to_class($hover_transition_time).'s' : '';
	$thumnail    = trim($image) !== '' ? '<img class="ccl__thumbnail ccl__thumbnail--'.$layout.' ccl-sp__thumbnail--'.$layout_sp.'" src="'.$image.'">' : '';
	return sprintf(
		'<a class="%1$s" href="%4$s">
			%5$s
			<div class="ccl__info ccl__info--%2$s ccl-sp__info--%3$s">
				<p class="ccl__title ccl__title--%2$s">%6$s</p>
				<p class="ccl__title ccl-sp__title ccl-sp__title--%2$s">%7$s</p>
				<p class="ccl__description ccl__description--%2$s">%8$s</p>
				<p class="ccl__description ccl-sp__description ccl-sp__description--%2$s">%9$s</p>
			</div>
		</a>',
		$main_class,
		$layout,
		$layout_sp,
		$url,
		$thumnail,
		$title,
		$title_sp,
		$description,
		$description_sp
	);
}

function number_to_class($num) {
	switch ($num) {
		case 0.1:
			return 'point-1';
			break;
		case 0.2:
			return 'point-2';
			break;
		case 0.3:
			return 'point-3';
			break;
		case 0.4:
			return 'point-4';
			break;
		case 0.5:
			return 'point-5';
			break;
		case 0.6:
			return 'point-6';
			break;
		case 0.7:
			return 'point-7';
			break;
		case 0.8:
			return 'point-8';
			break;
		case 0.9:
			return 'point-9';
			break;
		case 1:
			return '1';
			break;
	}
	return;
}

/**
 * 管理画面追加
 */
add_action('admin_menu', function() {
	add_menu_page(
		'外部リンクカード',
		'外部リンクカード - デザイン設定',
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
