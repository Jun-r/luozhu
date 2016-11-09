var gulp = require('gulp'),
	jade = require('gulp-jade'), //jade模版
	csso = require('gulp-csso'), //剔除多余css
	rjs = require('gulp-requirejs'), //requirejs
	sass = require('gulp-ruby-sass'), //编译sass
	gulpImports = require('gulp-imports'), //导入文件
	minifycss = require('gulp-minify-css'), //压缩css
	spritesmith = require("gulp-spritesmith"), //css雪碧图
	fileinclude = require('gulp-file-include'), //include模块
	autoprefixer = require('gulp-autoprefixer'), //浏览器前缀
	tinypng = require('gulp-tinypng-compress'), //压缩图片
	cleanDest = require('gulp-clean-dest'), //清空文件
	uglify = require('gulp-uglify'), //js压缩
	concat = require('gulp-concat'), //文件合并
	notify = require('gulp-notify'), //通知消息
	rename = require('gulp-rename'), //重命名文件
	gulpif = require("gulp-if");

/* 设置路径 */
var path = {
		 css : "public/dist/css",
		  js : "public/js",
		scss : "public/sass/scss",
		 img : "public/images",
		build: "public/dist"
	}

//编译sass文件
gulp.task('sass', function () {
	return sass(path.scss + '/*.scss', {
			style: 'compressed'
		}) //expended(展开)  compact(紧凑)  compressed(压缩)  nested(嵌套)
		.pipe(autoprefixer({
			browsers: ['last 20 versions', 'safari 5', 'opera 12.1', 'ios 6', 'android 4']
		}))
		.on('error', function (err) {
			console.error('错误!', err.message);
		})
		.pipe(minifycss())			  //执行压缩
		.pipe(gulp.dest(path.css))
		//.pipe(notify({message: 'sass compiled!'}));
});

//压缩合并css
gulp.task('css', function () {
	return gulp.src(path.css + '/*.css') //压缩的文件
		.pipe(concat('main.css'))	   //合并css
		.pipe(minifycss())			  //执行压缩
		.pipe(gulp.dest(path.build));   //输出文件夹
});

//压缩合并js
gulp.task('js', function () {
	return gulp.src(path.js + '/*.js')
		//.pipe(concat('main.js')) //合并所有js到main.js
		//.pipe(gulp.dest(path.build+'/js')) //输出main.js到文件夹
		//.pipe(rename({suffix: '.min'}))
		.pipe(uglify()) //js压缩
		.pipe(gulp.dest(path.build+'/js'))
		//.pipe(notify({message: 'js compiled!'}));
});

// 自动生成雪碧图
gulp.task('sprites', function () {
	return gulp.src('public/slice/*.png')
		.pipe(spritesmith({
			imgName: 'sprite.png',
			styleName: 'sprite.css',
			imgPath: 'images/sprite.png',
			padding: 5
		}))
		.pipe(gulpif('*.png', gulp.dest(path.img))) //雪碧图输出路径
		.pipe(gulpif('*.css', gulp.dest(path.css))); //css输出路径
});

//压缩图片
gulp.task('tiny', function () {
	gulp.src('img/*.png') //*.{png,jpg,jpeg}
		.pipe(tinypng({
			key: 'Rm4OUjhKcl6ANW2CCwU95pvX4ZIC_r62',
			sigFile: '.tinypng-sigs', //跳过压缩过的文件
			log: true
		}))
		.pipe(gulp.dest(path.img));
});

//include 命令
gulp.task('include', function () {
	gulp.src(['index.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('./'));
});

//requirejs
gulp.task('requirejs', function () {
	rjs({
			baseUrl: 'path/to/your/base/file.js',
			out: 'FILENAME\_TO\_BE\_OUTPUTTED',
			shim: {
				// 标准 require.js shim 选项

			},
			// ... 更多 require.js 选项
		})
		.pipe(gulp.dest(path.build)); // 输出到文件夹
});

//jade 模版
gulp.task('jade', function () {
	gulp.src('public/jade/*.jade')
		.pipe(jade({pretty : false}))
		.pipe(gulp.dest('html'))
		//.pipe(notify({message: 'jade compiled!'}));
});


//默认命令
gulp.task('default', function () {
	gulp.start(['sass','jade','js']);
});
gulp.watch([
	'public/scss/*.scss',
	'public/scss/*/*.scss',
	'views/*.jade',
	'views/*/*.jade',
	'public/js/*.js'
], ['default']);