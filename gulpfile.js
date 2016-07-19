'use strict';

var gulp = require('gulp');
var fs = require("fs");
var browserify = require("browserify");
var sass = require('gulp-sass');

// browserify -t [ babelify --presets [ es2015 react ] ] src/main.js -o public/js/bundle.js
gulp.task('build', function() {
  browserify('src/main.js')
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .pipe(fs.createWriteStream('public/js/bundle.js'));
});

gulp.task('sass', function () {
  gulp.src('sass/*')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function () {
  gulp.watch('src/*', ['build']);
  gulp.watch('sass/*', ['sass']);
});
