module.exports = (gulp, sourcePath, destPath) => {
  gulp.task('client:assets', () => {
    gulp.src([
      `${sourcePath}/assets/**/*`,
    ]).pipe(
      gulp.dest(destPath)
    );
  });
};
