// Include Gulp
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var rename = require('gulp-rename');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var order = require('gulp-order');

// Define default destination folder
var dest = 'www/';

gulp.task('js', function() {
	var jsFiles = 'src/js/*';
	gulp.src(jsFiles)
		.pipe(filter('*.js'))
		.pipe(concat('main.js'))
		.pipe(uglify())
    .pipe(rename('main.min.js'))
		.pipe(gulp.dest(dest));
});

gulp.task('css', function() {
	var cssFiles = 'src/css/*';
	gulp.src(cssFiles)
		.pipe(filter('*.css'))
		.pipe(order([
			'*'
		]))
		.pipe(concat('main.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest(dest));
});

gulp.task('html', function() {
  var htmlFiles = ['src/html/*'];
    gulp.src(htmlFiles)
    .pipe(filter('*.html'))
    .pipe(minifyHtml())
    .pipe(gulp.dest(dest));
});

gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('build', ['js', 'css', 'html']);

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['lint', 'js']);
    gulp.watch('src/css/*.css', ['css']);
    gulp.watch('src/html/*.html', ['html']);
});

gulp.task('default', ['lint', 'build']);
