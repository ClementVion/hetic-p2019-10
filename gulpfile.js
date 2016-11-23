var gulp = require('gulp'),
	sass = require('gulp-sass'),
	postcss = require('gulp-postcss'),
	cssnano = require('cssnano'),
	autoprefixer = require('autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync').create(),
	rename = require('gulp-rename'),
	browserify = require("browserify"),
	babelify = require("babelify"),
	source = require('vinyl-source-stream'),
	gutil = require('gulp-util');
    stringify = require('stringify');

gulp.task('styles', function() {
	var processors = [
		autoprefixer({
			browsers: ['last 2 versions']
		}),
		pxtorem({
			propWhiteList: [],
			replace: false
		}),
		cssnano
	];

	return gulp.src('./app/assets/scss/style.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(postcss(processors))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());

});

gulp.task('scripts', function() {
	browserify({ debug: true })
		.transform(stringify, {
        appliesTo: { includeExtensions: ['.html'] },
        minify: true
    	})
    	.transform(babelify)	
		.require("entry.js", { entry: true })
		.bundle()
		.on('error',gutil.log)
		.pipe(source('main.js'))
    	.pipe(gulp.dest('dist/js'));
});

gulp.task('img', function() {
	gulp.src('./app/assets/img/**/*.*', {
			base: './app/assets/img/'
		})
		.pipe(gulp.dest('dist/img'));
});


gulp.task('fonts', function() {
	gulp.src('./app/assets/fonts/**/*.*', {
			base: './app/assets/fonts/'
		})
		.pipe(gulp.dest('dist/fonts'));
});


gulp.task('sync', ['styles', 'scripts', 'handlebars', 'img', 'fonts'], function() {
	browserSync.init({
		server: './dist'
	})

	gulp.watch("./app/assets/img/**/*.**", ['img']);
	gulp.watch("./app/assets/js/**/*.**", ['scripts']);
	gulp.watch("./app/assets/fonts/**/*.**", ['fonts']);
	gulp.watch("./app/assets/scss/**/*.scss", ['styles']);
	gulp.watch("./app/templates/**/*.hbs", ['handlebars']);
});

gulp.task('default', ['sync'], function() {});