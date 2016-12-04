const gulp = require('gulp')
const replace = require('gulp-replace')

gulp.task('copy-assets-to-dist', () => {
  gulp.src([
    'assets/html/*.html',
  ]).pipe(gulp.dest('dist/html/'));
  gulp.src([
    'assets/img/*',
  ]).pipe(gulp.dest('dist/img/'));
  gulp.src([
    'assets/fonts/*',
  ]).pipe(gulp.dest('dist/fonts/'));
  gulp.src([
    './bundle.js',
  ]).pipe(gulp.dest('dist/'));
})

gulp.task('replace-path', () => {
  gulp.src([
    'dist/bundle.js',
    'dist/style.css',
  ]).pipe(replace('../assets/', './'))
    .pipe(gulp.dest('dist/'));
})
