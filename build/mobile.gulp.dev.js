const gulp = require('gulp')
// js
const Jshint = require('gulp-jshint') // js检查
const Gutil = require('gulp-util')
const Proxy = require('http-proxy-middleware')

// css
const Less = require('gulp-less') // 编译less
const Autoprefixer = require('autoprefixer');
const Postcss = require('gulp-postcss');
const Pxtoviewport = require('postcss-px-to-viewport');
// html
const FileInclude = require('gulp-file-include') // 文件模块化

// server
const Connect = require('gulp-connect') // 引入gulp-connect模块
const Cache = require('gulp-cache');

// 配置文件
const config = require('./config')
const { mobileDist: dist } = config
const root = 'srcMobile'
// assets
function assets () {
  return gulp.src(`${root}/assets/**`)
    .pipe(gulp.dest(dist + '/assets')) // 拷贝
    .pipe(Connect.reload())
}

// html
function html () {
  return gulp.src(`${root}/*.html`)
    .pipe(FileInclude({ // HTML模板替换，具体用法见下文
      prefix: '##',
      basepath: '@file'
    })).on('error', function (err) {
      console.error('Task:copy-html,', err.message)
      this.end()
    })
    .pipe(gulp.dest(dist)) // 拷贝
    .pipe(Connect.reload())
}

// css
function css () {
  return gulp.src(`${root}/css/**`)
    .pipe(Less()) // 编译less
    .pipe(Postcss([
      Autoprefixer(),
      Pxtoviewport({
        viewportWidth: 375,
        viewportUnit: 'vw'
      })
    ]))
    .pipe(gulp.dest(dist + '/css')) // 当前对应css文件
    .pipe(Connect.reload())// 更新
}

// js

function js () {
  return gulp.src(`${root}/js/**`)
    .pipe(Jshint())// 检查代码
    .on('error', function (err) {
      Gutil.log(Gutil.colors.red('[Error]'), err.toString())
    })
    .pipe(gulp.dest(dist + '/js')) // 拷贝
    .pipe(Connect.reload()) // 更新
}

// image
function image () {
  return gulp.src(`${root}/images/**`)
    .pipe(gulp.dest(dist + '/images'))
}

// libs
function libs () {
  return gulp.src(`${root}/libs/**`)
    .pipe(gulp.dest(dist + '/libs'))
}

// watch
// watch


gulp.task('watch', async () => {
  gulp.watch(`${root}/*.html`, gulp.series('clear', html)) // 监听HTML变化
  gulp.watch(`${root}/js/**`, gulp.series('clear', js)) // 监听js变化
  gulp.watch(`${root}/css/**`, gulp.series('clear', css)) // 监听css变化
  gulp.watch(`${root}/images/**`, gulp.series('clear', image)) // 监听image变化
  gulp.watch(`${root}/libs/**`, gulp.series('clear', libs)) // 监听libs变化
  gulp.watch(`${root}/assets/**`, gulp.series('clear', assets)) // 监听assets变化

})

gulp.task('clear', function (done) {
  return Cache.clearAll(done);
});


// 服务器函数
gulp.task('server', async () => {
  Connect.server({
    root: dist, // 根目录
    // ip:'192.168.11.62',//默认localhost:8080
    livereload: true, // 自动更新
    port: 8081, // 端口
    middleware: function (connect, opt) {
      return [
        // Proxy('/api', {
        //   target: 'http://localhost:8080',
        //   changeOrigin: true
        // })
      ]
    }
  })
})

module.exports = gulp.series('clear', html, libs, js, css, image, assets, 'server', 'watch')
