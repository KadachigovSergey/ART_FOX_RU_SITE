var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglifyjs'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer');

// gulp.task('auto-pre', function () {
//     return gulp.src('app/css/*.css')
//         .pipe(autoprefixer({
//             browsers: ['last 7 versions'],
//             cascade: false
//         }))
//         .pipe(gulp.dest('app/css'));
// });

gulp.task('sass', function () {
    return gulp.src('dist/sass/**/*.scss')
    // {outputStyle: 'compressed'}
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css/'));
});

gulp.task('scripts', function () {
    return gulp.src([
        'dist/js/*.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});
// ,'auto-pre' gulp.watch('app/css/*.css',['auto-pre'])
gulp.task('watch', ['sass', 'scripts'], function () {
    gulp.watch('dist/sass/**/*.scss', ['sass']);
    gulp.watch('dist/js/*.js', ['scripts']);
});

gulp.task('default', ['watch']);