var gulp = require('gulp');
var sass = require('gulp-sass');

module.exports = function(){
	gulp.task('sass', function () {
    return gulp.src('_assets/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));	
	});
}