
var gulp = require('gulp');
var jshint = require('gulp-jshint');
module.exports = function() {
	gulp.task('jshint', function() {
		return gulp.src('./_assets/js/**/*.js')
		.pipe(jshint({"esnext": true}))
		.pipe(jshint.reporter('default')); 
	});
}