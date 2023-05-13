import { __ } from '@wordpress/i18n';
import { styleDisplayNone } from './visibility.js';
import { RadioControl, RangeControl, ColorPicker } from '@wordpress/components';

export const SettingsSp = ( settings, setSettings ) => {
	const React = require( 'react' );

	return (
		<React.Fragment>
			<h2>{ __( 'レスポンシブ設定', 'ccl-plugin' ) }</h2>
			<div className="ccl-admin__inputs">
				<RangeControl
					label={ __( 'ブレークポイント（px）', 'ccl-plugin' ) }
					value={ settings.breakpoint }
					onChange={ ( value ) =>
						setSettings( { ...settings, breakpoint: value } )
					}
					min={ 200 }
					max={ 1200 }
				/>
			</div>
			<h2>{ __( 'デザイン設定（スマホサイズ）', 'ccl-plugin' ) }</h2>
			<div className="ccl-admin__container">
				<div className="ccl-admin__inputs">
					<RadioControl
						label={ __( 'レイアウトデザイン', 'ccl-plugin' ) }
						help={ __(
							'デザインのレイアウトを決めます。',
							'ccl-plugin'
						) }
						selected={ settings.layoutSp }
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
							setSettings( { ...settings, layoutSp: value } )
						}
					/>
					<RangeControl
						label={ __( '最大横幅', 'ccl-plugin' ) }
						value={ settings.maxWidthSp }
						onChange={ ( value ) =>
							setSettings( { ...settings, maxWidthSp: value } )
						}
						min={ 200 }
						max={ 1200 }
					/>
					<RangeControl
						label={ __( '内側の余白', 'ccl-plugin' ) }
						value={ settings.paddingSp }
						onChange={ ( value ) =>
							setSettings( { ...settings, paddingSp: value } )
						}
						min={ 0 }
						max={ 40 }
					/>
					<RangeControl
						label={ __( '角の丸さ（px）', 'ccl-plugin' ) }
						value={ settings.borderRadiusSp }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								borderRadiusSp: value,
							} )
						}
						min={ 0 }
						max={ 15 }
					/>
				</div>
				<div className="ccl-admin__inputs">
					<RangeControl
						label={ __( 'タイトル文字サイズ', 'ccl-plugin' ) }
						value={ settings.titleFontSizeSp }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								titleFontSizeSp: value,
							} )
						}
						min={ 10 }
						max={ 30 }
					/>
					<RangeControl
						label={ __( '説明文字サイズ', 'ccl-plugin' ) }
						value={ settings.descriptionFontSizeSp }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								descriptionFontSizeSp: value,
							} )
						}
						min={ 10 }
						max={ 30 }
					/>
					<RangeControl
						label={ __( 'タイトルの最大文字数', 'ccl-plugin' ) }
						value={ settings.titleNumOfCharSp }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								titleNumOfCharSp: value,
							} )
						}
						min={ 10 }
						max={ 60 }
					/>
					<RangeControl
						label={ __( '説明の最大文字数', 'ccl-plugin' ) }
						value={ settings.descriptionNumOfCharSp }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								descriptionNumOfCharSp: value,
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
						value={ settings.gapBetweenTitleAndThumbnailSp }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								gapBetweenTitleAndThumbnailSp: value,
							} )
						}
						min={ 0 }
						max={ 30 }
					/>
					<RangeControl
						label={ __( 'タイトルと説明の間の余白', 'ccl-plugin' ) }
						value={ settings.descriptionMarginTopSp }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								descriptionMarginTopSp: value,
							} )
						}
						min={ 0 }
						max={ 30 }
					/>
				</div>
			</div>
			<h2>{ __( '影（スマホサイズ）', 'ccl-plugin' ) }</h2>
			<div className="ccl-admin__container">
				<div className="ccl-admin__inputs">
					<RadioControl
						label={ __( '影の有無', 'ccl-plugin' ) }
						selected={ settings.shadowUseSp }
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
							setSettings( { ...settings, shadowUseSp: value } )
						}
					/>
					<p
						className="u-display--inline-block u-marign-top--8px u-margin-bottom--0"
						style={ styleDisplayNone( settings.shadowUseSp ) }
					>
						{ __( '影の色', 'ccl-plugin' ) }
					</p>
					<ColorPicker
						color={ settings.shadowColorSp }
						onChange={ ( value ) =>
							setSettings( { ...settings, shadowColorSp: value } )
						}
						enableAlpha
						style={ styleDisplayNone( settings.shadowUseSp ) }
					/>
				</div>
				<div
					className="ccl-admin__inputs"
					style={ styleDisplayNone( settings.shadowUseSp ) }
				>
					<RangeControl
						label={ __( '影の長さ（x方向）', 'ccl-plugin' ) }
						value={ settings.shadowOffsetXSp }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								shadowOffsetXSp: value,
							} )
						}
						min={ -10 }
						max={ 10 }
					/>
					<RangeControl
						label={ __( '影の長さ（y方向）', 'ccl-plugin' ) }
						value={ settings.shadowOffsetYSp }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								shadowOffsetYSp: value,
							} )
						}
						min={ -10 }
						max={ 10 }
					/>
					<RangeControl
						label={ __( 'ぼかしの拡張・縮小', 'ccl-plugin' ) }
						value={ settings.shadowBlurRadiusSp }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								shadowBlurRadiusSp: value,
							} )
						}
						min={ 0 }
						max={ 10 }
					/>
					<RangeControl
						label={ __( '影の拡張・縮小', 'ccl-plugin' ) }
						value={ settings.shadowSpreadRadiusSp }
						onChange={ ( value ) =>
							setSettings( {
								...settings,
								shadowSpreadRadiusSp: value,
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
