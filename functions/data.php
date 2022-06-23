<?php
namespace Ccl_Plugin\functions\data;

use const Ccl_Plugin\DB_NAME;

/**
 * 管理画面で設定したデータを取得
 * @param  string $key
 * @return string 設定値
 */
function get_setting($key) {
	return get_option(DB_NAME)[$key] ?? get_default_setting($key);
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
		'layout'                             => 'card',
		'max_width'                          => 600,
		'padding'                            => 28,
		'border_radius'                      => 6,
		'title_font_size'                    => 22,
		'description_font_size'              => 14,
		'title_num_of_char'                  => 48,
		'description_num_of_char'            => 120,
		'gap_between_title_and_thumbnail'    => 6,
		'description_margin_top'             => 6,
		//影
		'shadow_use'                         => 'none',
		'shadow_offset_x'                    => 2,
		'shadow_offset_y'                    => 3,
		'shadow_blur_radius'                 => 3,
		'shadow_spread_radius'               => 3,
		'shadow_color'                       => '#0000001a',
		//スマホサイズ
		'breakpoint'                         => 640,
		'layout_sp'                          => 'card',
		'max_width_sp'                       => 600,
		'padding_sp'                         => 28,
		'border_radius_sp'                   => 6,
		'title_font_size_sp'                 => 22,
		'description_font_size_sp'           => 14,
		'title_num_of_char_sp'               => 48,
		'description_num_of_char_sp'         => 120,
		'gap_between_title_and_thumbnail_sp' => 6,
		'description_margin_top_sp'          => 6,
		//影
		'shadow_use_sp'                      => 'none',
		'shadow_offset_x_sp'                 => 2,
		'shadow_offset_y_sp'                 => 3,
		'shadow_blur_radius_sp'              => 3,
		'shadow_spread_radius_sp'            => 3,
		'shadow_color_sp'                    => '#0000001a',
		//ホバー
		'hover_use'                          => 'shadow',
		'hover_top'                          => 5,
		'hover_transition_time'              => 0.3,
		'hover_shadow_offset_x'              => 0,
		'hover_shadow_offset_y'              => 2,
		'hover_shadow_blur_radius'           => 3,
		'hover_shadow_spread_radius'         => 3,
		'hover_shadow_color'                 => '#0000000d',
	);
}
