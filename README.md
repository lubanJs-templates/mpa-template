# mpa-template
基于`gulp`搭建的多页面应用模版，用于非框架应用快速开发，支持移动端和pc web创建。

## 使用
```
    npm run dev // 启动pc开发环境
    npm run dev:m // 启动移动端开发环境
    npm run build // pc端生产环境打包
    npm run build:m // 移动端生产环境打包
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