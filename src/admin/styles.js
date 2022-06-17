/**
 * デザイン
 * @param  {number} shadowOffsetX
 * @param  {number} shadowOffsetY
 * @param  {number} shadowBlurRadius
 * @param  {number} shadowSpreadRadius
 * @param  {string} shadowColor
 * @return {string}
 */
export const makeStyles = ( mediaSize , settings ) => {
	let styles = { top: 0 }
	if ( ! mediaSize ) {
		styles = {
			...styles,
			boxShadow: settings.shadowUse === 'none'
				? 'none'
				: settings.shadowOffsetX + 'px ' + settings.shadowOffsetY + 'px ' + settings.shadowBlurRadius + 'px '
					+ settings.shadowSpreadRadius + 'px ' + settings.shadowColor,
		}
	} else {
		styles = {
			...styles,
			boxShadow: settings.shadowUseSp === 'none'
				? 'none'
				: settings.shadowOffsetXSp + 'px ' + settings.shadowOffsetYSp + 'px ' + settings.shadowBlurRadiusSp + 'px '
					+ settings.shadowSpreadRadiusSp + 'px ' + settings.shadowColorSp,
		}
	}
	return sharedStyle( mediaSize , settings , styles );
}

/**
 * ホバー時のデザイン
 * @param  {number} hoverTop
 * @param  {number} hoverShadowOffsetX
 * @param  {number} hoverShadowOffsetY
 * @param  {number} hoverShadowBlurRadius
 * @param  {number} hoverShadowSpreadRadius
 * @param  {string} hoverShadowColor
 * @return {string}
 */
export const makeHoverdStyles = ( mediaSize , settings ) => {
	let styles = {
		top: -1 * settings.hoverTop,
		boxShadow: settings.hoverShadowOffsetX + 'px ' + settings.hoverShadowOffsetY + 'px ' + settings.hoverShadowBlurRadius + 'px '
			+ settings.hoverShadowSpreadRadius + 'px ' + settings.hoverShadowColor,
	}
	return sharedStyle( mediaSize , settings , styles );
}

const sharedStyle = ( mediaSize , settings , styles ) => {
	if ( ! mediaSize ) {
		styles = {
			...styles,
			padding: settings.padding + 'px',
			maxWidth: settings.maxWidth + 'px',
		}
	} else {
		styles = {
			...styles,
			padding: settings.paddingSp + 'px',
			maxWidth: settings.maxWidthSp + 'px',
		}
	}
	return styles;
}
