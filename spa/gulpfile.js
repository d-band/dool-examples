var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    shell = require('shelljs'),
    webserver = require('gulp-webserver');


var path = {
  base:'./',
  less: {
    dest: './css',
    src: ['./less/index.less']
  }
};

gulp.task('serverDev', function () {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});


gulp.task('less', function () {
   gulp.src(path.less.src)
      .pipe(less())
      .pipe(autoprefixer({
        browsers: ['> 1%', 'last 2 versions', 'Firefox > 0', 'Opera > 0', 'ie > 0']
      }))
      .pipe(gulp.dest(path.less.dest));
});



gulp.task('less-watch', function() {
   gulp.watch(path.less.src, ['less']);
});

// gulp.task('dool-bulid', function() {
//    shell.exec('dool build');
// });

// gulp.task('js-watch', function() {
//    gulp.watch(['./index.js'] ['dool-bulid']);
// });

// gulp.task('dev',["less-watch"]);
gulp.task('dev',["less-watch","serverDev"]);
