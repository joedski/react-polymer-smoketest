'use strict';

// const browserify = require( 'browserify' );
// const vinylSourceStream = require( 'vinyl-source-stream' );
// const vinylBuffer = require( 'vinyl-buffer' );

const bundleScript = require( './util/bundle' )( 'client/loader/index.js', 'loader.js' );



module.exports = ( gulp, plugins ) => ({
	bundle() {
		return bundleScript( gulp, plugins, false );
	},

	watch() {
		return bundleScript( gulp, plugins, true );
	},
});
