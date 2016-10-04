module.exports = (
  sourcePath,
  destPath,
  gulp,
  sourcemaps,
  util,
  browserify,
  vinylSourceStream,
  vinylBuffer,
) => (sourceName, destName, watch) => {
  const source = `${sourcePath}/${sourceName}`;
  let bundler = browserify(
    source,
    {
      debug: process.env.NODE_ENV !== 'production',
      cache: {},
      packageCache: {},
      extensions: [
        '.jsx',
      ],
    }
  );

  function execBundle() {
    let stream = bundler
      .bundle()
      .on('error', function onError(err) {
        console.error(err.message);
        if (err.codeFrame) {
          console.error(err.codeFrame);
        }
        this.emit('end');
      })
      .pipe(vinylSourceStream(destName))
      .pipe(vinylBuffer());

    if (process.env.NODE_ENV !== 'production') {
      stream = stream
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'));
    }

    stream = stream.pipe(gulp.dest(destPath));

    return stream;
  }

  bundler = bundler
    .transform('envify')
    .transform('babelify');

  if (process.env.NODE_ENV === 'production') {
    bundler = bundler.transform('uglifyify');
  }

  if (watch) {
    bundler = bundler.plugin('watchify');
    bundler.on('update', execBundle);
    bundler.on('log', () => {
      const logArgs = [].slice.call(arguments, 0);

      logArgs.unshift('script bundler:');
      util.log(...logArgs);
    });
  }

  return execBundle();
};
