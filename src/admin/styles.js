/**
 * デザイン
 * @param  {number} shadowOffsetX
 * @param  {number} shadowOffsetY
 * @param  {number} shadowBlurRadius
 * @param  {number} shadowSpreadRadius
 * @param  {string} shadowColor
 * @return {string}
 */
export const makeStyles = ( settings ) => {
	const styles = {
		top: 0,
		boxShadow: settings.shadowOffsetX + 'px ' + settings.shadowOffsetY + 'px ' + settings.shadowBlurRadius + 'px '
								+ settings.shadowSpreadRadius + 'px ' + settings.shadowColor,
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
export const makeHoverdStyles = ( settings ) => {
	const styles = {
		top: -1 * settings.hoverTop,
		boxShadow: settings.hoverShadowOffsetX + 'px ' + settings.hoverShadowOffsetY + 'px ' + settings.hoverShadowBlurRadius + 'px '
								+ settings.hoverShadowSpreadRadius + 'px ' + settings.hoverShadowColor,
	}
	return styles;
}
