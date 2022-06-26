import thumbnail from './../../asset/img/thumbnail.jpg';
import { getCclClass, getSlcThumbnailClass } from './class.js';
import { makeStyles, makeHoverdStyles } from './styles.js';

import { useState } from '@wordpress/element';

import classnames from 'classnames';

export const Preview = ( mediaSize, settings, isHover, setIsHover ) => {
	//クラス
	const cclClass = getCclClass( mediaSize, settings );
	const cclThumbnailClass = getSlcThumbnailClass( mediaSize, settings );
	//プレビュー用スタイルシート
	const styles = makeStyles( mediaSize, settings );
	const hoverdStyles = makeHoverdStyles( mediaSize, settings );
	//設定値
	const layout = ! mediaSize ? settings.layout : settings.layoutSp;
	const gapBetweenTitleAndThumbnail = ! mediaSize
		? settings.gapBetweenTitleAndThumbnail
		: settings.gapBetweenTitleAndThumbnailSp;
	const titleFontSize = ! mediaSize
		? settings.titleFontSize
		: settings.titleFontSizeSp;
	const descriptionFontSize = ! mediaSize
		? settings.descriptionFontSize
		: settings.descriptionFontSizeSp;
	const descriptionMarginTop = ! mediaSize
		? settings.descriptionMarginTop
		: settings.descriptionMarginTopSp;
	const titleNumOfChar = ! mediaSize
		? settings.titleNumOfChar
		: settings.titleNumOfCharSp;
	const descriptionNumOfChar = ! mediaSize
		? settings.descriptionNumOfChar
		: settings.descriptionNumOfCharSp;
	//プレビューのカード型リンクにホバーしている時true
	return (
		<a
			className={ classnames( cclClass ) }
			style={
				isHover && settings.hover !== 'none' ? hoverdStyles : styles
			}
			onMouseEnter={ () => {
				//マウスホバー開始
				setIsHover( true );
			} }
			onMouseLeave={ () => {
				//マウスホバー終了
				setIsHover( false );
			} }
		>
			<img
				className={ classnames( cclThumbnailClass ) }
				src={ thumbnail }
			/>
			<div
				className="ccl__info"
				style={ {
					marginLeft:
						layout == 'card'
							? '0'
							: gapBetweenTitleAndThumbnail + 'px',
					marginTop:
						layout == 'card'
							? gapBetweenTitleAndThumbnail + 'px'
							: '0',
				} }
			>
				<p
					className={
						layout == 'card'
							? 'ccl__title'
							: 'ccl__title ccl__title--list'
					}
					style={ {
						fontSize: titleFontSize + 'px',
					} }
				>
					{ TextPreview(
						'サンプルの記事カードです。',
						titleNumOfChar
					) }
				</p>
				<p
					className={
						layout == 'card'
							? 'ccl__description'
							: 'ccl__description ccl__description--list'
					}
					style={ {
						fontSize: descriptionFontSize + 'px',
						marginTop: descriptionMarginTop + 'px',
					} }
				>
					{ TextPreview(
						'サンプルの記事カードの説明です。',
						descriptionNumOfChar
					) }
				</p>
			</div>
		</a>
	);
};

const TextPreview = ( base, numOfChar ) => {
	let description = '';
	for ( let i = 0; i < numOfChar; i++ ) {
		const character = i % base.length;
		description += base.charAt( character );
	}
	return description;
};
