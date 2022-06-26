import { styleDisplayNone } from './visibility.js';
import { Hover } from './settings-hover.js';

import { RadioControl, RangeControl, ColorPicker } from '@wordpress/components';

export const SettingsSp = ( settings, setSettings ) => {
	return (
		<React.Fragment>
			<h2>レスポンシブ設定</h2>
			<div className="ccl-admin__inputs">
				<RangeControl
					label="ブレークポイント（px）"
					value={ settings.breakpoint }
					onChange={ ( value ) =>
						setSettings( { ...settings, breakpoint: value } )
					}
					min={ 200 }
					max={ 1200 }
				/>
			</div>
			<h2>デザイン設定（スマホサイズ）</h2>
			<div className="ccl-admin__container">
				<div className="ccl-admin__inputs">
					<RadioControl
						label="レイアウトデザイン"
						help="デザインのレイアウトを決めます。"
						selected={ settings.layoutSp }
						options={ [
							{ label: 'カード型', value: 'card' },
							{ label: 'リスト型', value: 'list' },
						] }
						onChange={ ( value ) =>
							setSettings( { ...settings, layoutSp: value } )
						}
					/>
					<RangeControl
						label="最大横幅"
						value={ settings.maxWidthSp }
						onChange={ ( value ) =>
							setSettings( { ...settings, maxWidthSp: value } )
						}
						min={ 200 }
						max={ 1200 }
					/>
					<RangeControl
						label="内側の余白"
						value={ settings.paddingSp }
						onChange={ ( value ) =>
							setSettings( { ...settings, paddingSp: value } )
						}
						min={ 0 }
						max={ 40 }
					/>
					<RangeControl
						label="角の丸さ（px）"
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
						label="タイトル文字サイズ"
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
						label="説明文字サイズ"
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
						label="タイトルの最大文字数"
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
						label="説明の最大文字数"
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
						label="サムネイルとタイトルおよび説明の間の余白"
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
						label="タイトルと説明の間の余白"
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
			<h2>影（スマホサイズ）</h2>
			<div className="ccl-admin__container">
				<div className="ccl-admin__inputs">
					<RadioControl
						label="影の有無"
						selected={ settings.shadowUseSp }
						options={ [
							{ label: 'なし', value: 'none' },
							{ label: 'あり', value: 'shadow' },
						] }
						onChange={ ( value ) =>
							setSettings( { ...settings, shadowUseSp: value } )
						}
					/>
					<label
						className="u-display--inline-block u-marign-top--8px"
						style={ styleDisplayNone( settings.shadowUseSp ) }
					>
						影の色
					</label>
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
						label="影の長さ（x方向）"
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
						label="影の長さ（y方向）"
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
						label="ぼかしの拡張・縮小"
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
						label="影の拡張・縮小"
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
