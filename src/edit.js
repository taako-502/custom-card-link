import { TextControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import { useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();
	return (
		<div { ...blockProps }>
			<ServerSideRender
				block={metadata.name}
				attributes={attributes}
			/>
			<TextControl
				value={ attributes.url }
				onChange={ ( val ) => setAttributes( { url: val } ) }
			/>
		</div>
	);
}
