'use strict';

const browserify = require( 'browserify' );
const vinylSourceStream = require( 'vinyl-source-stream' );
const vinylBuffer = require( 'vinyl-buffer' );

module.exports = ( src, dest ) => ( gulp, plugins, watch ) => {
	dest = dest || 'public';

	let bundler = browserify(
		src,
		{
			debug: process.env.NODE_ENV !== 'production',
			cache: {}, packageCache: {}
		}
	);

	bundler = bundler
		.transform( 'envify' )
		.transform( 'babelify' )
		;

	if( process.env.NODE_ENV === 'production' ) {
		bundler = bundler.transform( 'uglifyify' );
	}

	if( watch ) {
		bundler = bundler.plugin( 'watchify' );
		bundler.on( 'update', execBundle );
		bundler.on( 'log', function() {
			let logArgs = [].slice.call( arguments, 0 );

			logArgs.unshift( 'script bundler:' );
			plugins.util.log.apply( plugins.util, logArgs );
		});
	}

	return execBundle();

	function execBundle() {
		let stream = bundler
			.bundle()
			.on( 'error', function( err ) {
				console.error( err.message );
				if( err.codeFrame ) console.error( err.codeFrame );
				this.emit( 'end' );
			})
			.pipe( vinylSourceStream( 'loader.js' ) )
			.pipe( vinylBuffer() )
			;

		if( process.env.NODE_ENV !== 'production' ) {
			stream = stream
				.pipe( plugins.sourcemaps.init({ loadMaps: true }) )
				.pipe( plugins.sourcemaps.write( './' ) )
				;
		}

		stream = stream
			.pipe( gulp.dest( dest ) )
			;

		return stream;
	}
}
