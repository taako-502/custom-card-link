<?php
namespace Clc_Plugin\functions\rest_api;

use const Clc_Plugin\CLC_SLUG;
use const Clc_Plugin\DB_NAME;

/**
 * 設定項目の登録
 */
add_action('init', function() {
	register_setting(
		CLC_SLUG,
		DB_NAME,
		array(
			'type'         => 'array',
			'show_in_rest' => array(
				'schema' => array(
					'type'       => 'object',
					'items'      => '', //ワーニング回避
					'properties' => array(
						//デザイン
						'layout' => array(
							'type'              => 'string',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'max_width' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'padding' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'border_radius' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'title_font_size' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'description_font_size' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'title_num_of_char' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'description_num_of_char' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'gap_between_title_and_thumbnail' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'description_margin_top' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						//影
						'shadow_use' => array(
							'type'              => 'string',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'shadow_offset_x' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'shadow_offset_y' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'shadow_blur_radius' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'shadow_spread_radius' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'shadow_color' => array(
							'type'              => 'string',
							'sanitize_callback' => 'sanitize_text_color',
						),
						//レスポンシブ
						'breakpoint' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						//デザイン（スマホ）
						'layout_sp' => array(
							'type'              => 'string',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'max_width_sp' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'padding_sp' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'border_radius_sp' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'title_font_size_sp' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'description_font_size_sp' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'title_num_of_char_sp' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'description_num_of_char_sp' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'gap_between_title_and_thumbnail_sp' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'description_margin_top_sp' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						//影（スマホ）
						'shadow_use_sp' => array(
							'type'              => 'string',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'shadow_offset_x_sp' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'shadow_offset_y_sp' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'shadow_blur_radius_sp' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'shadow_spread_radius_sp' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'shadow_color_sp' => array(
							'type'              => 'string',
							'sanitize_callback' => 'sanitize_text_color',
						),
						//ホバー
						'hover_use' => array(
							'type'              => 'string',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'hover_top' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'hover_transition_time' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'hover_shadow_offset_x' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'hover_shadow_offset_y' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'hover_shadow_blur_radius' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'hover_shadow_spread_radius' => array(
							'type'              => 'number',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'hover_shadow_color' => array(
							'type'              => 'string',
							'sanitize_callback' => 'sanitize_text_color',
						),
					),
				),
			),
		),
	);
});
