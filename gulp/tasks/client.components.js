module.exports = (gulp, sourcePath, destPath) => {
  gulp.task('client:components', () => {
    gulp.src([
      `${sourcePath}/components/**/*`,
    ]).pipe(
      gulp.dest(destPath)
    );
  });
};
