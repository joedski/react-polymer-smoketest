'use strict';

module.exports = ( gulp ) => () => {
	return gulp.src([
		'client/assets/**/*'
	])
		.pipe( gulp.dest( 'public' ) )
		;
}
