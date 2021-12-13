# mpa-template
基于`gulp`搭建的多页面应用模版，用于非框架应用快速开发，支持移动端和pc web创建。

## 使用
```
    npm run dev // 启动pc开发环境
    npm run dev:m // 启动移动端开发环境
    npm run build // pc端生产环境打包
    npm run build:m // 移动端生产环境打包
    npm run build:all // 打包pc端和移动端
    npm run minImg // 图片文件压缩
    npm run fix // js代码standard标准格式化
```
## 目录说明
```
build: gulp脚本
src: pc web源代码
srcMobile: 移动端源代码
dist: 打包后代码
mobile[dist/mobile]: 移动端打包后代码
src/include: 公共html代码，用于模块化
src/libs: 第三方依赖包
```
## 功能
- [x] 代码压缩/格式化
- [x] less
- [x] 图片压缩
- [x] 开发环境支持代理
- [x] html 模块化
- [x] build hash命名
- [x] 开发环境热更新
- [x] 开发环境防缓存
- [x] 移动端pxtovw

## FAQ
#### pc源代码和移动端源代码路径？
pc: `src` 移动端：`srcMobile`

#### 如何配置移动端输出路径？
修改`build/config.js`
```js
module.exports = {
  dist: './dist',
  mobileDist: './dist/mobile', // 移动端build后地址
}

```
#### 开发环境如何配置代理？
pc环境在`build/gulp.dec.js`，移动端在`build/mobile.gulp.dev.js`,在文件中找到如下配置：
```js
// 服务器函数
gulp.task('server', async () => {
  Connect.server({
    root: dist, // 根目录
    // ip:'192.168.11.62',//默认localhost:8080
    livereload: true, // 自动更新
    port: 8080, // 端口
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
```
#### 移动端开发如何配合pxtovw修改设计稿大小?
在`build/mobile.gulp.dev.js`,`build/mobile.gulp.prod.js`中找到如下配置：
```js
// css
function css () {
  return gulp.src(`${root}/css/**`)
    .pipe(Less()) // 编译less
    .pipe(Postcss([
      Autoprefixer(),
      Pxtoviewport({
        viewportWidth: 375, // 修改设计稿大小
        viewportUnit: 'vw'
      })
    ]))
    .pipe(gulp.dest(dist + '/css')) // 当前对应css文件
    .pipe(Connect.reload())// 更新
}
```
具体使用参考[postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md)文档

## 欢迎issue