const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require('path')

module.exports = {
  ...defaultConfig,
  entry: {
    ...defaultConfig.entry,
    index: path.resolve( process.cwd(), 'src', 'index.js' ),
    admin: path.resolve( process.cwd(), 'src', 'admin.js' ),
  },
  output: {
    ...defaultConfig.output,
    path: path.resolve( process.cwd(), 'build' ),
  },
}
