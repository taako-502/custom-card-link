import { TextControl } from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();
	return (
		<div { ...blockProps }>
			<TextControl
				value={ attributes.url }
				onChange={ ( val ) => setAttributes( { url: val } ) }
			/>
		</div>
	);
}
