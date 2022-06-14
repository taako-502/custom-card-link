/**
 * 影の有無による可視性制御
 * @param  {string} hover
 * @return {string}
 */
export const styleDisplayNone = ( use ) => {
	const styles = {
		display: use === 'none' ? 'none' : 'block',
	}
	return styles;
}
