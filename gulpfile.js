var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");
var sourcemaps = require('gulp-sourcemaps');
var rigger = require('gulp-rigger');
var del = require('del');
var imagemin = require('gulp-tinypng');
var cheerio = require('gulp-cheerio');
var replace = require('gulp-replace');
var svgSprite = require('gulp-svg-sprite');
var svgmin = require('gulp-svgmin');
var browserSync = require('browser-sync').create();



// Static server
gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: "build"
		}
	});
});

gulp.task('pug', function () {
	return gulp.src('src/pug/pages/*.pug')
		.pipe(sourcemaps.init())
		.pipe(pug({
			pretty: true
		}))
		.pipe(plumber({
			errorHandler: notify.onError(function (error) {
				return {
					title: 'Pug',
					message: "Error: <%= error.message %>"
				};
			})
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./build'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('style', function () {
	return gulp.src('src/style/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({  //Добавим вендорные префиксы
			browsers: ['last 2 versions'],
			cascade: false
		}))
		//.pipe(csso())
		.pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./build/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('scripts', function () {
	return gulp.src('src/js/main.js')
		.pipe(sourcemaps.init())
		.pipe(rigger()) //Прогоним через rigger
		.pipe(sourcemaps.write())
		.pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('img:dev', function (cb) {
	return gulp.src('src/img/general/**/*.*')
		.pipe(gulp.dest('./build/img/general'));
});

gulp.task('img:build', function (cb) {
	return gulp.src('src/img/**/*.*')
		//.pipe(imagemin('API_KEY'))
		.pipe(gulp.dest('./build/img'));
});

gulp.task('svg', function () {
	return gulp.src('src/img/svg/*.svg')
	// minify svg
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		// remove all fill, style and stroke declarations in out shapes
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true}
		}))
		// cheerio plugin create unnecessary string '&gt;', so replace it.
		.pipe(replace('&gt;', '>'))
		// build svg sprite
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: "sprite.svg",
					/*render: {
						scss: {
							template: "src/style/templates/_sprite_templates.scss",
							dest:'../../../img/svg/_sprite.scss'
						}
					}*/
				}
			}
		}))
		.pipe(gulp.dest('./build/img/svg'));
});

gulp.task('svg:copy', function () {
	return gulp.src('src/img/svgCopy/*.svg')
		.pipe(gulp.dest('./build/img/svgCopy'))
});


gulp.task('fonts', function () {
	return gulp.src('src/fonts/**/*.*')
		.pipe(gulp.dest('./build/fonts/'))
});



gulp.task('watch', function () {
	gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
	gulp.watch('src/style/**/*.scss', gulp.series('style'));
	gulp.watch('src/js/**/*.js', gulp.series('scripts'));
	gulp.watch('src/img/general/**/*.{png, jpg, gif}', gulp.series('img:dev'));
	gulp.watch('src/img/svg/*.svg', gulp.series('svg'));
	gulp.watch('src/img/svgCopy/*.svg', gulp.series('svg:copy'));
});

gulp.task('clean', function () {
	return del(['./build/'])
});

gulp.task('dev', gulp.series(
	'clean',
	gulp.parallel('pug', 'style', 'scripts', 'img:dev', 'svg', 'svg:copy', 'fonts')
));

gulp.task('build', gulp.series(
	'clean',
	gulp.parallel('pug', 'style', 'scripts', 'img:build', 'svg', 'fonts'),
));

gulp.task('default', gulp.series(
	'dev',
	gulp.parallel(
		'watch',
		'server'
	)
));