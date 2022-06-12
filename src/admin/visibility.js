/**
 * ホバーした時のアクション　
 * @param  {string} hover
 * @return {string}
 */
export const makeHoverShadowSettingStyles = ( settings ) => {
	const styles = {
		display: settings.hover === 'none' ? 'none' : 'block',
	}
	return styles;
}
