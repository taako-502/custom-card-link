<?php
Namespace Elc_Plugin;
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
const DB_NAME      = 'external_link_card_settings';

/**
 * プラグインアップデーター
 */
$myUpdateChecker = \Puc_v4_Factory::buildUpdateChecker(
	'https://github.com/taako-502/external-link-card/',
	__FILE__,
	'external-link-card'
);
$myUpdateChecker->setBranch('main');

/**
* サーバ側処理
*/
add_action( 'init', function() {
	register_block_type_from_metadata(__DIR__ . '/build',
		array(
			'render_callback' => function($attributes) {
	      $url  = isset($attributes['url']) ? trim($attributes['url']) : '';
	      $ogps = \Get_OGP_InWP::get($url);
	      if($url == '' && !is_singular()) {
	      	return 'URLを入力してください。';
	      } else if($ogps == [] && !is_singular()){
	      	return '有効なURLを入力してください。';
	      } else if($url == '' || $ogps == []){
	      	return;
	      }
				$image       = isset($ogps['og:image']) ? $ogps['og:image'] : '';
				$title       = isset($ogps['og:title']) ? $ogps['og:title'] : '';
				$description = isset($ogps['og:description']) ? $ogps['og:description'] : '';
				$layout = get_option('external_link_card_settings')['layout'];
				return makeEtcCard($layout, $url, $image, $title, $description);
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
function makeEtcCard($layout, $url, $image, $title, $description) {
	return sprintf(
		'<a class="elc elc--%1$s" href="%2$s">
			<img class="elc__thumbnail elc__thumbnail--%1$s" src="%3$s">
			<div class="elc__info elc__info--%1$s">
				<p class="elc__title elc__title--%1$s">%4$s</p>
				<p class="elc__description elc__description--%1$s">%5$s</p>
			</div>
		</a>',
		$layout,
		$url,
		$image,
		$title,
		$description
	);
}

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
    plugin_dir_url( __FILE__ ).'build/admin.css',
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

/**
 * 設定項目の登録
 */

add_action('init', function() {
  register_setting(
    ELC_SLUG,
    DB_NAME,
    array(
      'type'         => 'array',
      'show_in_rest' => array(
        'schema' => array(
          'type'       => 'object',
          'items'      => '', //ワーニング回避
          'properties' => array(
            'layout'       => array(
              'type'              => 'string',
              'sanitize_callback' => 'sanitize_text_field',
              'default'           => '',
            ),
            'hover'       => array(
              'type'              => 'string',
              'sanitize_callback' => 'sanitize_text_field',
              'default'           => '',
            ),
          ),
        ),
      ),
    ),
  );
});
