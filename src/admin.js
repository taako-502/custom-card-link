import './admin.scss';
import 'react-notifications-component/dist/theme.css';

import { settingNotification } from './admin/settingNotification.js';
import { setStandardDesignCard , setStandardDesignList , setRecommendedDesign1  } from './admin/design.js';
import { Preview } from './admin/preview.js';
import { SettingsPc } from './admin/settings-pc.js';

import { render, useState, useLayoutEffect } from '@wordpress/element';
import { Button } from '@wordpress/components';
import api from '@wordpress/api';

import { ReactNotifications } from 'react-notifications-component'

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
					setStandardDesignCard(setSettings);
				} else {
					setSettings({
						...settings,
						layout: response.custom_link_card_settings.layout,
						width: response.custom_link_card_settings.width,
						padding: response.custom_link_card_settings.padding,
						borderRadius: response.custom_link_card_settings.border_radius,
						titleFontSize: response.custom_link_card_settings.title_font_size,
						descriptionFontSize: response.custom_link_card_settings.description_font_size,
						titleNumOfChar: response.custom_link_card_settings.title_num_of_char,
						descriptionNumOfChar: response.custom_link_card_settings.description_num_of_char,
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
					'width': settings.width,
					'padding': settings.padding,
					'border_radius': settings.borderRadius,
					'title_font_size': settings.titleFontSize,
					'description_font_size': settings.descriptionFontSize,
					'title_num_of_char': settings.titleNumOfChar,
					'description_num_of_char': settings.descriptionNumOfChar,
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
						<div className="clc-admin__preview-wrap">
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
						{ SettingsPc( settings , setSettings ) }
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
