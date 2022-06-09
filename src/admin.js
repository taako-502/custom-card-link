import './admin.scss';
import { render } from '@wordpress/element';
import thumbnail from './../asset/img/thumbnail.jpg'

/**
 * 管理画面
 */
const Admin = () => {
	return (
		<div>
			<div></div>
			<div>
				<div class="elc">
					<a>
						<img class="elc--thumbnail" src={thumbnail} />
						<p class="elc--title">サンプルの記事カードです。</p>
						<p class="elc--description">サンプルの記事カードの説明です。</p>
					</a>
				</div>
			</div>
		</div>
	);
}

render(
  <Admin />,
  document.getElementById('elc-admin')
);
