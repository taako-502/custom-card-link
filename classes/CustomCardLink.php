<?php
Namespace Ccl_Plugin\classes;

class CustomCardLink {
	private string $url                = '';
	private string $image              = '';
	private string $link_type          = '';
	private string $title              = '';
	private string $title_sp           = '';
	private string $description        = '';
	private string $description_sp     = '';
	private string $layout             = 'card';
	private string $layout_sp          = 'card';
	private int $padding               = 0;
	private int $border_radius         = 0;
	private int $border_radius_sp      = 0;
	private string $hover_use          = 'none';
	private int $hover_top             = 0;
	private int $hover_transition_time = 0;

	public function __construct($url, $settings) {
		//初期化
		$this->url                   = $url;
		$this->image                 = $settings['image']                 ?? '';
		$this->link_type             = $settings['link_type']             ?? '';
		$this->layout                = $settings['layout']                ?? '';
		$this->layout_sp             = $settings['layout_sp']             ?? '';
		$this->padding               = $settings['padding']               ?? 0;
		$this->border_radius         = $settings['border_radius']         ?? 0;
		$this->border_radius_sp      = $settings['border_radius_sp']      ?? 0;
		$this->hover_use             = $settings['hover_use']             ?? '';
		$this->hover_top             = $settings['hover_top']             ?? 0;
		$this->hover_transition_time = $settings['hover_transition_time'] ?? 0;

		//タイトル、ディスクリプションの整形
		$title_num_of_char          = $settings['title_num_of_char']          ?? 0;
		$title_num_of_char_sp       = $settings['title_num_of_char_sp']       ?? 0;
		$description_num_of_char    = $settings['description_num_of_char']    ?? 0;
		$description_num_of_char_sp = $settings['description_num_of_char_sp'] ?? 0;
		$this->title                = isset($settings['title'])       ? $this->format_title($settings['title'], $title_num_of_char)                : '';
		$this->title_sp             = isset($settings['title'])       ? $this->format_title($settings['title'], $title_num_of_char_sp)             : '';
		$this->description          = isset($settings['description']) ? $this->format_title($settings['description'], $description_num_of_char)    : '';
		$this->description_sp       = isset($settings['description']) ? $this->format_title($settings['description'], $description_num_of_char_sp) : '';
	}

	/**
	 * 外部リンクカード
	 * @param  string $url
	 * @return string
	 */
	public function make_ccl() {
		$main_class = $this->get_main_class();
		$thumbnail  = trim($this->image) !== '' ? '<img class="ccl__thumbnail ccl__thumbnail--'.$this->layout.' ccl-sp__thumbnail--'.$this->layout_sp.'" src="'.$this->image.'">' : '';
		$target     = $this->link_type == 'external' ? 'target="_blanck"' : '';
		$rel        = $target !== '' ? 'rel="noopener noreferrer"' : '';
		return '
			<a class="'.$main_class.'" href="'.$this->url.'" '.$target.' '.$rel.'>
				'.$thumbnail.'
				<div class="ccl__info ccl__info--'.$this->layout.' ccl-sp__info--'.$this->layout_sp.'">
					<p class="ccl__title ccl__title--'.$this->layout.'">'.$this->title.'</p>
					<p class="ccl__title ccl-sp__title ccl-sp__title--'.$this->layout.'">'.$this->title_sp.'</p>
					<p class="ccl__description ccl__description--'.$this->layout.'">'.$this->description.'</p>
					<p class="ccl__description ccl-sp__description ccl-sp__description--'.$this->layout.'">'.$this->description_sp.'</p>
				</div>
			</a>';
	}

	/**
	 * カードリンクの一番外側のclass
	 * @return string
	 */
	private function get_main_class() {
		$class  = 'ccl ccl--'.$this->layout;
		$class .= ' ccl-sp--'.$this->layout_sp;
		$class .= $this->border_radius != 0 ? ' u-border-radius--'.$this->border_radius.'px' : '';
		$class .= ' u-padding--'.$this->padding.'px';
		$class .= ' ccl--hover-'.$this->hover_use;
		$class .= ' u-hover-top--'.( $this->hover_top * -1 ).'px';
		$class .= $this->hover_transition_time != 0 ? ' u-transition--top-box-shadow--'.number_to_class($this->hover_transition_time).'s' : '';
		return $class;
	}

	private function number_to_class($num) {
		switch ($num) {
			case 0.1:
				return 'point-1';
				break;
			case 0.2:
				return 'point-2';
				break;
			case 0.3:
				return 'point-3';
				break;
			case 0.4:
				return 'point-4';
				break;
			case 0.5:
				return 'point-5';
				break;
			case 0.6:
				return 'point-6';
				break;
			case 0.7:
				return 'point-7';
				break;
			case 0.8:
				return 'point-8';
				break;
			case 0.9:
				return 'point-9';
				break;
			case 1:
				return '1';
				break;
		}
		return;
	}

	/**
	 * タイトルの整形
	 * @param  string $title
	 * @param  int $num
	 * @return string
	 */
	private function format_title($title, $num) {
		return mb_strlen($title) <= $num ? mb_substr($title, 0, $num) : mb_substr($title, 0, $num).'...';
	}

	/**
	 * ディスクリプションの整形
	 * @param  string $title
	 * @param  int $num
	 * @return string
	 */
	private function format_description($description, $num) {
		return $num == 0 ? mb_substr($description, 0, $num) : mb_substr($description, 0, $num).'...';
	}
}
