const gulp = require('gulp')
const imagemin = require('gulp-imagemin');

// 根据环境引入不同的配置文件
let build
if (process.env.NODE_ENV === 'dev') {
  build = require('./build/gulp.dev')
  gulp.task('dev', build)

} else {
  build = require('./build/gulp.prod')
  gulp.task('build', build)
}

gulp.task('imageMin', () => {
  return gulp.src('src/images/**')
    .pipe(imagemin())
    .pipe(gulp.dest('src/images'))
})
gulp.task('mobileImageMin', () => {
  return gulp.src('srcMobile/images/**')
    .pipe(imagemin())
    .pipe(gulp.dest('srcMobile/images'))
})

gulp.task('minImg', gulp.series('imageMin', 'mobileImageMin'))