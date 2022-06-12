import './admin.scss';
import thumbnail from './../asset/img/thumbnail.jpg';
import { getSlcClass } from './admin/class.js';
import { makeStyles , makeHoverdStyles , makeHoverShadowSettingStyles } from './admin/styles.js';
import { settingNotification } from './admin/settingNotification.js';
import { setStandardDesign , setRecommendedDesign1 , setRecommendedDesign2 } from './admin/design.js';

import { render, useState, useLayoutEffect } from '@wordpress/element';
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
	const [ settings , setSettings ] = useState({});
	//プレビューのカード型リンクにホバーしている時true
	const [ isHover, setIsHover ] = useState( false );
	//プレビュー用スタイルシート
	const styles = makeStyles( settings );
	const hoverdStyles = makeHoverdStyles( settings );
	const hoverShadowSettingStyles = makeHoverShadowSettingStyles( settings );
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
					'border_radius': settings.borderRadius,
					'shadow_offset_x': settings.shadowOffsetX,
					'shadow_offset_y': settings.shadowOffsetY,
					'shadow_blur_radius': settings.shadowBlurRadius,
					'shadow_spread_radius': settings.shadowSpreadRadius,
					'shadow_color': settings.shadowColor,
					'hover': settings.hover,
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
	const clcClass = getSlcClass(settings);
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
							: <a
								className={classnames(clcClass)}
								style={ isHover && settings.hover !== 'none' ? hoverdStyles : styles }
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
									className={ settings.layout == 'card' ? 'clc__thumbnail' : 'clc__thumbnail clc__thumbnail--list' }
									src={ thumbnail }
								/>
								<div className='clc__info'>
									<p
										className={ settings.layout == 'card' ? 'clc__title' : 'clc__title clc__title--list' }
									>
										サンプルの記事カードです。
									</p>
									<p
										className={ settings.layout == 'card' ? 'clc__description' : 'clc__description clc__description--list' }
									>
										サンプルの記事カードの説明です。サンプルの記事カードの説明です。サンプルの記事カードの説明です。サンプルの記事カードの説明です。サンプルの記事カードの説明です。この文字の長さはちょうど100文字です。
									</p>
								</div>
							</a>
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
							onClick={ () => setStandardDesign( setSettings ) }
							variant='secondary'
						>
							スタンダードデザイン
						</Button>
						<Button
							className='u-marign-left--5px'
							onClick={ () => setRecommendedDesign1( setSettings ) }
							variant='secondary'
						>
							おすすめデザイン１（リスト型）
						</Button>
						<Button
							className='u-marign-left--5px'
							onClick={ () => setRecommendedDesign2( setSettings ) }
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
								<label className='u-display--inline-block u-marign-top--8px'>影の色</label>
								<ColorPicker
									color={ settings.shadowColor }
									onChange={ ( value ) => setSettings({...settings, shadowColor: value }) }
									enableAlpha
								/>
							</div>
							<div className='u-width--50-percent'>
								<RangeControl
									label='角の丸さ（px）'
									value={ settings.borderRadius }
									onChange={ ( value ) => setSettings({...settings, borderRadius: value }) }
									min={ 0 }
									max={ 15 }
								/>
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
									selected={ settings.hover }
									options={ [
										{ label: 'なし', value: 'none' },
										{ label: '影を表示する', value: 'shadow' },
									] }
									onChange={ ( value ) => setSettings({...settings, hover: value }) }
								/>
								<label
									className='u-display--inline-block u-marign-top--8px'
									style={ hoverShadowSettingStyles }
								>
									影の色
								</label>
								<ColorPicker
									color={ settings.hoverShadowColor }
									onChange={ ( value ) => setSettings({...settings, hoverShadowColor: value }) }
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
