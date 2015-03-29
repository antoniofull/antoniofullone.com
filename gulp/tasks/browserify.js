var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var gutil = require('gulp-util');
var transform = require('vinyl-transform');

module.exports = function() {
	var browserified = transform(function(module){
		var br = browserify(module);
		return br.bundle();
	});

	return gulp.src(['./_assets/js/main.js'])
		.pipe(browserified)
		.pipe(gulp.dest('./build/js/'))
}