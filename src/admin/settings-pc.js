import { styleDisplayNone } from './visibility.js';
import { Hover } from './settings-hover.js';

import { RadioControl, RangeControl, ColorPicker } from '@wordpress/components';

export const SettingsPc = ( settings, setSettings ) => {
	const React = require( 'react' );

	return (
		<React.Fragment>
			<h2>デザイン設定</h2>
			<div className="ccl-admin__container">
				<div className="ccl-admin__inputs">
					<RadioControl
						label="レイアウトデザイン"
						help="デザインのレイアウトを決めます。"
						selected={ settings.layout }
						options={ [
							{ label: 'カード型', value: 'card' },
							{ label: 'リスト型', value: 'list' },
						] }
						onChange={ ( value ) =>
							setSettings( { ...settings, layout: value } )
						}
					/>
					<RangeControl
						label="横幅"
						value={ settings.maxWidth }
						onChange={ ( value ) =>
							setSettings( { ...settings, maxWidth: value } )
						}
						min={ 200 }
						max={ 1200 }
					/>
					<RangeControl
						label="内側の余白"
						value={ settings.padding }
						onChange={ ( value ) =>
							setSettings( { ...settings, padding: value } )
						}
						min={ 0 }
						max={ 40 }
					/>
					<RangeControl
						label="角の丸さ（px）"
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
						label="タイトル文字サイズ"
						value={ settings.titleFontSize }
						onChange={ ( value ) =>
							setSettings( { ...settings, titleFontSize: value } )
						}
						min={ 10 }
						max={ 30 }
					/>
					<RangeControl
						label="説明文字サイズ"
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
						label="タイトルの最大文字数"
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
						label="説明の最大文字数"
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
						label="サムネイルとタイトルおよび説明の間の余白"
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
						label="タイトルと説明の間の余白"
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
			<h2>影</h2>
			<div className="ccl-admin__container">
				<div className="ccl-admin__inputs">
					<RadioControl
						label="影の有無"
						selected={ settings.shadowUse }
						options={ [
							{ label: 'なし', value: 'none' },
							{ label: 'あり', value: 'shadow' },
						] }
						onChange={ ( value ) =>
							setSettings( { ...settings, shadowUse: value } )
						}
					/>
					<p
						className="u-display--inline-block u-marign-top--8px u-margin-bottom--0"
						style={ styleDisplayNone( settings.shadowUse ) }
					>
						影の色
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
						label="影の長さ（x方向）"
						value={ settings.shadowOffsetX }
						onChange={ ( value ) =>
							setSettings( { ...settings, shadowOffsetX: value } )
						}
						min={ -10 }
						max={ 10 }
					/>
					<RangeControl
						label="影の長さ（y方向）"
						value={ settings.shadowOffsetY }
						onChange={ ( value ) =>
							setSettings( { ...settings, shadowOffsetY: value } )
						}
						min={ -10 }
						max={ 10 }
					/>
					<RangeControl
						label="ぼかしの拡張・縮小"
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
						label="影の拡張・縮小"
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
