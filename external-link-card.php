<?php
Namespace Elc_Plugin;
/*
Plugin Name: External Link Card
Plugin URI: https://github.com/taako-502/external-link-card
Description: 外部リンクを表示するGutenbergブロック
Version: 20220609
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
					$description = getDescription( $post_id, 100);
				} else {
					//外部リンク
					$image       = isset($ogps['og:image']) ? $ogps['og:image'] : '';
					$title       = isset($ogps['og:title']) ? $ogps['og:title'] : '';
					$description = isset($ogps['og:description']) ? $ogps['og:description'] : '';
				}
				$layout = get_option('external_link_card_settings')['layout'];
				$hover = get_option('external_link_card_settings')['hover'];
				return makeEtcCard($layout, $hover, $url, $image, $title, $description);
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
function makeEtcCard($layout, $hover, $url, $image, $title, $description) {
	$main_class  = 'elc elc--'.$layout;
	$main_class .= $hover != 'none' ? ' elc--hover-'.$hover : '';
	return sprintf(
		'<a class="%1$s" href="%3$s">
			<img class="elc__thumbnail elc__thumbnail--%2$s" src="%4$s">
			<div class="elc__info elc__info--%2$s">
				<p class="elc__title elc__title--%2$s">%5$s</p>
				<p class="elc__description elc__description--%2$s">%6$s</p>
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
			echo '<div id="elc-admin"></div>';
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
	return mb_strimwidth($description, 0, $len, '...');
}
