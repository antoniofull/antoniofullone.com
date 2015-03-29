var gulp = require('./gulp')([
	'browserify',
	'sass',
	'jshint'
	// 'images'
]);

var path = {
	'js': ['./_assets/js/**/*.js','./_assets/js/FontLoader.js'],
	'css': './_assets/scss/**/*.scss'
}

// Watcher

gulp.task('watch', function(){
	gulp.watch(path.js, ['jshint', 'browserify']);
	gulp.watch(path.css, ['sass']);
})


// Tasks
gulp.task('build',['sass', 'jshint', 'browserify']);
gulp.task('default',['jshint', 'browserify','sass']);


