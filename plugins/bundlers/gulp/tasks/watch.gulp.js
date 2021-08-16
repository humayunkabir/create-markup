const gulp = require('gulp');
const { paths, baseDir, browserSync } = require('./utils');
const { compilePug } = require('./pug.gulp');

/* -------------------------------------------------------------------------- */
/*                                   Watcher                                  */
/* -------------------------------------------------------------------------- */
gulp.task('watch', () => {
  browserSync.init({
    server: { baseDir },
    port: 3000,
    open: true,
    notify: false,
    middleware: compilePug,
  });

  const updating = (done) => {
    browserSync.reload();
    done();
  };

  gulp.watch(paths.pug.src.all, gulp.series(updating));
  gulp.watch(paths.style.src, gulp.series('style'));
  gulp.watch(paths.script.src, gulp.series('script'));
  gulp.watch(['./src/assets/js/index.js'], gulp.series('script:webpack'));
  gulp.watch(
    paths.watch.map((dir) => `${paths.dir.dev}/${dir}`),
    gulp.series(updating)
  );
});
