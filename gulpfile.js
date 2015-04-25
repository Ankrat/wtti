/*
 *
 * gulp [https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md]
 * browser-sync [http://www.browsersync.io/docs/gulp/#gulp-install]
 * gulp-file-include [https://www.npmjs.com/package/gulp-file-include/]
 * gulp-sass [https://www.npmjs.com/package/gulp-sass]
 * gulp-sourcemaps [https://www.npmjs.com/package/gulp-sourcemaps]
 * gulp-stylestats [https://github.com/1000ch/gulp-stylestats]
 * gulp-autoprefixer [https://www.npmjs.com/package/gulp-autoprefixer]
 * gulp-minify-css [https://www.npmjs.com/package/gulp-minify-css]
 * gulp-minify-html [https://www.npmjs.com/package/gulp-minify-html]
 * gulp-jshint [https://www.npmjs.com/package/gulp-jshint]
 * gulp-uglify [https://www.npmjs.com/package/gulp-uglify]
 * gulp-imagemin [https://www.npmjs.com/package/gulp-imagemin]
 * gulp-rename [https://www.npmjs.com/package/gulp-rename]
 * gulp-concat [https://www.npmjs.com/package/gulp-concat]
 * gulp-notify [https://www.npmjs.com/package/gulp-notify]
 * gulp-cache [https://www.npmjs.com/package/gulp-cache]
 * del [https://www.npmjs.com/package/del]
 *
 */

// Load plugins
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    fileinclude = require('gulp-file-include'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    stylestats = require('gulp-stylestats'),
    minifycss = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    reload = browserSync.reload;

// HTML
gulp.task('html', function() {
  return gulp.src(['src/*.html'])
    .pipe(fileinclude({ prefix: '@@', basepath: '@file' }))
    .pipe(gulp.dest('dist/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifyHTML({conditionals: true}))
    .pipe(gulp.dest('dist/assets/'))
    .pipe(notify({ message: 'HTML task complete' }));
});

// Styles
gulp.task('styles', function() {
  return gulp.src('src/sass/{,*/}*.scss')
    .pipe(sass({ style: 'expanded', errLogToConsole: true}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(stylestats())
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/scripts/{,*/}*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(gulp.dest('dist/assets/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function(cb) {
    del(['dist/*.html', 'dist/styles', 'dist/scripts'], cb);
});

// Serve
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  });
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'html', 'serve', 'watch');
});

// Watch
gulp.task('watch', function() {

  // Watch .html/.htm files
  gulp.watch('src/{,*/}*.{htm,html}', ['html']);

  // Watch .scss files
  gulp.watch('src/sass/{,*/}*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/scripts/{,*/}*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/images/{,*/}*', ['images']);

  // Create LiveReload server
  // gulp.watch(['src/{,*/}*.html', 'src/css/{,*/}*.css']).on('change', reload);

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', reload);

});
