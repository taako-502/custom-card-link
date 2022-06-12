/**
 * Custom Link Cardのプレビューのクラス
 * @param  {string} layout
 * @param  {string} hover
 * @param  {number} borderRadius
 * @param  {number} hoverTransitionTime
 * @return {Object}
 */
export const getSlcClass = ( settings ) => {
	return ({
		'clc': true,
		'clc--card': settings.layout === 'card',
		'clc--list': settings.layout === 'list',
		'clc--hover-shadow': settings.hover === 'shadow',
		'u-border-radius--1px': settings.borderRadius === 1,
		'u-border-radius--2px': settings.borderRadius === 2,
		'u-border-radius--3px': settings.borderRadius === 3,
		'u-border-radius--4px': settings.borderRadius === 4,
		'u-border-radius--5px': settings.borderRadius === 5,
		'u-border-radius--6px': settings.borderRadius === 6,
		'u-border-radius--7px': settings.borderRadius === 7,
		'u-border-radius--8px': settings.borderRadius === 8,
		'u-border-radius--9px': settings.borderRadius === 9,
		'u-border-radius--10px': settings.borderRadius === 10,
		'u-border-radius--11px': settings.borderRadius === 11,
		'u-border-radius--12px': settings.borderRadius === 12,
		'u-border-radius--13px': settings.borderRadius === 13,
		'u-border-radius--14px': settings.borderRadius === 14,
		'u-border-radius--15px': settings.borderRadius === 15,
		'u-transition--top-box-shadow--point-1s': settings.hoverTransitionTime === .1,
		'u-transition--top-box-shadow--point-2s': settings.hoverTransitionTime === .2,
		'u-transition--top-box-shadow--point-3s': settings.hoverTransitionTime === .3,
		'u-transition--top-box-shadow--point-4s': settings.hoverTransitionTime === .4,
		'u-transition--top-box-shadow--point-5s': settings.hoverTransitionTime === .5,
		'u-transition--top-box-shadow--point-6s': settings.hoverTransitionTime === .6,
		'u-transition--top-box-shadow--point-7s': settings.hoverTransitionTime === .7,
		'u-transition--top-box-shadow--point-8s': settings.hoverTransitionTime === .8,
		'u-transition--top-box-shadow--point-9s': settings.hoverTransitionTime === .9,
		'u-transition--top-box-shadow--1s': settings.hoverTransitionTime === 1,
	})
};
