import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

import Edit from './edit';
import metadata from './block.json';
import transforms from './transforms';

registerBlockType( metadata.name, {
	title: metadata.title,
	category: metadata.category,
	attributes: metadata.attributes,
	transforms,
	example: {
		attributes: {
			url: 'Custom Card Link',
		},
	},
	edit: Edit,
} );
