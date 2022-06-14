import './admin.scss';
import { settingNotification } from './admin/settingNotification.js';
import { setStandardDesignCard , setStandardDesignList , setRecommendedDesign1  } from './admin/design.js';
import { styleDisplayNone } from './admin/visibility.js';
import { Preview } from './admin/preview.js';

import { render, useState, useLayoutEffect } from '@wordpress/element';
import { RadioControl, Button, RangeControl, ColorPicker } from '@wordpress/components';
import api from '@wordpress/api';

import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';

/**
 * 管理画面
 */
const Admin = () => {
	//設定値
	const [ settings , setSettings ] = useState({});
	const [ isHover, setIsHover ] = useState( false );
	useLayoutEffect( () => {
		api.loadPromise.then( () => {
			// Modelの生成
			const model = new api.models.Settings();
			// 設定値の取得
			model.fetch().then( response => {
				if( response.custom_link_card_settings === undefined || response.custom_link_card_settings === null ) {
					setStandardDesign(setSettings);
				} else {
					setSettings({...settings,
						layout: response.custom_link_card_settings.layout,
						thumbnailAspectRatio: response.custom_link_card_settings.thumbnail_aspect_ratio,
						padding: response.custom_link_card_settings.padding,
						borderRadius: response.custom_link_card_settings.border_radius,
						titleFontSize: response.custom_link_card_settings.title_font_size,
						descriptionFontSize: response.custom_link_card_settings.description_font_size,
						gapBetweenTitleAndThumbnail: response.custom_link_card_settings.gap_between_title_and_thumbnail,
						descriptionMarginTop: response.custom_link_card_settings.description_margin_top,
						shadowUse: response.custom_link_card_settings.shadow_use,
						shadowOffsetX: response.custom_link_card_settings.shadow_offset_x,
						shadowOffsetY: response.custom_link_card_settings.shadow_offset_y,
						shadowBlurRadius: response.custom_link_card_settings.shadow_blur_radius,
						shadowSpreadRadius: response.custom_link_card_settings.shadow_spread_radius,
						shadowColor: response.custom_link_card_settings.shadow_color,
						hoverUse: response.custom_link_card_settings.hover_use,
						hoverTop: response.custom_link_card_settings.hover_top,
						hoverTransitionTime: response.custom_link_card_settings.hover_transition_time,
						hoverShadowOffsetX: response.custom_link_card_settings.hover_shadow_offset_x,
						hoverShadowOffsetY: response.custom_link_card_settings.hover_shadow_offset_y,
						hoverShadowBlurRadius: response.custom_link_card_settings.hover_shadow_blur_radius,
						hoverShadowSpreadRadius: response.custom_link_card_settings.hover_shadow_spread_radius,
						hoverShadowColor: response.custom_link_card_settings.hover_shadow_color,
					});
				}
			});
		});
	}, []);
	//データを保存する処理
	const dataSave = () => {
		api.loadPromise.then( () => {
			const model = new api.models.Settings({
				'custom_link_card_settings' : {
					'layout': settings.layout,
					'thumbnail_aspect_ratio': settings.thumbnailAspectRatio,
					'padding': settings.padding,
					'border_radius': settings.borderRadius,
					'title_font_size': settings.titleFontSize,
					'description_font_size': settings.descriptionFontSize,
					'gap_between_title_and_thumbnail': settings.gapBetweenTitleAndThumbnail,
					'description_margin_top': settings.descriptionMarginTop,
					'shadow_use': settings.shadowUse,
					'shadow_offset_x': settings.shadowOffsetX,
					'shadow_offset_y': settings.shadowOffsetY,
					'shadow_blur_radius': settings.shadowBlurRadius,
					'shadow_spread_radius': settings.shadowSpreadRadius,
					'shadow_color': settings.shadowColor,
					'hover_use': settings.hoverUse,
					'hover_top': settings.hoverTop,
					'hover_transition_time': settings.hoverTransitionTime,
					'hover_shadow_offset_x': settings.hoverShadowOffsetX,
					'hover_shadow_offset_y': settings.hoverShadowOffsetY,
					'hover_shadow_blur_radius': settings.hoverShadowBlurRadius,
					'hover_shadow_spread_radius': settings.hoverShadowSpreadRadius,
					'hover_shadow_color': settings.hoverShadowColor,
				}
			});
			const save = settingNotification( model );
		});
	};
	return (
		<React.Fragment>
			<ReactNotifications />
			<div className='clc-admin'>
				<h1>カスタムリンクカードのデザインの設定画面</h1>
				<div className='clc-admin__wrap'>
					<div className='clc-admin__preview'>
						<h2>プレビュー</h2>
						<div>
						{ Object.keys(settings).length === 0
							? <div></div>
							: Preview( settings , isHover , setIsHover )
						}
						</div>
					</div>
					<div className='clc-admin__buttons'>
						<Button
							isPrimary
							onClick={ dataSave }
						>
							保存
						</Button>
						<Button
							className='u-marign-left--5px'
							onClick={ () => setStandardDesignCard( setSettings ) }
							variant='secondary'
						>
							スタンダードデザイン（カード型）
						</Button>
						<Button
							className='u-marign-left--5px'
							onClick={ () => setStandardDesignList( setSettings ) }
							variant='secondary'
						>
							スタンダードデザイン（リスト型）
						</Button>
						<Button
							className='u-marign-left--5px'
							onClick={ () => setRecommendedDesign1( setSettings ) }
							variant='secondary'
						>
							おすすめデザイン２（リスト型）
						</Button>
					</div>
					<div className='clc-admin__settings'>
						<h2>デザイン設定</h2>
						<div className='u-display--flex'>
							<div className='u-width--50-percent'>
								<RadioControl
									label='レイアウトデザイン'
									help='デザインのレイアウトを決めます。'
									selected={ settings.layout }
									options={ [
										{ label: 'カード型', value: 'card' },
										{ label: 'リスト型', value: 'list' },
									] }
									onChange={ ( value ) => setSettings({...settings, layout: value }) }
								/>
								<RangeControl
									label='サムネイル縦横比率'
									value={ settings.thumbnailAspectRatio }
									onChange={ ( value ) => setSettings({...settings, thumbnailAspectRatio: value }) }
									min={ 0 }
									max={ 15 }
								/>
								<RangeControl
									label='内側の余白'
									value={ settings.padding }
									onChange={ ( value ) => setSettings({...settings, padding: value }) }
									min={ 0 }
									max={ 40 }
								/>
								<RangeControl
									label='角の丸さ（px）'
									value={ settings.borderRadius }
									onChange={ ( value ) => setSettings({...settings, borderRadius: value }) }
									min={ 0 }
									max={ 15 }
								/>
							</div>
							<div className='u-width--50-percent'>
								<RangeControl
									label='タイトル文字サイズ'
									value={ settings.titleFontSize }
									onChange={ ( value ) => setSettings({...settings, titleFontSize: value }) }
									min={ 10 }
									max={ 30 }
								/>
								<RangeControl
								label='説明文字サイズ'
								value={ settings.descriptionFontSize }
								onChange={ ( value ) => setSettings({...settings, descriptionFontSize: value }) }
								min={ 10 }
								max={ 30 }
								/>
								<RangeControl
									label='サムネイルとタイトルおよび説明の間の余白'
									value={ settings.gapBetweenTitleAndThumbnail }
									onChange={ ( value ) => setSettings({...settings, gapBetweenTitleAndThumbnail: value }) }
									min={ 0 }
									max={ 30 }
								/>
								<RangeControl
									label='タイトルと説明の間の余白'
									value={ settings.descriptionMarginTop }
									onChange={ ( value ) => setSettings({...settings, descriptionMarginTop: value }) }
									min={ 0 }
									max={ 15 }
								/>
							</div>
						</div>
						<h2>影</h2>
						<div className='u-display--flex'>
							<div className='u-width--50-percent'>
								<RadioControl
									label='影の有無'
									selected={ settings.shadowUse }
									options={ [
										{ label: 'なし', value: 'none' },
										{ label: 'あり', value: 'shadow' },
									] }
									onChange={ ( value ) => setSettings({...settings, shadowUse: value }) }
								/>
								<label
									className='u-display--inline-block u-marign-top--8px'
									style={ styleDisplayNone( settings.shadowUse ) }
								>
									影の色
								</label>
								<ColorPicker
									color={ settings.shadowColor }
									onChange={ ( value ) => setSettings({...settings, shadowColor: value }) }
									enableAlpha
									style={ styleDisplayNone( settings.shadowUse ) }
								/>
							</div>
							<div
								className='u-width--50-percent'
								style={ styleDisplayNone( settings.shadowUse ) }
							>
								<RangeControl
									label='影の長さ（x方向）'
									value={ settings.shadowOffsetX }
									onChange={ ( value ) => setSettings({...settings, shadowOffsetX: value }) }
									min={ -10 }
									max={ 10 }
								/>
								<RangeControl
									label='影の長さ（y方向）'
									value={ settings.shadowOffsetY }
									onChange={ ( value ) => setSettings({...settings, shadowOffsetY: value }) }
									min={ -10 }
									max={ 10 }
								/>
								<RangeControl
									label='ぼかしの拡張・縮小'
									value={ settings.shadowBlurRadius }
									onChange={ ( value ) => setSettings({...settings, shadowBlurRadius: value }) }
									min={ 0 }
									max={ 10 }
								/>
								<RangeControl
									label='影の拡張・縮小'
									value={ settings.shadowSpreadRadius }
									onChange={ ( value ) => setSettings({...settings, shadowSpreadRadius: value }) }
									min={ 0 }
									max={ 10 }
								/>
							</div>
						</div>
						<h2>カスタムリンクカードをホバーした時のデザインや動作</h2>
						<div className='u-display--flex'>
							<div className='u-width--50-percent'>
								<RadioControl
									label='ホバー時の動作'
									help='リンクカードをホバーした際の動作'
									selected={ settings.hoverUse }
									options={ [
										{ label: 'なし', value: 'none' },
										{ label: '影を表示する', value: 'shadow' },
									] }
									onChange={ ( value ) => setSettings({...settings, hoverUse: value }) }
								/>
								<label
									className='u-display--inline-block u-marign-top--8px'
									style={ styleDisplayNone( settings.hoverUse ) }
								>
									影の色
								</label>
								<ColorPicker
									color={ settings.hoverShadowColor }
									onChange={ ( value ) => setSettings({...settings, hoverShadowColor: value }) }
									enableAlpha
									style={ styleDisplayNone( settings.hoverUse ) }
								/>
							</div>
							<div
								className='u-width--50-percent'
								style={ styleDisplayNone( settings.hoverUse ) }
							>
								<RangeControl
									label='ホバー時の動作時間'
									value={ settings.hoverTransitionTime }
									onChange={ ( value ) => setSettings({...settings, hoverTransitionTime: value }) }
									min={ 0 }
									max={ 1 }
									step={ 0.1 }
								/>
								<RangeControl
									label='ホバー時の高さ'
									value={ settings.hoverTop }
									onChange={ ( value ) => setSettings({...settings, hoverTop: value }) }
									min={ 0 }
									max={ 10 }
								/>
								<RangeControl
									label='影の長さ（x方向）'
									value={ settings.hoverShadowOffsetX }
									onChange={ ( value ) => setSettings({...settings, hoverShadowOffsetX: value }) }
									min={ -10 }
									max={ 10 }
								/>
								<RangeControl
									label='影の長さ（y方向）'
									value={ settings.hoverShadowOffsetY }
									onChange={ ( value ) => setSettings({...settings, hoverShadowOffsetY: value }) }
									min={ -10 }
									max={ 10 }
								/>
								<RangeControl
									label='ぼかしの拡張・縮小'
									value={ settings.hoverShadowBlurRadius }
									onChange={ ( value ) => setSettings({...settings, hoverShadowBlurRadius: value }) }
									min={ 0 }
									max={ 10 }
								/>
								<RangeControl
									label='影の拡張・縮小'
									value={ settings.hoverShadowSpreadRadius }
									onChange={ ( value ) => setSettings({...settings, hoverShadowSpreadRadius: value })}
									min={ 0 }
									max={ 10 }
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

render(
	<Admin />,
	document.getElementById('clc-admin')
);
