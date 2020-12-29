'use strict';

var gulp = require('gulp'),
    sass = require('sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');

    gulp.task('sass', function () {
        return gulp.src('./csss/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest('./csss'));
      });


      gulp.task('sass:watch', function () {
        gulp.watch('./csss/*.scss', ['sass']);
      });


      gulp.task('browser-sync', function () {
        var files = [
           './*.html',
           './csss/*.css',
           './img/*.{png,jpg,gif}',
           './js/*.js'
        ];
     
        browserSync.init(files, {
           server: {
              baseDir: "./"
           }
        });
     
     });



// Default task
gulp.task('default', gulp.series('browser-sync', 'sass:watch'));


// Clean
gulp.task('clean', function() {
   return del(['dist']);
});

// Copying fonts
gulp.task('copyfonts', function() { 

   return gulp.src('./bootstrap-social-gh-pages/node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*') 

   .pipe(gulp.dest('./dist/fonts')); 

});



// Images
gulp.task('imagemin', function() {
   return gulp.src('img/*.{png,jpg,gif}')
     .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
     .pipe(gulp.dest('dist/img'));
 });

// Perform all minification and concatenation

 gulp.task('usemin', function() {
   return gulp.src('./*.html')
   .pipe(flatmap(function(stream, file){  // flatmap allows all html files to be able to run in parallel
       return stream
         .pipe(usemin({
             css: [ rev() ], // rev does revision for every css files
             html: [ function() { return htmlmin({ collapseWhitespace: true })} ],
             js: [ uglify(), rev() ], // rev does revision for every js files
             inlinejs: [ uglify() ], 
             inlinecss: [ cleanCss(), 'concat' ]
         }))
     }))
     .pipe(gulp.dest('dist/'));
 });
 
// Run automated minification task. 
// clean is at start as to run clean task first and then after completion of clean task run all other 
//  tasks in parallel 

gulp.task('build', gulp.series('clean', 'copyfonts', 'imagemin', 'usemin', function (done) { done(); }     

));