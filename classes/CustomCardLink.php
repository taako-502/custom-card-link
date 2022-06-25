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
		$this->url                   = $url;
		$this->image                 = $settings['image']                 ?? '';
		$this->link_type             = $settings['link_type']             ?? '';
		$this->title                 = $settings['title']                 ?? '';
		$this->title_sp              = $settings['title_sp']              ?? '';
		$this->description           = $settings['description']           ?? '';
		$this->description_sp        = $settings['description_sp']        ?? '';
		$this->layout                = $settings['layout']                ?? '';
		$this->layout_sp             = $settings['layout_sp']             ?? '';
		$this->padding               = $settings['padding']               ?? 0;
		$this->border_radius         = $settings['border_radius']         ?? 0;
		$this->border_radius_sp      = $settings['border_radius_sp']      ?? 0;
		$this->hover_use             = $settings['hover_use']             ?? '';
		$this->hover_top             = $settings['hover_top']             ?? 0;
		$this->hover_transition_time = $settings['hover_transition_time'] ?? 0;

	}

	/**
	 * 外部リンクカード
	 * @param  string $url
	 * @return string
	 */
	public function make_ccl() {
		$main_class  = 'ccl ccl--'.$this->layout;
		$main_class .= ' ccl-sp--'.$this->layout_sp;
		$main_class .= $this->border_radius != 0 ? ' u-border-radius--'.$this->border_radius.'px' : '';
		$main_class .= ' u-padding--'.$this->padding.'px';
		$main_class .= ' ccl--hover-'.$this->hover_use;
		$main_class .= ' u-hover-top--'.( $this->hover_top * -1 ).'px';
		$main_class .= $this->hover_transition_time != 0 ? ' u-transition--top-box-shadow--'.number_to_class($this->hover_transition_time).'s' : '';
		$thumbnail   = trim($this->image) !== '' ? '<img class="ccl__thumbnail ccl__thumbnail--'.$this->layout.' ccl-sp__thumbnail--'.$this->layout_sp.'" src="'.$this->image.'">' : '';
		$target      = $this->link_type == 'external' ? 'target="_blanck"' : '';
		$rel         = $target !== '' ? 'rel="noopener noreferrer"' : '';
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
}
