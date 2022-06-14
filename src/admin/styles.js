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
		boxShadow: settings.shadowUse === 'none'
		            ? 'none'
								: settings.shadowOffsetX + 'px ' + settings.shadowOffsetY + 'px ' + settings.shadowBlurRadius + 'px '
										+ settings.shadowSpreadRadius + 'px ' + settings.shadowColor,
		padding: settings.padding + 'px',
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
		padding: settings.padding + 'px',
	}
	return styles;
}
