<?php
use PHPUnit\Framework\TestCase;

use function Ccl_Plugin\functions\ogp_cache\acquire_lock;
use function Ccl_Plugin\functions\ogp_cache\get_cache_key;
use function Ccl_Plugin\functions\ogp_cache\get_cached_ogp;
use function Ccl_Plugin\functions\ogp_cache\make_entry;
use function Ccl_Plugin\functions\ogp_cache\release_lock;
use function Ccl_Plugin\functions\ogp_cache\schedule_refresh;

final class OgpCacheTest extends TestCase {
	protected function setUp(): void {
		$GLOBALS['ccl_test_transients'] = array();
		$GLOBALS['ccl_test_options'] = array();
		$GLOBALS['ccl_test_events'] = array();
		$GLOBALS['ccl_test_filters'] = array();
		$GLOBALS['ccl_test_http_calls'] = 0;
	}

	public function test_cached_ogp_returns_saved_data_without_http(): void {
		$url = 'https://example.com/article';
		$data = array('og:title' => '保存済みタイトル');
		$GLOBALS['ccl_test_transients'][get_cache_key($url)] = make_entry($url, $data, 'success', time());

		self::assertSame($data, get_cached_ogp($url));
		self::assertSame(0, $GLOBALS['ccl_test_http_calls']);
	}

	public function test_entry_saves_ogp_image_dimensions_without_fetching_image(): void {
		$entry = make_entry(
			'https://example.com/dimensions',
			array(
				'og:image'        => 'https://example.com/image.jpg',
				'og:image:width'  => '1200',
				'og:image:height' => '630',
			),
			'success',
			time()
		);

		self::assertSame(1200, $entry['image_width']);
		self::assertSame(630, $entry['image_height']);
		self::assertSame(0, $GLOBALS['ccl_test_http_calls']);
	}

	public function test_stale_and_failed_entries_keep_old_data(): void {
		$stale_url = 'https://example.com/stale';
		$failed_url = 'https://example.com/failed';
		$stale = make_entry($stale_url, array('og:title' => '古いデータ'), 'success', 1);
		$failed = make_entry($failed_url, array('og:title' => '失敗前データ'), 'failed', time());
		$GLOBALS['ccl_test_transients'][get_cache_key($stale_url)] = $stale;
		$GLOBALS['ccl_test_transients'][get_cache_key($failed_url)] = $failed;

		self::assertSame('古いデータ', get_cached_ogp($stale_url)['og:title']);
		self::assertSame('失敗前データ', get_cached_ogp($failed_url)['og:title']);
	}

	public function test_missing_cache_returns_empty_fallback_data(): void {
		self::assertSame(array(), get_cached_ogp('https://example.com/missing'));
	}

	public function test_refresh_event_is_not_scheduled_twice(): void {
		$url = 'https://example.com/new';
		self::assertTrue(schedule_refresh($url));
		self::assertFalse(schedule_refresh($url));
		self::assertCount(1, $GLOBALS['ccl_test_events']);
	}

	public function test_multiple_cards_and_stale_cache_do_not_perform_http(): void {
		$first = 'https://example.com/card-1';
		$second = 'https://example.com/card-2';
		$GLOBALS['ccl_test_transients'][get_cache_key($first)] = make_entry(
			$first,
			array('og:title' => 'Card 1'),
			'success',
			1
		);

		get_cached_ogp($first);
		get_cached_ogp($second);

		self::assertSame(0, $GLOBALS['ccl_test_http_calls']);
	}

	public function test_stale_entry_can_schedule_refresh(): void {
		$url = 'https://example.com/stale-schedule';
		$GLOBALS['ccl_test_transients'][get_cache_key($url)] = make_entry(
			$url,
			array('og:title' => '古いデータ'),
			'success',
			1
		);

		self::assertTrue(schedule_refresh($url));
	}

	public function test_failed_entry_suppresses_immediate_retry(): void {
		$url = 'https://example.com/failed-retry';
		$GLOBALS['ccl_test_transients'][get_cache_key($url)] = make_entry(
			$url,
			array(),
			'failed',
			time()
		);

		self::assertFalse(schedule_refresh($url));
	}

	public function test_non_positive_ttl_uses_default_ttl(): void {
		$GLOBALS['ccl_test_filters']['ccl_ogp_cache_expiration'] = 0;
		$entry = make_entry('https://example.com/ttl', array(), 'success', 100);

		self::assertSame(100 + DAY_IN_SECONDS, $entry['expires_at']);
	}

	public function test_only_lock_owner_can_release_lock(): void {
		$key = 'test-lock';
		$owner = acquire_lock($key);
		self::assertIsString($owner);

		release_lock($key, 'different-owner');
		self::assertNotFalse(get_option($key, false));

		release_lock($key, $owner);
		self::assertFalse(get_option($key, false));
	}

	public function test_expired_lock_can_be_reacquired_without_old_owner_releasing_it(): void {
		$key = 'expired-lock';
		$old_owner = acquire_lock($key);
		$GLOBALS['ccl_test_options'][$key]['expires_at'] = time() - 1;
		$new_owner = acquire_lock($key);

		self::assertIsString($new_owner);
		self::assertNotSame($old_owner, $new_owner);

		release_lock($key, $old_owner);
		self::assertSame($new_owner, get_option($key)['token']);
	}
}
