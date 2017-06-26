var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'js', 'compressImg'], function() {

    // build on change
    gulp.watch('assets/sass/*.{scss,sass}', ['sass']);
    // compress on change
    gulp.watch('assets/js/*.js', ['js']);
});

gulp.task('sass', function () {
    // add any files you want processed here
    // example:
    // processSASS('home');
    processSASS('styles');
});

gulp.task('js', function() {
    // add any files you want processed here
    // example:
    // processSASS('libraries');
    compressJS('scripts');
});

function compressJS(filename) {
    rootPath = "assets/js/";
    src = "assets/js/"+filename+".js";
    dist = 'dist/js/';

    return gulp.src(src)
        .pipe(uglify())
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(gulp.dest(dist));
}

gulp.task('compressImg', function() {
    return gulp.src('assets/img/*')
            .pipe(imagemin())
            .pipe(gulp.dest('dist/img'));
});

function processSASS(filename) {
    return gulp.src('assets/sass/'+filename+'.{scss,sass}')
      // Converts Sass into CSS with Gulp Sass
      .pipe(sass({
        errLogToConsole: true
      }))
      // adds prefixes to whatever needs to get done
      .pipe(autoprefixer())

      // minify the CSS
      .pipe(minifyCss())

      // rename to add .min
      .pipe(rename({
        suffix: '.min'
      }))
      // Outputs CSS files in the css folder
      .pipe(gulp.dest('dist/css/'));
}

// Creating a default task
gulp.task('default', ['serve']);
