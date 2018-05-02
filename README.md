# 基于React + Webpack + Babel的项目脚手架🔥🔥🔥

> 这个脚手架工程模板用于快速启动基于 React + Webpack 为技术栈的前端项目

[![GitHub issues](https://img.shields.io/github/issues/zzlw/webpack-dev-super.svg)](https://github.com/zzlw/webpack-dev-super/issues)
[![GitHub forks](https://img.shields.io/github/forks/zzlw/webpack-dev-super.svg)](https://github.com/zzlw/webpack-dev-super/network)
[![GitHub stars](https://img.shields.io/github/stars/zzlw/webpack-dev-super.svg)](https://github.com/zzlw/webpack-dev-super/stargazers)
[![GitHub license](https://img.shields.io/github/license/zzlw/webpack-dev-super.svg)](https://github.com/zzlw/webpack-dev-super/blob/master/LICENSE)


## Features 功能特性

- 可以解析 JSX 语法
- 可以解析 ES6 语法新特性
- 支持 LESS 预处理器
- 支持 SASS 预处理器
- 编译完成自动打开浏览器
- 区分开发环境和生产环境
- 实现组件级热更新
- 实现代码的热替换，浏览器实时刷新查看效果
- 实现代码按需加载
- 分离业务功能代码和公共依赖代码
- 单独分离 CSS 样式文件
- 支持编译 HTML 模板
- 支持文件 MD5 戳，解决文件缓存问题
- 支持图片、图标字体等资源的编译
- 支持浏览器源码调试
- 可以进行代码规则校验
- 支持 mocha 测试用例运行
- 支持一行命令产出待部署资源

## 1. start

```
$ git clone https://github.com/zzlw/webpack-dev-super
$ cd webpack-dev-super
$ npm install
```
## 2. dev
### 2.1 开发调试
```
//首先运行dll预打包
$ npm run start:pre
//打包完成，启动项目
$ npm start
```

查看效果` http://127.0.0.1:9090`

### 2.2 代码检查
```
$ npm run lint
```

### 2.3 测试用例
```
$ npm run test:watch
```

### 2.4 产出资源
```
$ npm run build
```

## 3. 技术栈

- [x] [Webpack](https://webpack.github.io)
- [x] [React](https://facebook.github.io/react/)
- [x] [ES6](http://es6.ruanyifeng.com/)
- [x] [Redux](https://github.com/rackt/redux)
- [x] [React-router](https://github.com/rackt/react-router-redux)
- [x] [Babel](https://babeljs.io/)
- [ ] [immutable](https://www.npmjs.com/package/immutable)
- [ ] [redux-immutable](https://www.npmjs.com/package/immutable)
- [ ] [react-immutable-proptypes](https://www.npmjs.com/package/immutable)
- [ ] [react-router-redux](https://www.npmjs.com/package/immutable)
- [ ] [Autoprefixer](https://github.com/postcss/autoprefixer)
- [ ] [PostCSS](https://github.com/postcss/postcss)
- [x] [CSS modules](https://github.com/outpunk/postcss-modules)
- [x] [Less](https://github.com/less/less.js)
- [x] [Sass](https://github.com/sass/node-sass)
- [x] [Eslint](https://github.com/eslint/eslint)

