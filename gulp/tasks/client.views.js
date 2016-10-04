module.exports = (gulp, bundle) => {
  const source = 'index.jsx';
  const dest = 'app.js';

  gulp.task('client:views', () => bundle(source, dest, false));
  gulp.task('watch:client:views', () => bundle(source, dest, true));
};
