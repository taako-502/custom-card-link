<?php
define('DAY_IN_SECONDS', 86400);
define('MINUTE_IN_SECONDS', 60);
define('KB_IN_BYTES', 1024);

$GLOBALS['ccl_test_transients'] = array();
$GLOBALS['ccl_test_options'] = array();
$GLOBALS['ccl_test_events'] = array();
$GLOBALS['ccl_test_actions'] = array();
$GLOBALS['ccl_test_filters'] = array();
$GLOBALS['ccl_test_http_calls'] = 0;

class WP_Error {
}

function wp_parse_url($url, $component = -1) {
	return parse_url($url, $component);
}

function get_transient($key) {
	return $GLOBALS['ccl_test_transients'][$key] ?? false;
}

function set_transient($key, $value) {
	$GLOBALS['ccl_test_transients'][$key] = $value;
	return true;
}

function apply_filters($hook, $value) {
	return $GLOBALS['ccl_test_filters'][$hook] ?? $value;
}

function add_action($hook, $callback) {
	$GLOBALS['ccl_test_actions'][$hook] = $callback;
}

function wp_next_scheduled($hook, $args = array()) {
	$key = $hook.serialize($args);
	return $GLOBALS['ccl_test_events'][$key] ?? false;
}

function wp_schedule_single_event($timestamp, $hook, $args = array()) {
	$key = $hook.serialize($args);
	if(isset($GLOBALS['ccl_test_events'][$key])) {
		return false;
	}
	$GLOBALS['ccl_test_events'][$key] = $timestamp;
	return true;
}

function add_option($key, $value) {
	if(array_key_exists($key, $GLOBALS['ccl_test_options'])) {
		return false;
	}
	$GLOBALS['ccl_test_options'][$key] = $value;
	return true;
}

function get_option($key, $default = false) {
	return $GLOBALS['ccl_test_options'][$key] ?? $default;
}

function update_option($key, $value) {
	$GLOBALS['ccl_test_options'][$key] = $value;
	return true;
}

function delete_option($key) {
	unset($GLOBALS['ccl_test_options'][$key]);
	return true;
}

function wp_generate_uuid4() {
	static $counter = 0;
	$counter++;
	return 'test-token-'.$counter;
}

function url_to_postid() {
	return 0;
}

function is_wp_error($value) {
	return $value instanceof WP_Error;
}

function wp_http_validate_url($url) {
	$host = parse_url($url, PHP_URL_HOST);
	return !in_array($host, array('localhost', '127.0.0.1', '10.0.0.1'), true);
}

function wp_safe_remote_get() {
	$GLOBALS['ccl_test_http_calls']++;
	return new WP_Error();
}

function get_posts() {
	return array();
}

function get_post() {
	return null;
}

function parse_blocks() {
	return array();
}

function wp_is_post_revision() {
	return false;
}

function wp_is_post_autosave() {
	return false;
}

require_once dirname(__DIR__).'/library/Get_OGP_InWP/get_ogp_inwp.php';
require_once dirname(__DIR__).'/functions/ogp_cache.php';
