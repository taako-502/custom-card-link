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
