import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

import Edit from './edit';
import metadata from './block.json';

registerBlockType( metadata.name, {
	title: metadata.title,
	attributes: metadata.attributes,
	example: {
		attributes: {
			url: 'custom Link Card',
		},
	},
	edit: Edit,
} );
