import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

import { setStandardDesignCard, setStandardDesignList } from './design.js';

export const Buttons = ( props ) => {
	const React = require( 'react' );

	return (
		<React.Fragment>
			<Button isPrimary onClick={ props.dataSave }>
				{ __( 'Save', 'ccl-plugin' ) }
			</Button>
			<Button
				className="u-margin-left--5px"
				onClick={ () => setStandardDesignCard( props.setSettings ) }
				variant="secondary"
			>
				{ __( 'Default Card Design', 'ccl-plugin' ) }
			</Button>
			<Button
				className="u-margin-left--5px"
				onClick={ () => setStandardDesignList( props.setSettings ) }
				variant="secondary"
			>
				{ __( 'Default List Design', 'ccl-plugin' ) }
			</Button>
		</React.Fragment>
	);
};
