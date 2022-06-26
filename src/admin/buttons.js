import { Button } from '@wordpress/components';

import { setStandardDesignCard, setStandardDesignList } from './design.js';

export const Buttons = ( props ) => {
	return (
		<React.Fragment>
			<Button isPrimary onClick={ props.dataSave }>
				保存
			</Button>
			<Button
				className="u-margin-left--5px"
				onClick={ () => setStandardDesignCard( props.setSettings ) }
				variant="secondary"
			>
				スタンダードデザイン（カード型）
			</Button>
			<Button
				className="u-margin-left--5px"
				onClick={ () => setStandardDesignList( props.setSettings ) }
				variant="secondary"
			>
				スタンダードデザイン（リスト型）
			</Button>
		</React.Fragment>
	);
};
