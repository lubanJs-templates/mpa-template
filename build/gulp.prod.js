const gulp = require('gulp')        // 重命名
// js
const Uglify = require('gulp-uglify') // 压缩js
const Babel = require('gulp-babel')
// css
const Minifycss = require('gulp-minify-css') // 压缩css
const Less = require('gulp-less') // 编译less
const Autoprefixer = require('autoprefixer');
const Postcss = require('gulp-postcss');
// html
const MinifyHtml = require('gulp-htmlmin') // 压缩html
const FileInclude = require('gulp-file-include') // 文件模块化

const Clean = require('gulp-clean') // 清理目录

// md5 发版本的时候为了避免浏览器读取了旧的缓存文件，需要为其添加md5戳
const md5 = require('gulp-md5-plus')

const config = require('./config')
const { dist } = config
const root = 'src'

// assets
function assets () {
  return gulp.src(`${root}/assets/**`)
    .pipe(gulp.dest(dist + '/assets')) // 拷贝
}

// html
function html () {
  return gulp.src(`${root}/*.html`)
    .pipe(FileInclude({ // HTML模板替换，具体用法见下文
      prefix: '##',
      basepath: '@file'
    }))
    .pipe(MinifyHtml({ collapseWhitespace: true }))
    .on('error', function (err) {
      console.error('Task:copy-html,', err.message)
      this.end()
    })
    .pipe(gulp.dest(dist)) // 拷贝
}

// css
function css () {
  return gulp.src(`${root}/css/**`)
    .pipe(Less()) // 编译less
    .pipe(Postcss([Autoprefixer()]))
    .pipe(Minifycss({ // 压缩css
      // 类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
      advanced: true,
      // 保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
      compatibility: '',
      // 类型：Boolean 默认：false [是否保留换行]
      keepBreaks: false,
      // 保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
      keepSpecialComments: '*'
    }))
    .pipe(md5(6, dist + '/*.html'))
    .pipe(gulp.dest(dist + '/css')) // 当前对应css文件
}

// js
function js () {
  return gulp.src(`${root}/js/**`)
    .pipe(Babel())
    .pipe(Uglify()) // 压缩js

    .pipe(md5(6, dist + '/*.html'))
    .pipe(gulp.dest(dist + '/js')) // 拷贝
}

// image
function image () {
  return gulp.src(`${root}/images/**`)
    .pipe(md5(6, [dist + '/*.html', dist + '/css/**/*.css']))
    .pipe(gulp.dest(dist + '/images'))
}

// libs
function libs () {
  return gulp.src(`${root}/libs/**`)
    .pipe(gulp.dest(dist + '/libs'))
}

// clean dir
function clean () {
  // 不设置allowEmpty: true会报File not found with singular glob
  return gulp.src(dist, { allowEmpty: true }).pipe(Clean())
}

module.exports = gulp.series(clean, html, libs, js, css, image, assets)
