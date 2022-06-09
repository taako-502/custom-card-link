<?php
/*
Plugin Name: External Link Card
Plugin URI: https://github.com/taako-502/external-link-card
Description: 外部リンクを表示するGutenbergブロック
Version: 20220608
Author: Takao
Author URI: https://github.com/taako-502
License: GPL2
*/
require_once __DIR__ .'/library/Get_OGP_InWP/get_ogp_inwp.php';
require_once __DIR__ .'/library/plugin-update-checker/plugin-update-checker.php';

const OPTION_GROUP = 'external-link-card';
const ELC_SLUG     = 'external-link-card';

/**
 * プラグインアップデーター
 */
$myUpdateChecker = Puc_v4_Factory::buildUpdateChecker(
	'https://github.com/taako-502/external-link-card/',
	__FILE__,
	'external-link-card'
);
$myUpdateChecker->setBranch('main');

/**
* 外部リンクカード
*/
function external_link_card_dynamic_render_callback($attributes) {
	$url = isset($attributes['url']) ? trim($attributes['url']) : '';
	if($url == '') {
		return 'URLを入力してください。';
	}
	$ogps = \Get_OGP_InWP::get($url);
	if($ogps == []){
		return '有効なURLを入力してください。';
	}
	$image       = isset($ogps['og:image']) ? $ogps['og:image'] : '';
	$title       = isset($ogps['og:title']) ? $ogps['og:title'] : '';
	$description = isset($ogps['og:description']) ? $ogps['og:description'] : '';
	return sprintf(
		'<div class="elc">
			<a href="%s">
				<img class="elc--thumbnail" src="%s">
				<p class="elc--title">%s</p>
				<p class="elc--description">%s</p>
			</a>
		</div>',
		$url,
		$image,
		$title,
		$description
	);
}

function create_block_external_link_card_block_init() {
	register_block_type_from_metadata(__DIR__ . '/build',
		array(
			'render_callback' => 'external_link_card_dynamic_render_callback',
		)
	);
}
add_action( 'init', 'create_block_external_link_card_block_init' );

/**
 * 管理画面追加
 * @var [type]
 */
add_action('admin_menu', function() {
	add_menu_page(
		'外部リンクカード',
		'外部リンクカード - デザイン設定',
		'manage_options',
		OPTION_GROUP,
		function() {
			echo '<div id="elc-admin"></div>';
		},
		'',
		58
	);
});

add_action('admin_enqueue_scripts', function($hook_suffix) {
  // 作成したオプションページ以外では読み込まない
  if ( 'toplevel_page_'.OPTION_GROUP !== $hook_suffix ) {
    return;
  }

  // CSSファイルの読み込み
  wp_enqueue_style(
    ELC_SLUG,
    plugin_dir_url( __FILE__ ).'/build/admin.css',
    array('wp-components')
  );

  // JavaScriptファイルの読み込み
  wp_enqueue_media();
  $asset_file = include_once ( __DIR__ . '/build/admin.asset.php') ;
  wp_enqueue_script (
    ELC_SLUG,
    plugin_dir_url( __FILE__ ).'build/admin.js',
    $asset_file['dependencies'],
    $asset_file['version'],
    true
  );
});
