import './admin.scss';
import thumbnail from './../asset/img/thumbnail.jpg';
import { getSlcClass } from './admin/class.js';
import { makeStyles , makeHoverdStyles , makeHoverShadowSettingStyles } from './admin/styles.js';
import { settingNotification } from './admin/settingNotification.js';

import { render, useState, useEffect } from '@wordpress/element';
import { RadioControl, Button, RangeControl, ColorPicker } from '@wordpress/components';
import api from '@wordpress/api';

import classnames from 'classnames';

import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';

/**
 * 管理画面
 */
const Admin = () => {
	//設定値
	const [ setting , setSetting ] = useState({
		layout: 'card',
		borderRadius: 0,
		shadowOffsetX: 3,
		shadowOffsetY: 3,
		shadowBlurRadius: 3,
		shadowSpreadRadius: 3,
		shadowColor: '#000',
		hover: 'shadow',
		hoverTop: -5,
		hoverTransitionTime: 0.3,
		hoverShadowOffsetX: 3,
		hoverShadowOffsetY: 3,
		hoverShadowBlurRadius: 3,
		hoverShadowSpreadRadius: 3,
		hoverShadowColor: '#000',
	});
	//プレビューのカード型リンクにホバーしている時true
	const [ isHover, setIsHover ] = useState( false );
	//プレビュー用スタイルシート
	const styles = makeStyles( setting.shadowOffsetX , setting.shadowOffsetY , setting.shadowBlurRadius , setting.shadowSpreadRadius , setting.shadowColor );
	const hoverdStyles = makeHoverdStyles( setting.hoverTop , setting.hoverShadowOffsetX , setting.hoverShadowOffsetY , setting.hoverShadowBlurRadius , setting.hoverShadowSpreadRadius , setting.hoverShadowColor );
	const hoverShadowSettingStyles = makeHoverShadowSettingStyles( setting );
	useEffect( () => {
		api.loadPromise.then( () => {
			// Modelの生成
			const model = new api.models.Settings();
			// 設定値の取得
			model.fetch().then( response => {
				setSetting({...setting,
					layout: response.custom_link_card_settings.layout,
					borderRadius: response.custom_link_card_settings.border_radius,
					shadowOffsetX: response.custom_link_card_settings.shadow_offset_x,
					shadowOffsetY: response.custom_link_card_settings.shadow_offset_y,
					shadowBlurRadius: response.custom_link_card_settings.shadow_blur_radius,
					shadowSpreadRadius: response.custom_link_card_settings.shadow_spread_radius,
					shadowColor: response.custom_link_card_settings.shadow_color,
					hover: response.custom_link_card_settings.hover,
					hoverTop: response.custom_link_card_settings.hover_top,
					hoverTransitionTime: response.custom_link_card_settings.hover_transition_time,
					hoverShadowOffsetX: response.custom_link_card_settings.hover_shadow_offset_x,
					hoverShadowOffsetY: response.custom_link_card_settings.hover_shadow_offset_y,
					hoverShadowBlurRadius: response.custom_link_card_settings.hover_shadow_blur_radius,
					hoverShadowSpreadRadius: response.custom_link_card_settings.hover_shadow_spread_radius,
					hoverShadowColor: response.custom_link_card_settings.hover_shadow_color,
				});
			});
		});
	}, []);
	//データを保存する処理
	const dataSave = () => {
		api.loadPromise.then( () => {
			const model = new api.models.Settings({
				'custom_link_card_settings' : {
					'layout': setting.layout,
					'border_radius': setting.borderRadius,
					'shadow_offset_x': setting.shadowOffsetX,
					'shadow_offset_y': setting.shadowOffsetY,
					'shadow_blur_radius': setting.shadowBlurRadius,
					'shadow_spread_radius': setting.shadowSpreadRadius,
					'shadow_color': setting.shadowColor,
					'hover': setting.hover,
					'hover_top': setting.hoverTop,
					'hover_transition_time': setting.hoverTransitionTime,
					'hover_shadow_offset_x': setting.hoverShadowOffsetX,
					'hover_shadow_offset_y': setting.hoverShadowOffsetY,
					'hover_shadow_blur_radius': setting.hoverShadowBlurRadius,
					'hover_shadow_spread_radius': setting.hoverShadowSpreadRadius,
					'hover_shadow_color': setting.hoverShadowColor,
				}
			});
			const save = settingNotification( model );
		});
	};
	const clcClass = getSlcClass(setting.layout, setting.hover, setting.borderRadius, setting.hoverTransitionTime);
	return (
		<React.Fragment>
			<ReactNotifications />
			<div className='clc-admin'>
				<h1>カスタムリンクカードのデザインの設定画面</h1>
				<div className='clc-admin__wrap'>
					<div className='clc-admin__preview'>
					<h2>プレビュー</h2>
					<a
						className={classnames(clcClass)}
						style={ isHover && setting.hover !== 'none' ? hoverdStyles : styles }
						onMouseEnter={() => {
							//マウスホバー開始
							setIsHover( true );
						}}
						onMouseLeave={() => {
							//マウスホバー終了
							setIsHover( false );
						}}
					>
						<img
							className={ setting.layout == 'card' ? 'clc__thumbnail' : 'clc__thumbnail clc__thumbnail--list' }
							src={ thumbnail }
						/>
						<div className='clc__info'>
							<p
								className={ setting.layout == 'card' ? 'clc__title' : 'clc__title clc__title--list' }
							>
								サンプルの記事カードです。
							</p>
							<p
								className={ setting.layout == 'card' ? 'clc__description' : 'clc__description clc__description--list' }
							>
								サンプルの記事カードの説明です。サンプルの記事カードの説明です。サンプルの記事カードの説明です。サンプルの記事カードの説明です。サンプルの記事カードの説明です。この文字の長さはちょうど100文字です。
							</p>
						</div>
					</a>
				</div>
				<Button
					isPrimary
					onClick={ dataSave }
				>
					保存
				</Button>
				<div className='clc-admin__settings'>
						<h2>デザイン設定</h2>
						<div className='u-display--flex'>
							<div className='u-width--50-percent'>
								<RadioControl
									label='レイアウトデザイン'
									help='デザインのレイアウトを決めます。'
									selected={ setting.layout }
									options={ [
										{ label: 'カード型', value: 'card' },
										{ label: 'リスト型', value: 'list' },
									] }
									onChange={ ( value ) => setSetting({...setting, layout: value }) }
								/>
								<label className='u-display--inline-block u-marign-top--8px'>影の色</label>
								<ColorPicker
									color={ setting.shadowColor }
									onChange={ ( value ) => setSetting({...setting, shadowColor: value }) }
									enableAlpha
								/>
							</div>
							<div className='u-width--50-percent'>
								<RangeControl
									label='角の丸さ（px）'
									value={ setting.borderRadius }
									onChange={ ( value ) => setSetting({...setting, borderRadius: value }) }
									min={ 0 }
									max={ 15 }
								/>
								<RangeControl
									label='影の長さ（x方向）'
									value={ setting.shadowOffsetX }
									onChange={ ( value ) => setSetting({...setting, shadowOffsetX: value }) }
									min={ -10 }
									max={ 10 }
								/>
								<RangeControl
									label='影の長さ（y方向）'
									value={ setting.shadowOffsetY }
									onChange={ ( value ) => setSetting({...setting, shadowOffsetY: value }) }
									min={ -10 }
									max={ 10 }
								/>
								<RangeControl
									label='ぼかしの拡張・縮小'
									value={ setting.shadowBlurRadius }
									onChange={ ( value ) => setSetting({...setting, shadowBlurRadius: value }) }
									min={ 0 }
									max={ 10 }
								/>
								<RangeControl
									label='影の拡張・縮小'
									value={ setting.shadowSpreadRadius }
									onChange={ ( value ) => setSetting({...setting, shadowSpreadRadius: value }) }
									min={ 0 }
									max={ 10 }
								/>
							</div>
						</div>
						<h3>カスタムリンクカードをホバーした時のデザインや動作</h3>
						<div className='u-display--flex'>
							<div className='u-width--50-percent'>
								<RadioControl
									label='ホバー時の動作'
									help='リンクカードをホバーした際の動作'
									selected={ setting.hover }
									options={ [
										{ label: 'なし', value: 'none' },
										{ label: '影を表示する', value: 'shadow' },
									] }
									onChange={ ( value ) => setSetting({...setting, hover: value }) }
								/>
								<label
									className='u-display--inline-block u-marign-top--8px'
									style={ hoverShadowSettingStyles }
								>
									影の色
								</label>
								<ColorPicker
									color={ setting.hoverShadowColor }
									onChange={ ( value ) => setSetting({...setting, hoverShadowColor: value }) }
									enableAlpha
									style={ hoverShadowSettingStyles }
								/>
							</div>
							<div
								className='u-width--50-percent'
								style={ hoverShadowSettingStyles }
							>
								<RangeControl
									label='ホバー時の動作時間'
									value={ setting.hoverTransitionTime }
									onChange={ ( value ) => setSetting({...setting, hoverTransitionTime: value }) }
									min={ 0 }
									max={ 1 }
									step={ 0.1 }
								/>
								<RangeControl
									label='ホバー時の高さ'
									value={ setting.hoverTop }
									onChange={ ( value ) => setSetting({...setting, hoverTop: value }) }
									min={ 0 }
									max={ 10 }
								/>
								<RangeControl
									label='影の長さ（x方向）'
									value={ setting.hoverShadowOffsetX }
									onChange={ ( value ) => setSetting({...setting, hoverShadowOffsetX: value }) }
									min={ -10 }
									max={ 10 }
								/>
								<RangeControl
									label='影の長さ（y方向）'
									value={ setting.hoverShadowOffsetY }
									onChange={ ( value ) => setSetting({...setting, hoverShadowOffsetY: value }) }
									min={ -10 }
									max={ 10 }
								/>
								<RangeControl
									label='ぼかしの拡張・縮小'
									value={ setting.hoverShadowBlurRadius }
									onChange={ ( value ) => setSetting({...setting, hoverShadowBlurRadius: value }) }
									min={ 0 }
									max={ 10 }
								/>
								<RangeControl
									label='影の拡張・縮小'
									value={ setting.hoverShadowSpreadRadius }
									onChange={ ( value ) => setSetting({...setting, hoverShadowSpreadRadius: value })}
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
