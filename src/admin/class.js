/**
 * Custom Card Linkのプレビューのクラス
 *
 * @param {string} mediaSize
 * @param {Object} settings
 * @return {Object}
 */
export const getCclClass = ( mediaSize, settings ) => {
	const layout = ! mediaSize ? settings.layout : settings.layoutSp;
	const borderRadius = ! mediaSize
		? settings.borderRadius
		: settings.borderRadiusSp;

	return {
		ccl: true,
		'ccl--card': layout === 'card',
		'ccl--list': layout === 'list',
		'ccl--hover-shadow': settings.hoverUse === 'shadow',
		'u-border-radius--1px': borderRadius === 1,
		'u-border-radius--2px': borderRadius === 2,
		'u-border-radius--3px': borderRadius === 3,
		'u-border-radius--4px': borderRadius === 4,
		'u-border-radius--5px': borderRadius === 5,
		'u-border-radius--6px': borderRadius === 6,
		'u-border-radius--7px': borderRadius === 7,
		'u-border-radius--8px': borderRadius === 8,
		'u-border-radius--9px': borderRadius === 9,
		'u-border-radius--10px': borderRadius === 10,
		'u-border-radius--11px': borderRadius === 11,
		'u-border-radius--12px': borderRadius === 12,
		'u-border-radius--13px': borderRadius === 13,
		'u-border-radius--14px': borderRadius === 14,
		'u-border-radius--15px': borderRadius === 15,
		'u-transition--top-box-shadow--point-1s':
			settings.hoverTransitionTime === 0.1,
		'u-transition--top-box-shadow--point-2s':
			settings.hoverTransitionTime === 0.2,
		'u-transition--top-box-shadow--point-3s':
			settings.hoverTransitionTime === 0.3,
		'u-transition--top-box-shadow--point-4s':
			settings.hoverTransitionTime === 0.4,
		'u-transition--top-box-shadow--point-5s':
			settings.hoverTransitionTime === 0.5,
		'u-transition--top-box-shadow--point-6s':
			settings.hoverTransitionTime === 0.6,
		'u-transition--top-box-shadow--point-7s':
			settings.hoverTransitionTime === 0.7,
		'u-transition--top-box-shadow--point-8s':
			settings.hoverTransitionTime === 0.8,
		'u-transition--top-box-shadow--point-9s':
			settings.hoverTransitionTime === 0.9,
		'u-transition--top-box-shadow--1s': settings.hoverTransitionTime === 1,
	};
};

export const getSlcThumbnailClass = ( mediaSize, settings ) => {
	const layout = ! mediaSize ? settings.layout : settings.layoutSp;

	return {
		ccl__thumbnail: true,
		'ccl__thumbnail--card': ! mediaSize && layout === 'card',
		'ccl__thumbnail--list': ! mediaSize && layout === 'list',
		'ccl-sp__thumbnail--card': mediaSize && layout === 'card',
		'ccl-sp__thumbnail--list': mediaSize && layout === 'list',
	};
};
