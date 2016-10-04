'use strict';

const path = require( 'path' );
const gulp = require( 'gulp' );
const plugins = require( 'gulp-load-plugins' )();

function task( name ) {
	// Note: path.join and path.relative (probably path.normalize, actually) always take off leading "./".
	return require( '.' + path.sep + path.join( 'tasks', name ) )( gulp, plugins );
}

gulp.task( 'client', [
	'client:views',
	'client:loader',
	'client:assets',
	'client:components',
]);

gulp.task( 'client:views', task( 'client/views' ).bundle );
gulp.task( 'client:loader', task( 'client/loader' ).bundle );

gulp.task( 'watch:client:views', task( 'client/views' ).watch );

gulp.task( 'client:assets', task( 'client/assets' ) );
gulp.task( 'client:components', task( 'client/components' ) );
