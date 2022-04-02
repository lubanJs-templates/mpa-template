# mpa-template
基于`gulp`搭建的多页面应用模版，用于非框架应用快速开发，使用tailwind。

## 使用
```
    npm run dev // 启动pc开发环境
    npm run build // pc端生产环境打包
    npm run minImg // 图片文件压缩
    npm run fix // js代码standard标准格式化
```
## 目录说明
```
build: gulp脚本
src: 源代码
dist: 打包后代码
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

## FAQ

#### 如何配置移动端输出路径？
修改`build/config.js`
```js
module.exports = {
  dist: './dist',
}

```
#### 开发环境如何配置代理？
在`build/gulp.dec.js`,在文件中找到如下配置：
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

## 欢迎issue