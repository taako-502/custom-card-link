<?php
use Ccl_Plugin\library\Get_OGP_InWP;
use PHPUnit\Framework\TestCase;

final class GetOgpInWpTest extends TestCase {
	public function test_http_limits_are_configured(): void {
		self::assertSame(4, Get_OGP_InWP::$default_fetch_args['timeout']);
		self::assertSame(2, Get_OGP_InWP::$default_fetch_args['redirection']);
		self::assertSame(512 * KB_IN_BYTES, Get_OGP_InWP::$default_fetch_args['limit_response_size']);
		self::assertArrayNotHasKey('sslverify', Get_OGP_InWP::$default_fetch_args);
	}

	public function test_unsafe_urls_are_rejected(): void {
		self::assertFalse(Get_OGP_InWP::is_safe_url('file:///etc/passwd'));
		self::assertFalse(Get_OGP_InWP::is_safe_url('http://127.0.0.1/private'));
		self::assertFalse(Get_OGP_InWP::is_safe_url('http://10.0.0.1/private'));
		self::assertTrue(Get_OGP_InWP::is_safe_url('https://example.com/page'));
	}

	public function test_parser_extracts_required_ogp_and_fallback_fields(): void {
		$html = '<html><head><title>Fallback title</title>'
			.'<meta name="description" content="Fallback description">'
			.'<meta property="og:site_name" content="Site">'
			.'<meta property="og:title" content="OG title">'
			.'<meta property="og:description" content="OG description">'
			.'<meta property="og:image" content="https://example.com/image.jpg">'
			.'</head></html>';

		$result = Get_OGP_InWP::parse($html, Get_OGP_InWP::$default_targets);

		self::assertSame('Site', $result['og:site_name']);
		self::assertSame('OG title', $result['og:title']);
		self::assertSame('OG description', $result['og:description']);
		self::assertSame('https://example.com/image.jpg', $result['og:image']);
		self::assertSame('Fallback title', $result['title']);
		self::assertSame('Fallback description', $result['description']);
	}
}
