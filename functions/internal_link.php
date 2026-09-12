<?php
namespace Ccl_Plugin;

/**
 * URLが現在のWordPressサイトを指しているか判定する。
 *
 * 投稿IDを解決できない同一サイトURLを外部OGP取得へ回さないために使用する。
 *
 * @param string $url
 * @return bool
 */
function isInternalSiteUrl($url) {
	$target = wp_parse_url(trim($url));
	$home   = wp_parse_url(home_url('/'));
	if(!is_array($target) || !is_array($home) || empty($target['host']) || empty($home['host'])) {
		return false;
	}

	$target_port = $target['port'] ?? null;
	$home_port   = $home['port'] ?? null;
	$target_scheme = strtolower($target['scheme'] ?? '');
	$home_scheme   = strtolower($home['scheme'] ?? '');
	if(($target_scheme === 'http' && $target_port === 80) || ($target_scheme === 'https' && $target_port === 443)) {
		$target_port = null;
	}
	if(($home_scheme === 'http' && $home_port === 80) || ($home_scheme === 'https' && $home_port === 443)) {
		$home_port = null;
	}

	return strtolower($target['host']) === strtolower($home['host'])
		&& $target_port === $home_port;
}

/**
 * 投稿が認証不要の公開カードへ掲載可能か判定する。
 *
 * 現在のユーザー権限は参照せず、キャッシュされても全閲覧者に公開できる情報だけを許可する。
 *
 * @param int $post_id
 * @return bool
 */
function isPubliclyViewableInternalPost($post_id) {
	$post = get_post($post_id);
	if(!$post instanceof \WP_Post || $post->post_password !== '') {
		return false;
	}

	$status = get_post_status_object($post->post_status);
	return is_object($status)
		&& !empty($status->public)
		&& is_post_type_viewable($post->post_type);
}

/**
 * リンク先の情報を取得する。
 *
 * @param int    $post_id
 * @param array  $ogps
 * @param string $url
 * @return array<string, int|string>
 */
function getLinkInfo($post_id, $ogps, $url = '') {
	if($post_id != 0) {
		if(!isPubliclyViewableInternalPost((int) $post_id)) {
			return [];
		}

		$image_id    = (int) get_post_thumbnail_id($post_id);
		$image       = (string) get_the_post_thumbnail_url($post_id, 'large');
		$image_width = 0;
		$image_height = 0;
		$post_title  = get_the_title($post_id);
		$description = getDescription($post_id, MAX_DESCRIPTION_CHAR_OF_NUM);
		$link_type   = 'internal';
	} else {
		$image_id    = 0;
		$image       = $ogps['og:image'] ?? '';
		$image_width = getPositiveImageDimension($ogps['og:image:width'] ?? 0);
		$image_height = getPositiveImageDimension($ogps['og:image:height'] ?? 0);
		$post_title  = $ogps['og:title'] ?? ($ogps['title'] ?? '');
		$description = $ogps['og:description'] ?? ($ogps['description'] ?? '');
		if($post_title === '') {
			$post_title = wp_parse_url($url, PHP_URL_HOST) ?: $url;
		}
		$link_type = 'external';
	}

	return array(
		'image'        => $image,
		'image_id'     => $image_id,
		'image_width'  => $image_width,
		'image_height' => $image_height,
		'link_type'    => $link_type,
		'title'        => $post_title,
		'description'  => $description,
	);
}

/**
 * OGP画像寸法を正の整数へ正規化する。
 *
 * @param mixed $value
 * @return int
 */
function getPositiveImageDimension($value) {
	$value = filter_var($value, FILTER_VALIDATE_INT, array('options' => array('min_range' => 1)));
	return $value === false ? 0 : $value;
}

/**
 * 記事情報をディスクリプションに変換する。
 *
 * @param int $id 記事ID
 * @param int $len 文字数
 * @return string
 */
function getDescription($id, $len) {
	$post = get_post($id);
	if(!$post instanceof \WP_Post) {
		return '';
	}

	$description = str_replace(array("\r\n", "\r", "\n", '&nbsp;'), '', $post->post_content);
	$description = wp_strip_all_tags($description);
	$description = preg_replace('/\[.*\]/', '', $description);
	return mb_substr((string) $description, 0, $len);
}
