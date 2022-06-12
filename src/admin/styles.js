/**
 * デザイン
 * @param  {number} shadowOffsetX
 * @param  {number} shadowOffsetY
 * @param  {number} shadowBlurRadius
 * @param  {number} shadowSpreadRadius
 * @param  {string} shadowColor
 * @return {string}
 */
export const makeStyles = ( shadowOffsetX , shadowOffsetY , shadowBlurRadius , shadowSpreadRadius , shadowColor ) => {
	const styles = {
		top: 0,
		boxShadow: shadowOffsetX + 'px ' + shadowOffsetY + 'px ' + shadowBlurRadius + 'px ' + shadowSpreadRadius + 'px ' + shadowColor,
	}
	return styles;
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
export const makeHoverdStyles = ( hoverTop , hoverShadowOffsetX , hoverShadowOffsetY , hoverShadowBlurRadius , hoverShadowSpreadRadius , hoverShadowColor ) => {
	const styles = {
		top: -1 * hoverTop,
		boxShadow: hoverShadowOffsetX + 'px ' + hoverShadowOffsetY + 'px ' + hoverShadowBlurRadius + 'px ' + hoverShadowSpreadRadius + 'px ' + hoverShadowColor,
	}
	return styles;
}

/**
 * ホバーした時のアクション　
 * @param  {string} hover
 * @return {string}
 */
export const makeHoverShadowSettingStyles = ( setting ) => {
	const styles = {
		display: setting.hover === 'none' ? 'none' : 'block',
	}
	return styles;
}
