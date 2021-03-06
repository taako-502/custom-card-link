import { Store } from 'react-notifications-component';

/**
 * react-notifications-componentのメッセージ設定
 *
 * @param {Object} model
 */
export const settingNotification = ( model ) => {
	const save = model.save();
	save.success( () => {
		Store.addNotification( {
			title: 'Success!',
			message: '入力内容を保存しました。',
			type: 'success',
			insert: 'top',
			container: 'top-center',
			animationIn: [ 'animate__animated', 'animate__fadeIn' ],
			animationOut: [ 'animate__animated', 'animate__fadeOut' ],
			dismiss: {
				duration: 5000,
				onScreen: true,
			},
		} );
	} );
	save.error( () => {
		Store.addNotification( {
			title: 'Error!',
			message: '入力内容を保存できませんでした。',
			type: 'danger',
			insert: 'top',
			container: 'top-center',
			animationIn: [ 'animate__animated', 'animate__fadeIn' ],
			animationOut: [ 'animate__animated', 'animate__fadeOut' ],
			dismiss: {
				duration: 5000,
				onScreen: true,
			},
		} );
	} );
};
