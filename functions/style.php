<?php
namespace Clc_Plugin\functions\rest_api;

use function Clc_Plugin\functions\data\get_setting;

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
	//レスポンシブ設定は動的CSSで設定する
	$css .= '@media screen and (max-width: '.get_setting('breakpoint').'px) {';
	$css .= '  .clc {';
	$css .= '    box-shadow: '.get_setting('shadow_offset_x_sp').'px '.get_setting('shadow_offset_y_sp').'px '
		.get_setting('shadow_blur_radius_sp').'px '.get_setting('shadow_spread_radius_sp').'px '
		.get_setting('shadow_color_sp').';';
	$css .= '    max-width: '.get_setting('max_width_sp').';';
	$css .= '    padding: '.get_setting('padding_sp').'px;';
	$css .= '    border-radius: '.get_setting('border_radius_sp').';';
	$css .= '  }';
	$css .= '  .clc-sp--list {';
	$css .= '    display: flex;';
	$css .= '  }';
	$css .= '  .clc-sp__thumbnail--card {';
	$css .= '  }';
	$css .= '  .clc-sp__thumbnail--list {';
	$css .= '  		object-fit: cover;';
	$css .= '  		max-width: 30%;';
	$css .= '  		min-width: 140px;';
	$css .= '  		min-height: 140px;';
	$css .= '  }';
	$css .= '  .clc__title {';
	$css .= '    font-size: '.get_setting('title_font_size_sp').'px;';
	$css .= '  }';
	$css .= '  .clc__description {';
	$css .= '    font-size: '.get_setting('description_font_size_sp').'px;';
	$css .= '    margin-top: '.get_setting('description_margin_top_sp').'px;';
	$css .= '  }';
	$css .= '  .clc-sp__info--card {';
	$css .= '    margin-top: '.get_setting('gap_between_title_and_thumbnail_sp').'px;';
	$css .= '  }';
	$css .= '  .clc-sp__info--list {';
	$css .= '    margin-left: '.get_setting('gap_between_title_and_thumbnail_sp').'px;';
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
