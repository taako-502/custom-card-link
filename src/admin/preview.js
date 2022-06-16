import thumbnail from './../../asset/img/thumbnail.jpg';
import { getSlcClass } from './class.js';
import { makeStyles , makeHoverdStyles } from './styles.js';

import { useState } from '@wordpress/element';

import classnames from 'classnames';

export const Preview = ( settings , isHover, setIsHover ) => {
	//クラス
	const clcClass = getSlcClass(settings);
	//プレビュー用スタイルシート
	const styles = makeStyles( settings );
	const hoverdStyles = makeHoverdStyles( settings );
	//プレビューのカード型リンクにホバーしている時true
	return (
		<a
			className={ classnames(clcClass) }
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
			<div
				className='clc__info'
				style={{
					marginLeft: settings.layout == 'card' ? '0' : settings.gapBetweenTitleAndThumbnail + 'px',
					marginTop: settings.layout == 'card' ? settings.gapBetweenTitleAndThumbnail + 'px' : '0'
				}}
			>
				<p
					className={ settings.layout == 'card' ? 'clc__title' : 'clc__title clc__title--list' }
					style={{
						fontSize: settings.titleFontSize + 'px'
					}}
				>
					{ TextPreview( 'サンプルの記事カードです。' , settings.titleNumOfChar ) }
				</p>
				<p
					className={ settings.layout == 'card' ? 'clc__description' : 'clc__description clc__description--list' }
					style={{
						fontSize: settings.descriptionFontSize + 'px',
						marginTop: settings.descriptionMarginTop + 'px'
					}}
				>
					{ TextPreview( 'サンプルの記事カードの説明です。' , settings.descriptionNumOfChar ) }
				</p>
			</div>
		</a>
	);
}

const TextPreview = ( base , numOfChar ) => {
	let description = '';
	for (var i = 0; i < numOfChar; i++) {
		const character = i % base.length;
		description += base.charAt(character)
	}
	return (
		description
	);
}
