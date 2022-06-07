<?php
/**
* 外部リンクカード
*/
function external_link_card_dynamic_render_callback($attributes) {
	// var_dump($attr)
	$url = isset($attributes['url']) ? $attributes['url'] : '';
	return sprintf(
		'<div>
			<a href="%s">
				<img src="%s">
				<p>Description</p>
			</a>
		</div>',
		$url,
		'https://hepere.com/wp-content/uploads/2022/05/frontpage.jpeg'
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
