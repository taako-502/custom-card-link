import { __ } from '@wordpress/i18n';
import { styleDisplayNone } from './visibility.js';

import { RadioControl, RangeControl, ColorPicker } from '@wordpress/components';

export const Hover = ( settings, setSettings ) => {
	const React = require( 'react' );

	return (
		<React.Fragment>
			<h2 className="u-marign-bottom--0">
				{ __(
					'カスタムリンクカードをホバーした時のデザインや動作',
					'ccl-plugin'
				) }
			</h2>
			<p className="u-marign-top--4px">
				{ __(
					'PCサイズとスマホサイズで共通の設定です。',
					'ccl-plugin'
				) }
			</p>
			<div className="ccl-admin__container">
				<div className="ccl-admin__inputs">
					<RadioControl
						label={ __( 'ホバー時の動作', 'ccl-plugin' ) }
						help={ __(
							'リンクカードをホバーした際の動作',
							'ccl-plugin'
						) }
						selected={ settings.hoverUse }
						options={ [
							{
								label: __( 'なし', 'ccl-plugin' ),
								value: 'none',
							},
							{
								label: __( '影を表示する', 'ccl-plugin' ),
								value: 'shadow',
							},
						] }
						onChange={ ( value ) =>
							setSettings( { ...settings, hoverUse: value } )
						}
					/>
					<p
						className="u-display--inline-block u-marign-top--8px u-margin-bottom--0"
						style={ styleDisplayNone( settings.hoverUse ) }
					>
						{ __( '影の色', 'ccl-plugin' ) }
					</p>
					<ColorPicker
						color={ settings.hoverShadowColor }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								hoverShadowColor: value,
							} )
						}
						enableAlpha
						style={ styleDisplayNone( settings.hoverUse ) }
					/>
				</div>
				<div
					className="ccl-admin__inputs"
					style={ styleDisplayNone( settings.hoverUse ) }
				>
					<RangeControl
						label={ __( 'ホバー時の動作時間', 'ccl-plugin' ) }
						value={ settings.hoverTransitionTime }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								hoverTransitionTime: value,
							} )
						}
						min={ 0 }
						max={ 1 }
						step={ 0.1 }
					/>
					<RangeControl
						label={ __( 'ホバー時の高さ', 'ccl-plugin' ) }
						value={ settings.hoverTop }
						onChange={ ( value ) =>
							setSettings( { ...settings, hoverTop: value } )
						}
						min={ -20 }
						max={ 20 }
					/>
					<RangeControl
						label={ __( '影の長さ（x方向）', 'ccl-plugin' ) }
						value={ settings.hoverShadowOffsetX }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								hoverShadowOffsetX: value,
							} )
						}
						min={ -10 }
						max={ 10 }
					/>
					<RangeControl
						label={ __( '影の長さ（y方向）', 'ccl-plugin' ) }
						value={ settings.hoverShadowOffsetY }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								hoverShadowOffsetY: value,
							} )
						}
						min={ -10 }
						max={ 10 }
					/>
					<RangeControl
						label={ __( 'ぼかしの拡張・縮小', 'ccl-plugin' ) }
						value={ settings.hoverShadowBlurRadius }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								hoverShadowBlurRadius: value,
							} )
						}
						min={ 0 }
						max={ 10 }
					/>
					<RangeControl
						label={ __( '影の拡張・縮小', 'ccl-plugin' ) }
						value={ settings.hoverShadowSpreadRadius }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								hoverShadowSpreadRadius: value,
							} )
						}
						min={ 0 }
						max={ 10 }
					/>
				</div>
			</div>
		</React.Fragment>
	);
};
