var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    wiredep = require('wiredep').stream,
    notify = require("gulp-notify");

gulp.task('default', ['connect', 'watch']);

gulp.task('connect', function () {
    connect.server({
        root: '',
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('*.html', ['html']);
    gulp.watch('bower.json', ['bower']);
});

gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(connect.reload());
});

gulp.task('less', function () {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'))
        .pipe(connect.reload());
});

gulp.task('bower', function () {
    gulp.src('index.html')
        .pipe(wiredep({
            directory: 'bower_components',
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(gulp.dest(''))
        .pipe(connect.reload());
});

