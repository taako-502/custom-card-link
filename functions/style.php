<?php
namespace Ccl_Plugin\functions\rest_api;

use const Ccl_Plugin\CCL_SLUG;
use function Ccl_Plugin\functions\data\get_setting;

const FRONTEND_STYLE_HANDLE = 'custom-card-link-frontend';

/**
 * 動的スタイルシート
 * @return string
 */
function dynamic_styles(){
	$css  = '';
	if( get_setting('shadow_use') == 'shadow' ) {
		$css .= '  .ccl {';
		$css .= '    box-shadow: '.get_setting('shadow_offset_x').'px '.get_setting('shadow_offset_y').'px '
			.get_setting('shadow_blur_radius').'px '.get_setting('shadow_spread_radius').'px '
			.get_setting('shadow_color').';';
		$css .= '  }';
	}
	$css .= '  a.ccl {';
	$css .= '    max-width: '.get_setting('max_width').'px;';
	$css .= '  }';
	$css .= '  .ccl--hover-shadow:hover {';
	$css .= '    box-shadow: '.get_setting('hover_shadow_offset_x').'px '.get_setting('hover_shadow_offset_y').'px '
		.get_setting('hover_shadow_blur_radius').'px '.get_setting('hover_shadow_spread_radius').'px '
		.get_setting('hover_shadow_color').';';
	$css .= '  }';
	//レスポンシブ設定は動的CSSで設定する
	$css .= '@media screen and (max-width: '.get_setting('breakpoint').'px) {';
	$css .= '  .ccl {';
	if( get_setting('shadow_use_sp') == 'shadow' ) {
		$css .= '    box-shadow: '.get_setting('shadow_offset_x_sp').'px '.get_setting('shadow_offset_y_sp').'px '
			.get_setting('shadow_blur_radius_sp').'px '.get_setting('shadow_spread_radius_sp').'px '
			.get_setting('shadow_color_sp').';';
	}
	$css .= '    padding: '.get_setting('padding_sp').'px;';
	$css .= '    border-radius: '.get_setting('border_radius_sp').'px;';
	$css .= '  }';
	$css .= '  a.ccl {';
	$css .= '    max-width: '.get_setting('max_width_sp').'px;';
	$css .= '  }';
	$css .= '  .ccl-sp--card {';
	$css .= '    display: block;';
	$css .= '  }';
	$css .= '  .ccl-sp--list {';
	$css .= '    display: flex;';
	$css .= '  }';
	$css .= '  .ccl-sp__thumbnail--card {';
	$css .= '  		max-width: none;';
	$css .= '  		min-width: none;';
	$css .= '  		min-height: none;';
	$css .= '  }';
	$css .= '  .ccl-sp__thumbnail--list {';
	$css .= '  		max-width: 30%;';
	$css .= '  		min-width: 140px;';
	$css .= '  		min-height: 140px;';
	$css .= '  }';
	$css .= '  .ccl__title , .ccl__description {';
	$css .= '    display: none;';
	$css .= '  }';
	$css .= '  .ccl-sp__title , .ccl-sp__description {';
	$css .= '    display: block;';
	$css .= '  }';
	$css .= '  .ccl-sp__title {';
	$css .= '    font-size: '.get_setting('title_font_size_sp').'px;';
	$css .= '  }';
	$css .= '  .ccl-sp__description {';
	$css .= '    font-size: '.get_setting('description_font_size_sp').'px;';
	$css .= '    margin-top: '.get_setting('description_margin_top_sp').'px;';
	$css .= '  }';
	$css .= '  .ccl-sp__info--card {';
	$css .= '    margin-top: '.get_setting('gap_between_title_and_thumbnail_sp').'px;';
	$css .= '    margin-left: 0;';
	$css .= '  }';
	$css .= '  .ccl-sp__info--list {';
	$css .= '    margin-top: 0;';
	$css .= '    margin-left: '.get_setting('gap_between_title_and_thumbnail_sp').'px;';
	$css .= '  }';
	$css .= '}';
	return $css;
}

/**
 * フロントエンド用スタイルを登録
 */
add_action('init', function() {
	$style_path = dirname(__DIR__).'/build/style-index.css';
	$version    = file_exists($style_path) ? (string) filemtime($style_path) : null;

	wp_register_style(
		FRONTEND_STYLE_HANDLE,
		plugin_dir_url(dirname(__DIR__).'/custom-card-link.php').'build/style-index.css',
		array(),
		$version
	);

	wp_style_add_data(FRONTEND_STYLE_HANDLE, 'rtl', 'replace');
});

/**
 * ブロックが描画されたページでのみスタイルを読み込む
 *
 * @param string $block_content
 * @return string
 */
add_filter('render_block_'.CCL_SLUG.'/'.CCL_SLUG, function($block_content) {
	static $dynamic_styles_added = false;

	wp_enqueue_style(FRONTEND_STYLE_HANDLE);

	if(!$dynamic_styles_added) {
		wp_add_inline_style(FRONTEND_STYLE_HANDLE, dynamic_styles());
		$dynamic_styles_added = true;
	}

	return $block_content;
});
