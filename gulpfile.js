const gulp = require('gulp')
const replace = require('gulp-replace')
const clean = require('gulp-clean')

gulp.task('copy-assets-to-dist', () => {
  gulp.src([
    'assets/html/*.html',
  ]).pipe(gulp.dest('dist/public/html/'));
  gulp.src([
    'assets/img/*',
  ]).pipe(gulp.dest('dist/public/img/'));
  gulp.src([
    './bundle.js',
  ]).pipe(gulp.dest('dist/public/'));
  gulp.src([
    './index.html',
  ]).pipe(gulp.dest('dist/public/'));
  /*gulp.src([
    'dist/public/*.{woff,eot,ttf}',
  ]).pipe(gulp.dest('dist/public/fonts/'))
    .pipe(clean({force: true}));*/
})

// gulp.task('replace-path', () => {
//   gulp.src([
//     'dist/public/bundle.js',
//     'dist/html/*.html',
//   ]).pipe(replace('../../assets/', '/'))
//     .pipe(replace('../assets/', '/'))
//     .pipe(gulp.dest('dist/public/'));
// })

gulp.task('replace-path', () => {
  gulp.src(['dist/public/bundle.js',])
    .pipe(replace('/assets/', '/'))
    .pipe(gulp.dest('dist/public/'));
  gulp.src(['dist/public/html/*.html'])
  .pipe(replace('/assets/', '/'))
  .pipe(gulp.dest('dist/public/html/'));
})
