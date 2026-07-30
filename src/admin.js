import apiFetch from '@wordpress/api-fetch';
import { Notice, Spinner, ToggleControl } from '@wordpress/components';
import { createRoot, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import './admin.scss';

import { Buttons } from './admin/buttons.js';
import { setStandardDesignCard } from './admin/design.js';
import { Preview } from './admin/preview.js';
import { SettingsPc } from './admin/settings-pc.js';
import { SettingsSp } from './admin/settings-sp.js';

const getSettingsFromResponse = ( settings ) => {
	return {
		layout: settings.layout,
		maxWidth: settings.max_width,
		padding: settings.padding,
		borderRadius: settings.border_radius,
		titleFontSize: settings.title_font_size,
		descriptionFontSize: settings.description_font_size,
		titleNumOfChar: settings.title_num_of_char,
		descriptionNumOfChar: settings.description_num_of_char,
		gapBetweenTitleAndThumbnail: settings.gap_between_title_and_thumbnail,
		descriptionMarginTop: settings.description_margin_top,
		shadowUse: settings.shadow_use,
		shadowOffsetX: settings.shadow_offset_x,
		shadowOffsetY: settings.shadow_offset_y,
		shadowBlurRadius: settings.shadow_blur_radius,
		shadowSpreadRadius: settings.shadow_spread_radius,
		shadowColor: settings.shadow_color,
		breakpoint: settings.breakpoint,
		layoutSp: settings.layout_sp,
		maxWidthSp: settings.max_width_sp,
		paddingSp: settings.padding_sp,
		borderRadiusSp: settings.border_radius_sp,
		titleFontSizeSp: settings.title_font_size_sp,
		descriptionFontSizeSp: settings.description_font_size_sp,
		titleNumOfCharSp: settings.title_num_of_char_sp,
		descriptionNumOfCharSp: settings.description_num_of_char_sp,
		gapBetweenTitleAndThumbnailSp:
			settings.gap_between_title_and_thumbnail_sp,
		descriptionMarginTopSp: settings.description_margin_top_sp,
		shadowUseSp: settings.shadow_use_sp,
		shadowOffsetXSp: settings.shadow_offset_x_sp,
		shadowOffsetYSp: settings.shadow_offset_y_sp,
		shadowBlurRadiusSp: settings.shadow_blur_radius_sp,
		shadowSpreadRadiusSp: settings.shadow_spread_radius_sp,
		shadowColorSp: settings.shadow_color_sp,
		hoverUse: settings.hover_use,
		hoverTop: settings.hover_top,
		hoverTransitionTime: settings.hover_transition_time,
		hoverShadowOffsetX: settings.hover_shadow_offset_x,
		hoverShadowOffsetY: settings.hover_shadow_offset_y,
		hoverShadowBlurRadius: settings.hover_shadow_blur_radius,
		hoverShadowSpreadRadius: settings.hover_shadow_spread_radius,
		hoverShadowColor: settings.hover_shadow_color,
	};
};

const getSettingsForRequest = ( settings ) => {
	return {
		layout: settings.layout,
		max_width: settings.maxWidth,
		padding: settings.padding,
		border_radius: settings.borderRadius,
		title_font_size: settings.titleFontSize,
		description_font_size: settings.descriptionFontSize,
		title_num_of_char: settings.titleNumOfChar,
		description_num_of_char: settings.descriptionNumOfChar,
		gap_between_title_and_thumbnail: settings.gapBetweenTitleAndThumbnail,
		description_margin_top: settings.descriptionMarginTop,
		shadow_use: settings.shadowUse,
		shadow_offset_x: settings.shadowOffsetX,
		shadow_offset_y: settings.shadowOffsetY,
		shadow_blur_radius: settings.shadowBlurRadius,
		shadow_spread_radius: settings.shadowSpreadRadius,
		shadow_color: settings.shadowColor,
		breakpoint: settings.breakpoint,
		layout_sp: settings.layoutSp,
		max_width_sp: settings.maxWidthSp,
		padding_sp: settings.paddingSp,
		border_radius_sp: settings.borderRadiusSp,
		title_font_size_sp: settings.titleFontSizeSp,
		description_font_size_sp: settings.descriptionFontSizeSp,
		title_num_of_char_sp: settings.titleNumOfCharSp,
		description_num_of_char_sp: settings.descriptionNumOfCharSp,
		gap_between_title_and_thumbnail_sp:
			settings.gapBetweenTitleAndThumbnailSp,
		description_margin_top_sp: settings.descriptionMarginTopSp,
		shadow_use_sp: settings.shadowUseSp,
		shadow_offset_x_sp: settings.shadowOffsetXSp,
		shadow_offset_y_sp: settings.shadowOffsetYSp,
		shadow_blur_radius_sp: settings.shadowBlurRadiusSp,
		shadow_spread_radius_sp: settings.shadowSpreadRadiusSp,
		shadow_color_sp: settings.shadowColorSp,
		hover_use: settings.hoverUse,
		hover_top: settings.hoverTop,
		hover_transition_time: settings.hoverTransitionTime,
		hover_shadow_offset_x: settings.hoverShadowOffsetX,
		hover_shadow_offset_y: settings.hoverShadowOffsetY,
		hover_shadow_blur_radius: settings.hoverShadowBlurRadius,
		hover_shadow_spread_radius: settings.hoverShadowSpreadRadius,
		hover_shadow_color: settings.hoverShadowColor,
	};
};

const getErrorMessage = ( error, fallback ) => {
	if (
		error &&
		typeof error.message === 'string' &&
		error.message.trim() !== ''
	) {
		return error.message;
	}

	return fallback;
};

/**
 * 管理画面
 */
const Admin = () => {
	const React = require( 'react' );
	const [ settings, setSettings ] = useState( {} );
	const [ isHover, setIsHover ] = useState( false );
	const [ mediaSize, setmediaSize ] = useState( false );
	const [ isLoading, setIsLoading ] = useState( true );
	const [ isSaving, setIsSaving ] = useState( false );
	const [ notice, setNotice ] = useState( null );

	useEffect( () => {
		let isMounted = true;

		apiFetch( {
			path: '/wp/v2/settings',
		} )
			.then( ( response ) => {
				if ( ! isMounted ) {
					return;
				}

				if (
					response.custom_card_link_settings === undefined ||
					response.custom_card_link_settings === null
				) {
					setStandardDesignCard( setSettings );
				} else {
					setSettings(
						getSettingsFromResponse(
							response.custom_card_link_settings
						)
					);
				}
			} )
			.catch( ( error ) => {
				if ( ! isMounted ) {
					return;
				}

				setStandardDesignCard( setSettings );
				setNotice( {
					status: 'error',
					message: getErrorMessage(
						error,
						__( 'Failed to load settings.', 'ccl-plugin' )
					),
				} );
			} )
			.finally( () => {
				if ( isMounted ) {
					setIsLoading( false );
				}
			} );

		return () => {
			isMounted = false;
		};
	}, [] );

	const dataSave = async () => {
		if ( isSaving ) {
			return;
		}

		setIsSaving( true );
		setNotice( null );

		try {
			await apiFetch( {
				path: '/wp/v2/settings',
				method: 'POST',
				data: {
					custom_card_link_settings:
						getSettingsForRequest( settings ),
				},
			} );
			setNotice( {
				status: 'success',
				message: __( 'Settings saved.', 'ccl-plugin' ),
			} );
		} catch ( error ) {
			setNotice( {
				status: 'error',
				message: getErrorMessage(
					error,
					__( 'Failed to save settings.', 'ccl-plugin' )
				),
			} );
		} finally {
			setIsSaving( false );
		}
	};

	if ( isLoading ) {
		return (
			<div className="ccl-admin" aria-busy="true">
				<h1>{ __( 'Design settings', 'ccl-plugin' ) }</h1>
				<Spinner />
			</div>
		);
	}

	return (
		<React.Fragment>
			<div className="ccl-admin">
				<h1>{ __( 'Design settings', 'ccl-plugin' ) }</h1>
				{ notice && (
					<Notice
						status={ notice.status }
						onRemove={ () => setNotice( null ) }
					>
						{ notice.message }
					</Notice>
				) }
				<div className="ccl-admin__wrap">
					<div className="ccl-admin__preview">
						<div className="ccl-admin__info">
							<h2>{ __( 'Preview', 'ccl-plugin' ) }</h2>
							<ToggleControl
								label={
									! mediaSize
										? __( 'Computer', 'ccl-plugin' )
										: __( 'Smartphone', 'ccl-plugin' )
								}
								help={ __(
									'Setting up a smartphone',
									'ccl-plugin'
								) }
								checked={ mediaSize }
								onChange={ () => {
									setmediaSize( ( state ) => ! state );
								} }
							/>
						</div>
						<div className="ccl-admin__preview-wrap">
							{ Preview(
								mediaSize,
								settings,
								isHover,
								setIsHover
							) }
						</div>
					</div>
					<div className="ccl-admin__buttons">
						<Buttons
							dataSave={ dataSave }
							isSaving={ isSaving }
							settings={ settings }
							setSettings={ setSettings }
						/>
					</div>
					<div className="ccl-admin__settings">
						{ mediaSize
							? SettingsSp( settings, setSettings )
							: SettingsPc( settings, setSettings ) }
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

const root = createRoot( document.getElementById( 'ccl-admin' ) );
root.render( <Admin /> );
