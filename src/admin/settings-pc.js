import { __ } from '@wordpress/i18n';
import { styleDisplayNone } from './visibility.js';
import { Hover } from './settings-hover.js';

import { RadioControl, RangeControl, ColorPicker } from '@wordpress/components';

export const SettingsPc = ( settings, setSettings ) => {
	const React = require( 'react' );

	return (
		<React.Fragment>
			<h2>{ __( 'デザイン設定', 'ccl-plugin' ) }</h2>
			<div className="ccl-admin__container">
				<div className="ccl-admin__inputs">
					<RadioControl
						label={ __( 'レイアウトデザイン', 'ccl-plugin' ) }
						help={ __(
							'デザインのレイアウトを決めます。',
							'ccl-plugin'
						) }
						selected={ settings.layout }
						options={ [
							{
								label: __( 'カード型', 'ccl-plugin' ),
								value: 'card',
							},
							{
								label: __( 'リスト型', 'ccl-plugin' ),
								value: 'list',
							},
						] }
						onChange={ ( value ) =>
							setSettings( { ...settings, layout: value } )
						}
					/>
					<RangeControl
						label={ __( '最大横幅', 'ccl-plugin' ) }
						value={ settings.maxWidth }
						onChange={ ( value ) =>
							setSettings( { ...settings, maxWidth: value } )
						}
						min={ 200 }
						max={ 1200 }
					/>
					<RangeControl
						label={ __( '内側の余白', 'ccl-plugin' ) }
						value={ settings.padding }
						onChange={ ( value ) =>
							setSettings( { ...settings, padding: value } )
						}
						min={ 0 }
						max={ 40 }
					/>
					<RangeControl
						label={ __( '角の丸さ（px）', 'ccl-plugin' ) }
						value={ settings.borderRadius }
						onChange={ ( value ) =>
							setSettings( { ...settings, borderRadius: value } )
						}
						min={ 0 }
						max={ 15 }
					/>
				</div>
				<div className="ccl-admin__inputs">
					<RangeControl
						label={ __( 'タイトル文字サイズ', 'ccl-plugin' ) }
						value={ settings.titleFontSize }
						onChange={ ( value ) =>
							setSettings( { ...settings, titleFontSize: value } )
						}
						min={ 10 }
						max={ 30 }
					/>
					<RangeControl
						label={ __( '説明文字サイズ', 'ccl-plugin' ) }
						value={ settings.descriptionFontSize }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								descriptionFontSize: value,
							} )
						}
						min={ 10 }
						max={ 30 }
					/>
					<RangeControl
						label={ __( 'タイトルの最大文字数', 'ccl-plugin' ) }
						value={ settings.titleNumOfChar }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								titleNumOfChar: value,
							} )
						}
						min={ 10 }
						max={ 60 }
					/>
					<RangeControl
						label={ __( '説明の最大文字数', 'ccl-plugin' ) }
						value={ settings.descriptionNumOfChar }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								descriptionNumOfChar: value,
							} )
						}
						min={ 0 }
						max={ 200 }
					/>
					<RangeControl
						label={ __(
							'サムネイルとタイトルおよび説明の間の余白',
							'ccl-plugin'
						) }
						value={ settings.gapBetweenTitleAndThumbnail }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								gapBetweenTitleAndThumbnail: value,
							} )
						}
						min={ 0 }
						max={ 30 }
					/>
					<RangeControl
						label={ __( 'タイトルと説明の間の余白', 'ccl-plugin' ) }
						value={ settings.descriptionMarginTop }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								descriptionMarginTop: value,
							} )
						}
						min={ 0 }
						max={ 30 }
					/>
				</div>
			</div>
			<h2>{ __( '影', 'ccl-plugin' ) }</h2>
			<div className="ccl-admin__container">
				<div className="ccl-admin__inputs">
					<RadioControl
						label={ __( '影の有無', 'ccl-plugin' ) }
						selected={ settings.shadowUse }
						options={ [
							{
								label: __( 'なし', 'ccl-plugin' ),
								value: 'none',
							},
							{
								label: __( 'あり', 'ccl-plugin' ),
								value: 'shadow',
							},
						] }
						onChange={ ( value ) =>
							setSettings( { ...settings, shadowUse: value } )
						}
					/>
					<p
						className="u-display--inline-block u-marign-top--8px u-margin-bottom--0"
						style={ styleDisplayNone( settings.shadowUse ) }
					>
						{ __( '影の色', 'ccl-plugin' ) }
					</p>
					<ColorPicker
						color={ settings.shadowColor }
						onChange={ ( value ) =>
							setSettings( { ...settings, shadowColor: value } )
						}
						enableAlpha
						style={ styleDisplayNone( settings.shadowUse ) }
					/>
				</div>
				<div
					className="ccl-admin__inputs"
					style={ styleDisplayNone( settings.shadowUse ) }
				>
					<RangeControl
						label={ __( '影の長さ（x方向）', 'ccl-plugin' ) }
						value={ settings.shadowOffsetX }
						onChange={ ( value ) =>
							setSettings( { ...settings, shadowOffsetX: value } )
						}
						min={ -10 }
						max={ 10 }
					/>
					<RangeControl
						label={ __( '影の長さ（y方向）', 'ccl-plugin' ) }
						value={ settings.shadowOffsetY }
						onChange={ ( value ) =>
							setSettings( { ...settings, shadowOffsetY: value } )
						}
						min={ -10 }
						max={ 10 }
					/>
					<RangeControl
						label={ __( 'ぼかしの拡張・縮小', 'ccl-plugin' ) }
						value={ settings.shadowBlurRadius }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								shadowBlurRadius: value,
							} )
						}
						min={ 0 }
						max={ 10 }
					/>
					<RangeControl
						label={ __( '影の拡張・縮小', 'ccl-plugin' ) }
						value={ settings.shadowSpreadRadius }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								shadowSpreadRadius: value,
							} )
						}
						min={ 0 }
						max={ 10 }
					/>
				</div>
			</div>
			{ Hover( settings, setSettings ) }
		</React.Fragment>
	);
};
