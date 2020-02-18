var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var fileinclude = require('gulp-file-include');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('img' ,function () {
  gulp.src(['dev/img/*.*'  , 'dev/img/**/*.*']).pipe(gulp.dest('dest/img'));
});

gulp.task('concatjs', function(){
    gulp.src('./dev/js/*.js').pipe(gulp.dest('dest/js'));
});

//壓縮css
gulp.task('concatcss' ,function () {
    gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(gulp.dest('dest/css'));
});

//scss轉譯
gulp.task('sass' , function() {
    gulp.src('dev/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dest/css/'));
})


//打包 ./gulp/index.html 裡的檔案加上include指令
//傳出打包後的 html 到 ./dest
gulp.task('fileinclude', function() {
    gulp.src(['*.html'])
      .pipe(fileinclude({
        prefix: '@@', //深層include
        basepath: '@file' //層include
      }))
      .pipe(gulp.dest('./dest'));
  });



//最後要執行的時候只要在終端機輸入 gulp
gulp.task('default', function() {
  browserSync.init({
      server: {
          baseDir: "./dest",
          index: "index.html"
      }
  });
  gulp.watch(['dev/*.html' , 'dev/**/*.html'],  ['fileinclude']).on('change',reload);
  gulp.watch(['dev/sass/*.scss' , 'dev/sass/**/*.scss'], ['sass']).on('change',reload);
  gulp.watch(['dev/js/*.js' , 'dev/js/**/*.js'], ['concatjs']).on('change',reload);
  gulp.watch(['dev/img/*.*' , 'dev/img/**/*.*'] ,['img'] ).on('change',reload);
});