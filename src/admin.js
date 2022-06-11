import './admin.scss';
import thumbnail from './../asset/img/thumbnail.jpg';
import { getSlcClass } from './admin-class.js';

import { render, useState, useEffect } from '@wordpress/element';
import { RadioControl, Button, RangeControl, ColorPicker } from '@wordpress/components';
import api from '@wordpress/api';

import classnames from 'classnames';

import { Store } from 'react-notifications-component';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';

/**
 * 管理画面
 */
const Admin = () => {
	//設定値
	const [ layout, setLayout ]                                   = useState( 'card' );
	const [ borderRadius, setBorderRadius ]                       = useState( 0 );
	const [ shadowOffsetX, setShadowOffsetX ]                     = useState( 3 );
	const [ shadowOffsetY, setShadowOffsetY ]                     = useState( 3 );
	const [ shadowBlurRadius, setShadowBlurRadius ]               = useState( 3 );
	const [ shadowSpreadRadius, setShadowSpreadRadius ]           = useState( 3 );
	const [ shadowColor, setShadowColor ]                         = useState( '#000' );
	const [ hover, setHover ]                                     = useState( 'shadow' );
	const [ hoverTop, setHoverTop ]                               = useState( -5 );
	const [ hoverTransitionTime, setHoverTransitionTime ]         = useState( 0.3 );
	const [ hoverShadowOffsetX, setHoverShadowOffsetX ]           = useState( 3 );
	const [ hoverShadowOffsetY, setHoverShadowOffsetY ]           = useState( 3 );
	const [ hoverShadowBlurRadius, setHoverShadowBlurRadius ]     = useState( 3 );
	const [ hoverShadowSpreadRadius, setHoverShadowSpreadRadius ] = useState( 3 );
	const [ hoverShadowColor, setHoverShadowColor ]               = useState( '#000' );
	//プレビュー用スタイルシート
	const styles = {
		top: 0,
		boxShadow: shadowOffsetX + 'px ' + shadowOffsetY + 'px ' + shadowBlurRadius + 'px ' + shadowSpreadRadius + 'px ' + shadowColor,
	}
	const hoverdStyles = {
		top: -1 * hoverTop,
		boxShadow: hoverShadowOffsetX + 'px ' + hoverShadowOffsetY + 'px ' + hoverShadowBlurRadius + 'px ' + hoverShadowSpreadRadius + 'px ' + hoverShadowColor,
	}
	const hoverShadowSettingStyles = {
		display: hover === 'none' ? 'none' : 'block',
	}
	//プレビューのカード型リンクにホバーしている時true
	const [ isHover, setIsHover ] = useState( false );
	useEffect( () => {
		api.loadPromise.then( () => {
			// Modelの生成
			const model = new api.models.Settings();
			// 設定値の取得
			model.fetch().then( response => {
				setLayout( response.custom_link_card_settings.layout );
				setBorderRadius( response.custom_link_card_settings.border_radius );
				setShadowOffsetX( response.custom_link_card_settings.shadow_offset_x );
				setShadowOffsetY( response.custom_link_card_settings.shadow_offset_y );
				setShadowBlurRadius( response.custom_link_card_settings.shadow_blur_radius );
				setShadowSpreadRadius( response.custom_link_card_settings.shadow_spread_radius );
				setShadowColor( response.custom_link_card_settings.shadow_color );
				setHover( response.custom_link_card_settings.hover );
				setHoverTop( response.custom_link_card_settings.hover_top );
				setHoverTransitionTime( response.custom_link_card_settings.hover_transition_time );
				setHoverShadowOffsetX( response.custom_link_card_settings.hover_shadow_offset_x );
				setHoverShadowOffsetY( response.custom_link_card_settings.hover_shadow_offset_y );
				setHoverShadowBlurRadius( response.custom_link_card_settings.hover_shadow_blur_radius );
				setHoverShadowSpreadRadius( response.custom_link_card_settings.hover_shadow_spread_radius );
				setHoverShadowColor( response.custom_link_card_settings.hover_shadow_color );
			});
		});
	}, []);
	//データを保存する処理
	const dataSave = () => {
		api.loadPromise.then( () => {
			const model = new api.models.Settings({
				'custom_link_card_settings' : {
					'layout': layout,
					'border_radius': borderRadius,
					'shadow_offset_x': shadowOffsetX,
					'shadow_offset_y': shadowOffsetY,
					'shadow_blur_radius': shadowBlurRadius,
					'shadow_spread_radius': shadowSpreadRadius,
					'shadow_color': shadowColor,
					'hover': hover,
					'hover_top': hoverTop,
					'hover_transition_time': hoverTransitionTime,
					'hover_shadow_offset_x': hoverShadowOffsetX,
					'hover_shadow_offset_y': hoverShadowOffsetY,
					'hover_shadow_blur_radius': hoverShadowBlurRadius,
					'hover_shadow_spread_radius': hoverShadowSpreadRadius,
					'hover_shadow_color': hoverShadowColor,
				}
			});
			const save = model.save();
			save.success( ( response, status ) => {
				Store.addNotification({
					title: 'Success!',
					message: '入力内容を保存しました。',
					type: 'success',
					insert: 'top',
					container: 'top-center',
					animationIn: ['animate__animated', 'animate__fadeIn'],
					animationOut: ['animate__animated', 'animate__fadeOut'],
					dismiss: {
						duration: 5000,
						onScreen: true
					}
				});
			});
			save.error( ( response, status ) => {
				Store.addNotification({
					title: 'Error!',
					message: '入力内容を保存できませんでした。',
					type: 'danger',
					insert: 'top',
					container: 'top-center',
					animationIn: ['animate__animated', 'animate__fadeIn'],
					animationOut: ['animate__animated', 'animate__fadeOut'],
					dismiss: {
						duration: 5000,
						onScreen: true
					}
				});
			});
		});
	};
	const clcClass = getSlcClass(layout, hover, borderRadius, hoverTransitionTime);
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
						style={ isHover && hover !== 'none' ? hoverdStyles : styles }
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
							className={ layout == 'card' ? 'clc__thumbnail' : 'clc__thumbnail clc__thumbnail--list' }
							src={ thumbnail }
						/>
						<div className='clc__info'>
							<p
								className={ layout == 'card' ? 'clc__title' : 'clc__title clc__title--list' }
							>
								サンプルの記事カードです。
							</p>
							<p
								className={ layout == 'card' ? 'clc__description' : 'clc__description clc__description--list' }
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
									selected={ layout }
									options={ [
										{ label: 'カード型', value: 'card' },
										{ label: 'リスト型', value: 'list' },
									] }
									onChange={ ( value ) => setLayout( value ) }
								/>
								<label className='u-display--inline-block u-marign-top--8px'>影の色</label>
								<ColorPicker
									color={ shadowColor }
									onChange={ setShadowColor }
									enableAlpha
								/>
							</div>
							<div className='u-width--50-percent'>
								<RangeControl
									label='角の丸さ（px）'
									value={ borderRadius }
									onChange={ ( value ) => setBorderRadius( value ) }
									min={ 0 }
									max={ 15 }
								/>
								<RangeControl
									label='影の長さ（x方向）'
									value={ shadowOffsetX }
									onChange={ ( value ) => setShadowOffsetX( value ) }
									min={ -10 }
									max={ 10 }
								/>
								<RangeControl
									label='影の長さ（y方向）'
									value={ shadowOffsetY }
									onChange={ ( value ) => setShadowOffsetY( value ) }
									min={ -10 }
									max={ 10 }
								/>
								<RangeControl
									label='ぼかしの拡張・縮小'
									value={ shadowBlurRadius }
									onChange={ ( value ) => setShadowBlurRadius( value ) }
									min={ 0 }
									max={ 10 }
								/>
								<RangeControl
									label='影の拡張・縮小'
									value={ shadowSpreadRadius }
									onChange={ ( value ) => setShadowSpreadRadius( value ) }
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
									selected={ hover }
									options={ [
										{ label: 'なし', value: 'none' },
										{ label: '影を表示する', value: 'shadow' },
									] }
									onChange={ ( value ) => setHover( value ) }
								/>
								<label
									className='u-display--inline-block u-marign-top--8px'
									style={ hoverShadowSettingStyles }
								>
									影の色
								</label>
								<ColorPicker
									color={ hoverShadowColor }
									onChange={ setHoverShadowColor }
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
									value={ hoverTransitionTime }
									onChange={ ( value ) => setHoverTransitionTime( value ) }
									min={ 0 }
									max={ 1 }
									step={ 0.1 }
								/>
								<RangeControl
									label='ホバー時の高さ'
									value={ hoverTop }
									onChange={ ( value ) => setHoverTop( value ) }
									min={ 0 }
									max={ 10 }
								/>
								<RangeControl
									label='影の長さ（x方向）'
									value={ hoverShadowOffsetX }
									onChange={ ( value ) => setHoverShadowOffsetX( value ) }
									min={ -10 }
									max={ 10 }
								/>
								<RangeControl
									label='影の長さ（y方向）'
									value={ hoverShadowOffsetY }
									onChange={ ( value ) => setHoverShadowOffsetY( value ) }
									min={ -10 }
									max={ 10 }
								/>
								<RangeControl
									label='ぼかしの拡張・縮小'
									value={ hoverShadowBlurRadius }
									onChange={ ( value ) => setHoverShadowBlurRadius( value ) }
									min={ 0 }
									max={ 10 }
								/>
								<RangeControl
									label='影の拡張・縮小'
									value={ hoverShadowSpreadRadius }
									onChange={ ( value ) => setHoverShadowSpreadRadius( value ) }
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
