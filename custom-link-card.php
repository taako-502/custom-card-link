<?php
Namespace Clc_Plugin;
/*
Plugin Name: Custom Link Card
Plugin URI: https://github.com/taako-502/custom-link-card
Description: 外部リンクを表示するGutenbergブロック
Version: 20220613
Author: Takao
Author URI: https://github.com/taako-502
License: GPL2
*/
const OPTION_GROUP = 'custom-link-card';
const CLC_SLUG     = 'custom-link-card';
const DB_NAME      = 'custom_link_card_settings';

require_once __DIR__ .'/library/Get_OGP_InWP/get_ogp_inwp.php';
require_once __DIR__ .'/library/plugin-update-checker/plugin-update-checker.php';
require_once __DIR__ .'/functions/rest_api.php';
require_once __DIR__ .'/functions/style.php';
require_once __DIR__ .'/functions/data.php';

use function Clc_Plugin\functions\data\get_setting;

/**
 * プラグインアップデーター
 */
$myUpdateChecker = \Puc_v4_Factory::buildUpdateChecker(
	'https://github.com/taako-502/custom-link-card/',
	__FILE__,
	'custom-link-card'
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
				$ogps    = \Clc_Plugin\library\Get_OGP_InWP::get($url);
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
					$title = get_the_title( $post_id );
					$image = get_the_post_thumbnail_url( $post_id , 'large' );
					$description = getDescription( $post_id, get_setting('description_num_of_char'));
				} else {
					//外部リンク
					$image       = $ogps['og:image'] ?? '';
					$title       = $ogps['og:title'] ?? '';
					$description = $ogps['og:description'] ?? '';
				}
				$title                    = mb_strlen($title) > get_setting('title_num_of_char')
					? mb_substr($title, 0, get_setting('title_num_of_char')).'...'
					: mb_substr($title, 0, get_setting('title_num_of_char'));
				$description              = mb_substr($description, 0, get_setting('description_num_of_char')).'...';
				$layout                   = get_setting('layout');
				$layout_sp                = get_setting('layout_sp');
				$padding                  = get_setting('padding');
				$border_radius            = get_setting('border_radius');
				$border_radius_sp         = get_setting('border_radius_sp');
				$hover_use                = get_setting('hover_use');
				$hover_transition_time    = get_setting('hover_transition_time');
				return makeEtcCard(
					$url,
					$image,
					$title,
					$description,
					$layout,
					$layout_sp,
					$padding,
					$border_radius,
					$border_radius_sp,
					$hover_use,
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
function makeEtcCard($url, $image, $title, $description, $layout, $layout_sp, $padding,
                                    $border_radius, $border_radius_sp, $hover_use, $hover_transition_time) {
	$main_class  = 'clc clc--'.$layout;
	$main_class .= ' clc-sp--'.$layout_sp;
	$main_class .= $border_radius != 0 ? ' u-border-radius--'.$border_radius.'px' : '';
	$main_class .= ' u-padding--'.$padding.'px';
	$main_class .= $hover_use != 'none' ? ' clc--hover-'.$hover_use : '';
	$main_class .= $hover_transition_time != 0 ? ' u-transition--top-box-shadow--'.number_to_class($hover_transition_time).'s' : '';
	$thumnail    = trim($image) !== '' ? '<img class="clc__thumbnail clc__thumbnail--'.$layout.' clc-sp__thumbnail--'.$layout_sp.'" src="'.$image.'">' : '';
	return sprintf(
		'<a class="%1$s" href="%4$s">
			%5$s
			<div class="clc__info clc__info--%2$s clc-sp__info--%3$s">
				<p class="clc__title clc__title--%2$s">%6$s</p>
				<p class="clc__description clc__description--%2$s">%7$s</p>
			</div>
		</a>',
		$main_class,
		$layout,
		$layout_sp,
		$url,
		$thumnail,
		$title,
		$description
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
			echo '<div id="clc-admin"></div>';
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
		CLC_SLUG,
		plugin_dir_url( __FILE__ ).'build/admin.css',
		array('wp-components')
	);

	// JavaScriptファイルの読み込み
	wp_enqueue_media();
	$asset_file = include_once ( __DIR__ . '/build/admin.asset.php') ;
	wp_enqueue_script (
		CLC_SLUG,
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
