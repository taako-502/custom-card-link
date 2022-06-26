import { styleDisplayNone } from './visibility.js';

import { RadioControl, RangeControl, ColorPicker } from '@wordpress/components';

export const Hover = ( settings, setSettings ) => {
	const React = require( 'react' );

	return (
		<React.Fragment>
			<h2 className="u-marign-bottom--0">
				カスタムリンクカードをホバーした時のデザインや動作
			</h2>
			<p className="u-marign-top--4px">
				PCサイズとスマホサイズで共通の設定です。
			</p>
			<div className="ccl-admin__container">
				<div className="ccl-admin__inputs">
					<RadioControl
						label="ホバー時の動作"
						help="リンクカードをホバーした際の動作"
						selected={ settings.hoverUse }
						options={ [
							{ label: 'なし', value: 'none' },
							{ label: '影を表示する', value: 'shadow' },
						] }
						onChange={ ( value ) =>
							setSettings( { ...settings, hoverUse: value } )
						}
					/>
					<label
						className="u-display--inline-block u-marign-top--8px"
						style={ styleDisplayNone( settings.hoverUse ) }
					>
						影の色
					</label>
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
						label="ホバー時の動作時間"
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
						label="ホバー時の高さ"
						value={ settings.hoverTop }
						onChange={ ( value ) =>
							setSettings( { ...settings, hoverTop: value } )
						}
						min={ -20 }
						max={ 20 }
					/>
					<RangeControl
						label="影の長さ（x方向）"
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
						label="影の長さ（y方向）"
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
						label="ぼかしの拡張・縮小"
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
						label="影の拡張・縮小"
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
