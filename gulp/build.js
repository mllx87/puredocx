var gulp = require('gulp');
var clean = require('gulp-clean'); // 打包之前，先清空原来的文件
var uglify = require('gulp-uglify'); // 获取 uglify 模块（用于压缩 JS）
var babel = require('gulp-babel'); // 将ES6编译成ES5


gulp.task('clean', function () {
    return gulp.src('lib', { allowEmpty: true }) //src 匹配文件
        .pipe(clean()); //清除dist目录
});

gulp.task('docx', function () {
    return gulp.src('./src/docx-module/**/*.js')
        .pipe(babel())              //语法编译 
        //     .pipe(uglify())             //代码压缩
        .pipe(gulp.dest('./lib/docx-module'));

})

gulp.task('image', function () {
    return gulp.src('./src/image-module/*.js')
        .pipe(babel())              //语法编译 
        .pipe(gulp.dest('./lib/image-module'));

})


gulp.task('index', function () {
    return gulp.src(['./src/index.js'])
        .pipe(babel())              //语法编译 
        .pipe(gulp.dest('./lib'));

})

gulp.task('common', function () {
    return gulp.src(['./src/common/*.js'])
        .pipe(babel())              //语法编译 
        .pipe(gulp.dest('./lib/common'));

})


gulp.task('default', gulp.series('clean', gulp.parallel('docx', 'image', 'index', 'common')));



