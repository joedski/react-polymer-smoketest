'use strict';

module.exports = ( gulp ) => () => {
	return gulp.src([
		'client/components/**/*'
	])
		.pipe( gulp.dest( 'public' ) )
		;
}
