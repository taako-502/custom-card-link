import './admin.scss';
import thumbnail from './../asset/img/thumbnail.jpg'
import { render, useState, useEffect } from '@wordpress/element';
import { RadioControl, Button } from '@wordpress/components';
import api from '@wordpress/api';

import { Store } from 'react-notifications-component';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';


/**
 * 管理画面
 */
const Admin = () => {
	const [ layout, setLayout ]     = useState( 'card' );
	useEffect( () => {
		api.loadPromise.then( () => {
			// Modelの生成
			const model = new api.models.Settings();
			// 設定値の取得
			model.fetch().then( response => {
				setLayout( response.external_link_card_settings.layout );
			});
		});
	}, []);
	//データを保存する処理
	const dataSave = () => {
		api.loadPromise.then( () => {
			const model = new api.models.Settings({
				'external_link_card_settings' : {
					'layout': layout,
				}
			});

			const save = model.save();

			save.success( ( response, status ) => {
				Store.addNotification({
					title: "Success!",
					message: "入力内容を保存しました。",
					type: "success",
					insert: "top",
					container: "top-center",
					animationIn: ["animate__animated", "animate__fadeIn"],
					animationOut: ["animate__animated", "animate__fadeOut"],
					dismiss: {
						duration: 5000,
						onScreen: true
					}
				});
			});

			save.error( ( response, status ) => {
				Store.addNotification({
					title: "Error!",
					message: "入力内容を保存できませんでした。",
					type: "danger",
					insert: "top",
					container: "top-center",
					animationIn: ["animate__animated", "animate__fadeIn"],
					animationOut: ["animate__animated", "animate__fadeOut"],
					dismiss: {
						duration: 5000,
						onScreen: true
					}
				});
			});
		});
	};

	return (
		<React.Fragment>
			<ReactNotifications />
			<div className="elc-admin">
				<h1>外部リンクカードのデザインの設定画面</h1>
				<div className="elc-admin__wrap">
					<div className="elc-admin__preview">
					<h2>プレビュー</h2>
					<a className={ layout == 'card' ? 'elc elc--card' : 'elc elc--list' } >
						<img
							className={ layout == 'card' ? 'elc__thumbnail' : 'elc__thumbnail elc__thumbnail--list' }
							src={ thumbnail }
						/>
						<div className='elc__info'>
							<p
								className={ layout == 'card' ? 'elc__title' : 'elc__title elc__title--list' }
							>
								サンプルの記事カードです。
							</p>
							<p
								className={ layout == 'card' ? 'elc__description' : 'elc__description elc__description--list' }
							>
								サンプルの記事カードの説明です。サンプルの記事カードの説明です。サンプルの記事カードの説明です。サンプルの記事カードの説明です。サンプルの記事カードの説明です。この文字の長さはちょうど100文字です。
							</p>
						</div>
					</a>
				</div>
				<Button
				isPrimary
				onClick={ dataSave }
				>
					保存
				</Button>
				<div className="elc-admin__settings">
						<h2>セッティング</h2>
						<RadioControl
								label="レイアウトデザイン"
								help="デザインのレイアウトを決めます。"
								selected={ layout }
								options={ [
										{ label: 'カード型', value: 'card' },
										{ label: 'リスト型', value: 'list' },
								] }
								onChange={ ( value ) => setLayout( value ) }
						/>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

render(
  <Admin />,
  document.getElementById('elc-admin')
);
