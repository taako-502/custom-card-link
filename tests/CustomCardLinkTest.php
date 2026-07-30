<?php
use Ccl_Plugin\classes\CustomCardLink;
use PHPUnit\Framework\TestCase;

final class CustomCardLinkTest extends TestCase {
	protected function setUp(): void {
		$GLOBALS['ccl_test_attachment_calls'] = array();
		$GLOBALS['ccl_test_filters'] = array();
	}

	public function test_internal_image_uses_wordpress_responsive_image(): void {
		$html = $this->makeCard(array(
			'image_id'    => 42,
			'image_sizes' => '(max-width: 640px) 320px, 544px',
		));

		self::assertCount(1, $GLOBALS['ccl_test_attachment_calls']);
		self::assertSame(42, $GLOBALS['ccl_test_attachment_calls'][0]['id']);
		self::assertSame('large', $GLOBALS['ccl_test_attachment_calls'][0]['size']);
		self::assertStringContainsString('width="1024"', $html);
		self::assertStringContainsString('height="576"', $html);
		self::assertStringContainsString('srcset=', $html);
		self::assertStringContainsString('sizes="(max-width: 640px) 320px, 544px"', $html);
		self::assertStringContainsString('alt="添付画像の代替テキスト"', $html);
		self::assertStringNotContainsString('loading="lazy"', $html);
		self::assertStringNotContainsString('fetchpriority="high"', $html);
	}

	public function test_external_image_uses_cached_dimensions_and_lazy_loading(): void {
		$html = $this->makeCard(array(
			'image'        => 'https://cdn.example.com/og.jpg',
			'image_width'  => 1200,
			'image_height' => 630,
			'link_type'    => 'external',
		));

		self::assertStringContainsString('width="1200"', $html);
		self::assertStringContainsString('height="630"', $html);
		self::assertStringContainsString('loading="lazy"', $html);
		self::assertStringContainsString('decoding="async"', $html);
		self::assertStringNotContainsString('fetchpriority=', $html);
	}

	public function test_external_loading_can_be_disabled_for_lcp_candidates(): void {
		$GLOBALS['ccl_test_filters']['ccl_external_image_loading'] = false;
		$html = $this->makeCard(array('image' => 'https://cdn.example.com/og.jpg'));

		self::assertStringNotContainsString('loading=', $html);
	}

	public function test_unsafe_or_missing_external_image_is_not_rendered(): void {
		$unsafe = $this->makeCard(array('image' => 'javascript:alert(1)'));
		$missing = $this->makeCard(array('image' => ''));

		self::assertStringNotContainsString('<img', $unsafe);
		self::assertStringNotContainsString('<img', $missing);
		self::assertStringContainsString('カードタイトル', $missing);
	}

	private function makeCard($overrides) {
		$settings = array_merge(array(
			'image'                            => '',
			'image_id'                         => 0,
			'image_width'                      => 0,
			'image_height'                     => 0,
			'image_sizes'                      => '',
			'link_type'                        => 'internal',
			'layout'                           => 'card',
			'layout_sp'                        => 'card',
			'title'                            => 'カードタイトル',
			'description'                      => '説明',
			'title_num_of_char'                => 48,
			'title_num_of_char_sp'             => 48,
			'description_num_of_char'          => 120,
			'description_num_of_char_sp'       => 120,
			'padding'                          => 28,
			'border_radius'                    => 6,
			'title_font_size'                  => 22,
			'description_font_size'            => 14,
			'gap_between_title_and_thumbnail'  => 6,
			'description_margin_top'           => 6,
			'hover_use'                        => 'none',
			'hover_top'                        => 0,
			'hover_transition_time'            => 0,
		), $overrides);

		return (new CustomCardLink('https://example.com/article', $settings))->make_ccl();
	}
}
