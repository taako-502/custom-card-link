import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

import Edit from './edit';
import metadata from './block.json';

registerBlockType( metadata.name, {
	title: metadata.title,
	category: metadata.category,
	attributes: metadata.attributes,
	example: {
		attributes: {
			url: 'Custom Card Link',
		},
	},
	edit: Edit,
} );
