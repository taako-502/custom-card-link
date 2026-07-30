import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import apiFetch from '@wordpress/api-fetch';

import { Admin } from './admin.js';

jest.mock( '@wordpress/api-fetch', () => ( {
	__esModule: true,
	default: jest.fn(),
} ) );

jest.mock( '@wordpress/i18n', () => ( {
	__: ( message ) => message,
} ) );

jest.mock( '@wordpress/element', () => {
	const react = require( 'react' );
	const reactDom = require( 'react-dom/client' );

	return {
		createRoot: reactDom.createRoot,
		useCallback: react.useCallback,
		useEffect: react.useEffect,
		useRef: react.useRef,
		useState: react.useState,
	};
} );

jest.mock( '@wordpress/components', () => {
	const react = require( 'react' );

	return {
		Button: ( { children, disabled, isBusy, onClick } ) =>
			react.createElement(
				'button',
				{
					'aria-busy': isBusy ? 'true' : undefined,
					disabled,
					onClick,
					type: 'button',
				},
				children
			),
		Notice: ( { children, status } ) =>
			react.createElement(
				'div',
				{ 'data-status': status, role: 'alert' },
				children
			),
		Spinner: () => react.createElement( 'div', { role: 'progressbar' } ),
		ToggleControl: ( { checked, label, onChange } ) =>
			react.createElement(
				'label',
				null,
				label,
				react.createElement( 'input', {
					checked,
					onChange,
					type: 'checkbox',
				} )
			),
	};
} );

jest.mock( './admin/preview.js', () => {
	const react = require( 'react' );

	return {
		Preview: ( mediaSize, settings ) =>
			react.createElement(
				'div',
				{ 'data-testid': 'preview' },
				`${ mediaSize ? 'mobile' : 'desktop' }:${ settings.layout }`
			),
	};
} );

jest.mock( './admin/settings-pc.js', () => {
	const react = require( 'react' );

	return {
		SettingsPc: ( settings ) =>
			react.createElement(
				'div',
				{ 'data-testid': 'settings-form' },
				`${ settings.layout }:${ settings.maxWidth }`
			),
	};
} );

jest.mock( './admin/settings-sp.js', () => {
	const react = require( 'react' );

	return {
		SettingsSp: ( settings ) =>
			react.createElement(
				'div',
				{ 'data-testid': 'settings-form' },
				`${ settings.layoutSp }:${ settings.maxWidthSp }`
			),
	};
} );

const savedSettings = {
	layout: 'list',
	max_width: 700,
	padding: 12,
	border_radius: 8,
	title_font_size: 19,
	description_font_size: 15,
	title_num_of_char: 38,
	description_num_of_char: 120,
	gap_between_title_and_thumbnail: 12,
	description_margin_top: 6,
	shadow_use: 'none',
	shadow_offset_x: 2,
	shadow_offset_y: 3,
	shadow_blur_radius: 3,
	shadow_spread_radius: 3,
	shadow_color: '#0000001a',
	breakpoint: 640,
	layout_sp: 'card',
	max_width_sp: 500,
	padding_sp: 28,
	border_radius_sp: 6,
	title_font_size_sp: 22,
	description_font_size_sp: 14,
	title_num_of_char_sp: 38,
	description_num_of_char_sp: 120,
	gap_between_title_and_thumbnail_sp: 6,
	description_margin_top_sp: 6,
	shadow_use_sp: 'none',
	shadow_offset_x_sp: 2,
	shadow_offset_y_sp: 3,
	shadow_blur_radius_sp: 3,
	shadow_spread_radius_sp: 3,
	shadow_color_sp: '#0000001a',
	hover_use: 'shadow',
	hover_top: 5,
	hover_transition_time: 0.3,
	hover_shadow_offset_x: 0,
	hover_shadow_offset_y: 2,
	hover_shadow_blur_radius: 3,
	hover_shadow_spread_radius: 3,
	hover_shadow_color: '#0000001a',
};

const getResponse = {
	custom_card_link_settings: savedSettings,
};

const findButton = ( container, label ) =>
	Array.from( container.querySelectorAll( 'button' ) ).find(
		( button ) => button.textContent === label
	);

const click = async ( element ) => {
	await act( async () => {
		element.dispatchEvent(
			new window.MouseEvent( 'click', {
				bubbles: true,
			} )
		);
		await Promise.resolve();
	} );
};

const createDeferred = () => {
	let resolve;
	const promise = new Promise( ( promiseResolve ) => {
		resolve = promiseResolve;
	} );

	return { promise, resolve };
};

describe( 'Admin settings loading', () => {
	let container;
	let root;

	beforeEach( () => {
		globalThis.IS_REACT_ACT_ENVIRONMENT = true;
		container = document.createElement( 'div' );
		document.body.appendChild( container );
		apiFetch.mockReset();
	} );

	afterEach( async () => {
		await act( async () => {
			root?.unmount();
		} );
		container.remove();
	} );

	const renderAdmin = async () => {
		root = createRoot( container );

		await act( async () => {
			root.render( React.createElement( Admin ) );
			await Promise.resolve();
			await Promise.resolve();
		} );
	};

	test( 'GET失敗時はデフォルト設定の編集フォームを表示しない', async () => {
		apiFetch.mockRejectedValueOnce( new Error( '取得に失敗しました' ) );

		await renderAdmin();

		expect(
			container.querySelector( '[data-testid="settings-form"]' )
		).toBeNull();
		expect( container.querySelector( '[role="alert"]' ).textContent ).toBe(
			'取得に失敗しました'
		);
		expect( findButton( container, 'Retry' ) ).toBeDefined();
	} );

	test( 'GET失敗後はPOSTを実行できない', async () => {
		apiFetch.mockRejectedValueOnce( new Error( '取得に失敗しました' ) );

		await renderAdmin();

		expect( findButton( container, 'Save' ) ).toBeUndefined();
		expect(
			apiFetch.mock.calls.some(
				( [ options ] ) => options.method === 'POST'
			)
		).toBe( false );
	} );

	test( '再試行したGETが成功すると既存設定を表示する', async () => {
		const retryRequest = createDeferred();
		apiFetch
			.mockRejectedValueOnce( new Error( '取得に失敗しました' ) )
			.mockImplementationOnce( () => retryRequest.promise );

		await renderAdmin();

		const retryButton = findButton( container, 'Retry' );
		await act( async () => {
			retryButton.dispatchEvent(
				new window.MouseEvent( 'click', { bubbles: true } )
			);
			retryButton.dispatchEvent(
				new window.MouseEvent( 'click', { bubbles: true } )
			);
			await Promise.resolve();
		} );

		expect( apiFetch ).toHaveBeenCalledTimes( 2 );
		expect(
			container.querySelector( '[role="progressbar"]' )
		).not.toBeNull();

		await act( async () => {
			retryRequest.resolve( getResponse );
			await retryRequest.promise;
		} );

		expect(
			container.querySelector( '[data-testid="settings-form"]' )
				.textContent
		).toBe( 'list:700' );
		expect( findButton( container, 'Save' ) ).toBeDefined();
	} );

	test( 'GET成功時に設定がnullならデフォルト設定を表示する', async () => {
		apiFetch.mockResolvedValueOnce( {
			custom_card_link_settings: null,
		} );

		await renderAdmin();

		expect(
			container.querySelector( '[data-testid="settings-form"]' )
				.textContent
		).toBe( 'card:500' );
		expect( findButton( container, 'Save' ) ).toBeDefined();
	} );

	test( '正常取得後は設定をPOSTして保存できる', async () => {
		apiFetch
			.mockResolvedValueOnce( getResponse )
			.mockResolvedValueOnce( getResponse );

		await renderAdmin();
		await click( findButton( container, 'Save' ) );

		expect( apiFetch ).toHaveBeenNthCalledWith( 2, {
			path: '/wp/v2/settings',
			method: 'POST',
			data: {
				custom_card_link_settings: savedSettings,
			},
		} );
		expect( container.querySelector( '[role="alert"]' ).textContent ).toBe(
			'Settings saved.'
		);
	} );
} );
