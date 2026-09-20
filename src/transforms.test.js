import {
	createBlock,
	getPossibleBlockTransformations,
	parse,
	registerBlockType,
	serialize,
	switchToBlockType,
	unregisterBlockType,
} from '@wordpress/blocks';
import metadata from './block.json';
import './index';

jest.mock( './edit', () => () => null );

beforeAll( () => {
	registerBlockType( 'core/embed', {
		apiVersion: 3,
		title: 'Embed',
		category: 'embed',
		attributes: {
			url: { type: 'string' },
			caption: { type: 'string', default: '' },
			providerNameSlug: { type: 'string' },
		},
		save: () => null,
	} );
	registerBlockType( 'core/paragraph', {
		apiVersion: 3,
		title: 'Paragraph',
		category: 'text',
		attributes: { content: { type: 'string' } },
		save: () => null,
	} );
} );

afterAll( () => {
	unregisterBlockType( 'core/embed' );
	unregisterBlockType( 'core/paragraph' );
	unregisterBlockType( metadata.name );
} );

const canTransform = ( block ) =>
	getPossibleBlockTransformations( [ block ] ).some(
		( { name } ) => name === metadata.name
	);

test.each( [ undefined, '', '   ' ] )(
	'URL未入力の埋め込みには変換候補を表示しない: %p',
	( url ) => {
		expect( canTransform( createBlock( 'core/embed', { url } ) ) ).toBe(
			false
		);
	}
);

test.each( [
	[ 'https://example.com/article?a=1&b=2#section', undefined ],
	[ 'https://www.youtube.com/watch?v=example', 'youtube' ],
] )( '埋め込みのURLを保持して変換・保存する: %s', ( url, providerNameSlug ) => {
	const embed = createBlock( 'core/embed', { url, providerNameSlug } );
	expect( canTransform( embed ) ).toBe( true );

	const result = switchToBlockType( embed, metadata.name );
	expect( result ).toHaveLength( 1 );
	expect( result[ 0 ].name ).toBe( metadata.name );
	expect( result[ 0 ].attributes.url ).toBe( url );
	expect( parse( serialize( result ) )[ 0 ].attributes.url ).toBe( url );
} );

test( 'キャプションの書式とリンクをカード直後の段落に保持する', () => {
	const caption =
		'<strong>説明</strong> <a href="https://example.com">出典</a>';
	const embed = createBlock( 'core/embed', {
		url: 'https://example.com/article',
		caption,
	} );
	const result = switchToBlockType( embed, metadata.name );

	expect( result ).toHaveLength( 2 );
	expect( result[ 0 ].name ).toBe( metadata.name );
	expect( result[ 1 ].name ).toBe( 'core/paragraph' );
	expect( result[ 1 ].attributes.content ).toBe( caption );
} );
