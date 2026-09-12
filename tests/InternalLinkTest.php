<?php
use PHPUnit\Framework\TestCase;

use function Ccl_Plugin\getLinkInfo;
use function Ccl_Plugin\isInternalSiteUrl;
use function Ccl_Plugin\isPubliclyViewableInternalPost;

final class InternalLinkTest extends TestCase {
	protected function setUp(): void {
		$GLOBALS['ccl_test_posts'] = array();
		$GLOBALS['ccl_test_post_types_viewable'] = array('post' => true, 'private_type' => false);
		$GLOBALS['ccl_test_post_data_calls'] = array();
	}

	public function test_public_unprotected_post_is_viewable(): void {
		$this->setPost(10, 'publish');

		self::assertTrue(isPubliclyViewableInternalPost(10));
		self::assertSame(array(
			'image'        => 'https://example.com/image.jpg',
			'image_id'     => 42,
			'image_width'  => 0,
			'image_height' => 0,
			'link_type'    => 'internal',
			'title'        => '公開タイトル',
			'description'  => '公開本文',
		), getLinkInfo(10, array()));
	}

	/**
	 * @dataProvider protectedPostProvider
	 */
	public function test_protected_post_data_is_not_read($status, $password, $post_type): void {
		$this->setPost(20, $status, $password, $post_type);

		self::assertFalse(isPubliclyViewableInternalPost(20));
		self::assertSame(array(), getLinkInfo(20, array()));
		self::assertSame(array(), $GLOBALS['ccl_test_post_data_calls']);
	}

	public function protectedPostProvider(): array {
		return array(
			'draft'              => array('draft', '', 'post'),
			'private'            => array('private', '', 'post'),
			'scheduled'          => array('future', '', 'post'),
			'trashed'            => array('trash', '', 'post'),
			'password protected' => array('publish', 'secret', 'post'),
			'non-viewable type'  => array('publish', '', 'private_type'),
		);
	}

	public function test_missing_post_is_not_viewable_and_returns_no_data(): void {
		self::assertFalse(isPubliclyViewableInternalPost(999));
		self::assertSame(array(), getLinkInfo(999, array()));
		self::assertSame(array(), $GLOBALS['ccl_test_post_data_calls']);
	}

	public function test_post_changed_from_public_to_private_stops_returning_data(): void {
		$this->setPost(30, 'publish');
		self::assertNotEmpty(getLinkInfo(30, array()));

		$GLOBALS['ccl_test_post_data_calls'] = array();
		$this->setPost(30, 'private');

		self::assertSame(array(), getLinkInfo(30, array()));
		self::assertSame(array(), $GLOBALS['ccl_test_post_data_calls']);
	}

	public function test_same_site_url_is_not_treated_as_external_ogp_target(): void {
		self::assertTrue(isInternalSiteUrl('https://example.com/private-post?preview=true'));
		self::assertTrue(isInternalSiteUrl('http://EXAMPLE.com/?p=20'));
		self::assertFalse(isInternalSiteUrl('https://external.example/private-post'));
		self::assertFalse(isInternalSiteUrl('https://example.com:8443/private-post'));
	}

	private function setPost($id, $status, $password = '', $post_type = 'post'): void {
		$GLOBALS['ccl_test_posts'][$id] = new WP_Post(array(
			'ID'            => $id,
			'post_status'   => $status,
			'post_type'     => $post_type,
			'post_password' => $password,
			'post_content'  => '<p>公開本文</p>',
		));
	}
}
