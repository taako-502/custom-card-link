import './admin.scss';
import thumbnail from './../asset/img/thumbnail.jpg'
import { render, useState } from '@wordpress/element';
import { RadioControl } from '@wordpress/components';

/**
 * 管理画面
 */
const Admin = () => {
	const [ elcClass, setElcClass ] = useState( 'elc ecl--card' );
	const [ layout, setLayout ]     = useState( 'card' );
	//全体的なデザインを構成するための
	const changeDesign = ( value ) => {
		switch ( value ) {
			case 'card':
				setElcClass('elc elc--card');
				break;
			case 'list':
				setElcClass('elc elc--list');
				break;
			default:
		}
	}
	return (
		<div className="elc-admin">
			<h1>外部リンクカードのデザインの設定画面です。</h1>
			<div className="elc-admin__wrap">
				<div className="elc-admin__settings elc-admin__col">
					<h2>セッティング</h2>
					<RadioControl
							label="レイアウトデザイン"
							help="デザインのレイアウトを決めます。"
							selected={ layout }
							options={ [
									{ label: 'カード型', value: 'card' },
									{ label: 'リスト型', value: 'list' },
							] }
							onChange={ ( value ) => {
								setLayout( value );
								changeDesign( value );
							} }
					/>
				</div>
				<div className="elc-admin__preview elc-admin__col">
					<h2>プレビュー</h2>
					<div className={ elcClass }>
						<a>
							<img className="elc__thumbnail" src={ thumbnail } />
							<p className="elc__title">サンプルの記事カードです。</p>
							<p className="elc__description">サンプルの記事カードの説明です。</p>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

render(
  <Admin />,
  document.getElementById('elc-admin')
);
