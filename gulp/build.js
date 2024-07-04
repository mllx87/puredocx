var gulp = require('gulp');
var uglify = require('gulp-uglify'); // 获取 uglify 模块（用于压缩 JS）
var babel = require('gulp-babel'); // 将ES6编译成ES5

gulp.task('js', function () {
    return gulp.src('./src/docx-module/js/**/*.js')
        .pipe(babel())              //语法编译 
   //     .pipe(uglify())             //代码压缩
        .pipe(gulp.dest('./lib'));

})