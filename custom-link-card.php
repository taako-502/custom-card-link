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
				$ogps    = \Get_OGP_InWP::get($url);
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
				$title                 = mb_strlen($title) > get_setting('title_num_of_char')
					? mb_substr($title, 0, get_setting('title_num_of_char')).'...'
					: mb_substr($title, 0, get_setting('title_num_of_char'));
				$description           = mb_substr($description, 0, get_setting('description_num_of_char')).'...';
				$layout                = get_setting('layout');
				$hover                 = get_setting('hover');
				$border_radius         = get_setting('border_radius');
				$hover_transition_time = get_setting('hover_transition_time');
				return makeEtcCard(
					$url,
					$image,
					$title,
					$description,
					$layout,
					$hover,
					$border_radius,
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
function makeEtcCard($url, $image, $title, $description, $layout, $hover,
                                    $border_radius, $hover_transition_time) {
	$main_class  = 'clc clc--'.$layout;
	$main_class .= $hover != 'none' ? ' clc--hover-'.$hover : '';
	$main_class .= $border_radius != 0 ? ' u-border-radius--'.$border_radius.'px' : '';
	$main_class .= $hover_transition_time != 0 ? ' u-transition--top-box-shadow--'.number_to_class($hover_transition_time).'s' : '';
	return sprintf(
		'<a class="%1$s" href="%3$s">
			<img class="clc__thumbnail clc__thumbnail--%2$s" src="%4$s">
			<div class="clc__info clc__info--%2$s">
				<p class="clc__title clc__title--%2$s">%5$s</p>
				<p class="clc__description clc__description--%2$s">%6$s</p>
			</div>
		</a>',
		$main_class,
		$layout,
		$url,
		$image,
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
 * 管理画面で設定したデータを取得
 * @param  string $key
 * @return string 設定値
 */
function get_setting($key) {
	return isset(get_option(DB_NAME)[$key]) ? get_option(DB_NAME)[$key] : get_default_setting($key);
}

/**
 * カスタマイザのデフォルト値取得
 * @param  string $key キー
 * @return string デフォルト値
 */
function get_default_setting($key) {
	if(!isset(get_default_settings()[$key])) {
		return '';
	}
	return get_default_settings()[$key];
}

/**
 * カスタマイザのデフォルト値リスト取得
 * @return array デフォルト値の連想配列
 */
function get_default_settings() {
	return array(
		//デザイン
		'layout'                          => 'card',
		'padding'                         => 28,
		'border_radius'                   => 6,
		'title_font_size'                 => 22,
		'description_font_size'           => 14,
		'gap_between_title_and_thumbnail' => 6,
		'description_margin_top'          => 6,
		//影
		'shadow_use'                      => 'none',
		'shadow_offset_x'                 => 2,
		'shadow_offset_y'                 => 3,
		'shadow_blur_radius'              => 3,
		'shadow_spread_radius'            => 3,
		'shadow_color'                    => '#0000001a',
		//ホバー
		'hover_use'                       => 'shadow',
		'hover_top'                       => 5,
		'hover_transition_time'           => 0.3,
		'hover_shadow_offset_x'           => 0,
		'hover_shadow_offset_y'           => 2,
		'hover_shadow_blur_radius'        => 3,
		'hover_shadow_spread_radius'      => 3,
		'hover_shadow_color'              => '#0000000d',
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

/**
 * 動的スタイルシート
 * @return string
 */
function dynamic_styles(){
	$css  = '';
	$css .= '<style type="text/css">';
	$css .= '  .clc {';
	$css .= '    box-shadow: '.get_setting('shadow_offset_x').'px '.get_setting('shadow_offset_y').'px '
		.get_setting('shadow_blur_radius').'px '.get_setting('shadow_spread_radius').'px '
		.get_setting('shadow_color').';';
	$css .= '  }';
	$css .= '  .clc--hover-shadow:hover {';
	$css .= '    box-shadow: '.get_setting('hover_shadow_offset_x').'px '.get_setting('hover_shadow_offset_y').'px '
		.get_setting('hover_shadow_blur_radius').'px '.get_setting('hover_shadow_spread_radius').'px '
		.get_setting('hover_shadow_color').';';
	$css .= '  }';
	//レスポンシブ
	$css .= '@media screen and (max-width: '.get_setting('breakpoint').'px) {';
	$css .= '  .clc {';
	$css .= '    box-shadow: '.get_setting('shadow_offset_x_sp').'px '.get_setting('shadow_offset_y_sp').'px '
		.get_setting('shadow_blur_radius_sp').'px '.get_setting('shadow_spread_radius_sp').'px '
		.get_setting('shadow_color_sp').';';
	$css .= '  }';
	$css .= '}';
	$css .= '</style>';
	return $css;
}

/**
 * ヘッダーにCSSを挿入
 */
add_action('wp_head', function() {
	echo dynamic_styles();
});
