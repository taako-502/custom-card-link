import { createBlock } from '@wordpress/blocks';
import metadata from './block.json';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/embed' ],
			isMatch: ( { url } ) =>
				typeof url === 'string' && url.trim().length > 0,
			transform: ( { url, caption } ) => {
				const card = createBlock( metadata.name, { url } );

				// カードにキャプション欄がないため、段落として保持する。
				return caption?.length
					? [
							card,
							createBlock( 'core/paragraph', {
								content: caption,
							} ),
					  ]
					: card;
			},
		},
	],
};

export default transforms;
