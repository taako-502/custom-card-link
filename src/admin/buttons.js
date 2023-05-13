import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

import { setStandardDesignCard, setStandardDesignList } from './design.js';

export const Buttons = ( props ) => {
	const React = require( 'react' );

	return (
		<React.Fragment>
			<Button isPrimary onClick={ props.dataSave }>
				{ __( '保存', 'ccl-plugin' ) }
			</Button>
			<Button
				className="u-margin-left--5px"
				onClick={ () => setStandardDesignCard( props.setSettings ) }
				variant="secondary"
			>
				{ __( 'スタンダードデザイン（カード型）', 'ccl-plugin' ) }
			</Button>
			<Button
				className="u-margin-left--5px"
				onClick={ () => setStandardDesignList( props.setSettings ) }
				variant="secondary"
			>
				{ __( 'スタンダードデザイン（リスト型）', 'ccl-plugin' ) }
			</Button>
		</React.Fragment>
	);
};
