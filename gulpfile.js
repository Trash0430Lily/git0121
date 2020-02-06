var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');

gulp.task('concat', function(){
    //src經由pipe跑到dest的地點去
    gulp.src('js/*.js').pipe(gulp.dest('dest/js'))
});

//壓縮css
gulp.task('concatcss' ,function () {
    gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(gulp.dest('dest/css'));
});

//scss轉譯
//watch sass / gulp sass二選一，都是轉譯scss的工具
gulp.task('sass' , function() {
    gulp.src('sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css/'));
})

//監看所有轉譯、串聯css的動作
//跟watch sass功能很像
//退出監看功能[ctrl+c]，mac系統的話[ctrl+z]
gulp.task('watch', function(){
    gulp.watch('sass/*.scss', ['sass']);
    gulp.watch('js/*.js', ['concat']);
})