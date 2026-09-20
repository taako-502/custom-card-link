const defaultConfig = require( '@wordpress/scripts/config/jest-unit.config' );

module.exports = {
	...defaultConfig,
	// @wordpress/blocks の ES Modules 依存を変換対象にする。
	transformIgnorePatterns: [ '/node_modules/(?!(uuid|marked)/)' ],
};
