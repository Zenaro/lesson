/**
 * Created by Administrator on 2016/3/29.
 */
// 引入gulp
var gulp = require("gulp");

// 引入组件
var less = require('gulp-less'),
	livereload = require('gulp-livereload'), //自动刷新页面
	minifycss = require('gulp-minify-css'), //css压缩
	concat = require('gulp-concat'), //文件合并
	rename = require('gulp-rename'), //文件更名
	uglify = require('gulp-uglify');

// style
gulp.task('style', function() {
	return gulp.src('src/style/*.less') // index.less
		.pipe(less())
		//.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('dist/css')) // index.css
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css')); // index.min.css
});

// js
gulp.task('script', function() {
	return gulp.src('src/script/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/script'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify()) // 安全 
		.pipe(gulp.dest('dist/script'));
});

// Default task
gulp.task('default', function() {
	gulp.start('style', 'script');
});

gulp.task('watch', function() { // 监听
	livereload.listen();
	gulp.watch('src/style/*.less', ['style']);
	gulp.watch('src/script/*.js', ['script']);
	gulp.watch('dist/**/*.*', function(file) {
		livereload.changed(file.path);
	});
});