let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');

gulp.task('default', () => {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie10'}))
    .pipe(gulp.dest('dist'));
});

/*module.exports = function(tasks) {
    tasks.forEach(function(name) {
        gulp.task(name, require('./tasks/' + name));
    });

    return gulp;
};
*/
