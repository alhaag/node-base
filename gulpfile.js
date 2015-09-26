/*
* Install dependencies:
* npm install --save-dev gulp gulp-babel gulp-jshint gulp-uglify gulp-less gulp-minify-css gulp-rename browser-sync gulp-nodemon
*/

'use strict';

var gulp        = require('gulp'),
    babel       = require('gulp-babel'),
    jshint      = require('gulp-jshint'),
    uglify      = require('gulp-uglify'),
    less        = require('gulp-less'),
    minifyCss   = require('gulp-minify-css'),
    rename      = require('gulp-rename'),
    browserSync = require('browser-sync'),
    nodemon     = require('gulp-nodemon'),
    path        = require('path');

gulp.task('default', ['transpile', /*'lint',*/ 'uglify', 'less', 'browser-sync'] ,function() {
    // place code for your default task here
});

// ECMA 6 to ECMA 5.1
gulp.task('transpile', function () {
    return gulp.src('assets/js/*.js')
        .pipe(babel())
        .pipe(gulp.dest('assets/js/transpile'));
});

// syntactic analysis javascript
/*gulp.task('lint', ['transpile'], function(){
    return gulp.src(['assets/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});*/

// minify javascript
gulp.task('uglify', ['transpile'], function() {
    return gulp.src('assets/js/transpile/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/js'));
});

// less preprocessor and minify
gulp.task('less', function () {
    return gulp.src('assets/less/**/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(minifyCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/css'));
});

// sync browser
gulp.task('browser-sync', ['nodemon', 'watch'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: [
            "public/**/*.*",
            "views/**/*.jade"
        ],
        //browser: "google chrome",
        port: 5000
    });
});

// start node
gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({script: './bin/www'}).on('start', function () {
        if (!called) {
            called = true;
            cb();
        }
    });
});

// watch files
gulp.task('watch', function() {
    gulp.watch('assets/js/*.js', ['transpile']);
    gulp.watch('assets/js/transpile/*.js', ['uglify']);
    gulp.watch('assets/less/**/*.less', ['less']);
});