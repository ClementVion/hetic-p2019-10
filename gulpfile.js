const gulp = require('gulp')
const replace = require('gulp-replace')

gulp.task('copy-assets-to-dist', () => {
  gulp.src([
    'assets/html/*.html',
  ]).pipe(gulp.dest('dist/public/html/'));
  gulp.src([
    'assets/img/*',
  ]).pipe(gulp.dest('dist/public/img/'));
  gulp.src([
    'assets/fonts/*',
  ]).pipe(gulp.dest('dist/public/fonts/'));
  gulp.src([
    './bundle.js',
  ]).pipe(gulp.dest('dist/public/'));
})

gulp.task('replace-path', () => {
  gulp.src([
    'dist/public/bundle.js',
    'dist/html/*.html',
  ]).pipe(replace('../../assets/', './'))
    .pipe(gulp.dest('dist/public/'));
})
