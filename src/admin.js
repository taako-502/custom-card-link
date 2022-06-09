import './admin.scss';
import thumbnail from './../asset/img/thumbnail.jpg'
import { render, useState } from '@wordpress/element';
import { RadioControl } from '@wordpress/components';

/**
 * 管理画面
 */
const Admin = () => {
	const [ option, setOption ] = useState( 'a' );
	return (
		<div className="elc-admin">
			<h1>外部リンクカードのデザインの設定画面です。</h1>
			<div className="elc-admin__wrap">
				<div className="elc-admin__settings elc-admin__col">
					<h2>セッティング</h2>
					<RadioControl
							label="User type"
							help="The type of the current user"
							selected={ option }
							options={ [
									{ label: 'Author', value: 'a' },
									{ label: 'Editor', value: 'e' },
							] }
							onChange={ ( value ) => setOption( value ) }
					/>
				</div>
				<div className="elc-admin__preview elc-admin__col">
					<h2>プレビュー</h2>
					<div className="elc">
						<a>
							<img className="elc--thumbnail" src={thumbnail} />
							<p className="elc--title">サンプルの記事カードです。</p>
							<p className="elc--description">サンプルの記事カードの説明です。</p>
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
