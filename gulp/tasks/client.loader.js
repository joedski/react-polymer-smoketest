module.exports = (gulp, bundle) => {
  const source = 'loader/index.js';
  const dest = 'loader.js';

  gulp.task('client:loader', () => bundle(source, dest, false));
  gulp.task('watch:client:loader', () => bundle(source, dest, true));
};
