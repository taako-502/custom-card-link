/**
 * 影の有無による可視性制御
 *
 * @param  {string} use
 * @return {Object} スタイルシート
 */
export const styleDisplayNone = ( use ) => {
	const styles = {
		display: use === 'none' ? 'none' : 'block',
	};
	return styles;
};
