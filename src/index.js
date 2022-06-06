import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	example: {
		attributes: {
			url: 'External Link Card',
		},
	},
	edit: Edit,
	save,
} );
