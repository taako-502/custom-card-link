<?php
use PHPUnit\Framework\TestCase;

final class AdminAssetsTest extends TestCase {
	public function test_admin_asset_uses_api_fetch_without_legacy_wp_api(): void {
		$asset = require dirname(__DIR__).'/build/admin.asset.php';

		self::assertContains('wp-api-fetch', $asset['dependencies']);
		self::assertNotContains('wp-api', $asset['dependencies']);
	}

	public function test_admin_enqueue_does_not_load_media_or_append_wp_api(): void {
		$plugin_source = file_get_contents(dirname(__DIR__).'/custom-card-link.php');

		self::assertIsString($plugin_source);
		self::assertStringNotContainsString('wp_enqueue_media(', $plugin_source);
		self::assertStringNotContainsString("array('wp-api')", $plugin_source);
		self::assertStringContainsString(
			"'toplevel_page_'.OPTION_GROUP !== \$hook_suffix",
			$plugin_source
		);
	}

	public function test_admin_source_uses_standard_settings_api_and_notice(): void {
		$admin_source = file_get_contents(dirname(__DIR__).'/src/admin.js');

		self::assertIsString($admin_source);
		self::assertStringContainsString(
			"import apiFetch from '@wordpress/api-fetch';",
			$admin_source
		);
		self::assertStringContainsString("path: '/wp/v2/settings'", $admin_source);
		self::assertStringContainsString("method: 'POST'", $admin_source);
		self::assertStringContainsString('<Notice', $admin_source);
		self::assertStringNotContainsString('window.wp.api', $admin_source);
		self::assertStringNotContainsString(
			'react-notifications-component',
			$admin_source
		);
	}

	public function test_setting_remains_exposed_through_rest(): void {
		$rest_source = file_get_contents(dirname(__DIR__).'/functions/rest_api.php');

		self::assertIsString($rest_source);
		self::assertStringContainsString("'show_in_rest' => array(", $rest_source);
		self::assertStringContainsString('DB_NAME,', $rest_source);
	}
}
