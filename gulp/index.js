import gulp from 'gulp';
import gulpDi from 'gulp-di';

const diConfig = {
  pattern: [
    'gulp-*',
    'gulp.*',
    '!gulp-di',
    'browserify',
    'vinyl-source-stream',
    'vinyl-buffer',
  ],
};

gulpDi(gulp, diConfig)
  .provide('sourcePath', 'client')
  .provide('destPath', 'public')
  .modules('./lib')
  .tasks('./tasks')
  .task(gulp => gulp.task('client', [ // eslint-disable-line no-shadow
    'client:views',
    'client:loader',
    'client:assets',
    'client:components',
  ]))
  .resolve();
