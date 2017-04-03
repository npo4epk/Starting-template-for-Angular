'use strict'

/* DEPENDENCIES
 ========================= */
var 	browserSync   = require('browser-sync'),
		del           = require('del'),
		gulp       	  = require('gulp'),
		autoprefixer  = require('gulp-autoprefixer'),
		cache         = require('gulp-cache'),
		gulpif 		  = require('gulp-if'),
		imagemin      = require('gulp-imagemin'),
		minifyCss     = require('gulp-minify-css'),
		scss          = require('gulp-sass'),
		uglify        = require('gulp-uglify'),
		useref        = require('gulp-useref');


/* HTML TASKS
 ========================= */
gulp.task('html', function() {
    return gulp.src('dev/**/*.html')
   		       .pipe(browserSync.reload({stream: true}));
});


/* SCSS TASKS
 ========================= */
gulp.task('scss', function() {
	return gulp.src('dev/scss/**/*.+(scss|sass)')
			   .pipe(scss().on('error', scss.logError))
			   .pipe(autoprefixer({browsers: ['last 5 versions'], cascade: true}))
			   .pipe(gulp.dest('dev/css'))
		 	   .pipe(browserSync.reload({stream: true}));
});


/* JS TASKS
 ========================= */
gulp.task('js', function() {
    return gulp.src('dev/**/*.js')
               .pipe(browserSync.reload({stream: true}));
});


/* BROWSERSYNC
 ========================= */
gulp.task('browser-sync', function() {
		browserSync({
			server: {
				baseDir: 'dev'
			},
			notify: false
		});
});

/* WATCHER
 ========================= */
gulp.task('watch', ['browser-sync', 'html', 'scss', 'js'], function() {
    	gulp.watch('dev/**/*.html', ['html']);
	    gulp.watch('dev/scss/**/*.+(scss|sass)', ['scss']);
		gulp.watch('dev/**/*.js', ['js']);
});



//-----------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------//



/* DEL TASKS
 ========================= */
gulp.task('clean', function() {
    return del.sync('dist');
});


/* APP TASKS
 ========================= */
gulp.task('app', function () {
    return gulp.src('dev/app/**/*.html')
               .pipe(gulp.dest('dist/app'));
});


/* FONTS TASKS
 ========================= */
gulp.task('fonts', function () {
    return gulp.src('dev/fonts/**/*')
        	   .pipe(gulp.dest('dist/fonts'));
});


/* IMAGES TASKS
 ========================= */
gulp.task('img', function() {
    return gulp.src('dev/img/**/*')
        	   .pipe(cache(imagemin({interlaced: true, progressive: true, svgoPlugins: [{removeViewBox: false}], use: []})))
        	   .pipe(gulp.dest('dist/img'));
});


/* DATA TASKS
 ========================= */
gulp.task('data', function () {
    return gulp.src('dev/data/**/*')
        	   .pipe(gulp.dest('dist/data'));
});


/* DEFAULT TASKS
 ========================= */
gulp.task('default', ['watch', 'browser-sync']);


/* CLEAR CACHE TASKS
 ========================= */
gulp.task('clear', function (callback) {
    return cache.clearAll();
});


/* BUILD TASKS
 ========================= */
gulp.task('build', ['clean', 'html', 'scss', 'js'], function () {
    gulp.start('app');
	gulp.start('fonts');
    gulp.start('img');
    gulp.start('data');
    return gulp.src('dev/*.html')
			   .pipe(useref())
			   .pipe(gulpif('*.js', uglify()))
			   .pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
			   .pipe(gulp.dest('dist'));
});