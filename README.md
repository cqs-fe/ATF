## ATF自动化测试云平台

ATF 1.0: 基于 vue 1.0 + fis3

## 配置环境
> **注意**：请确保所安装的node版本为 `6.9.0`。

### 全局安装fis3
```
npm install -g fis3
```
### 全局安装依赖
```
npm install -g fis-parser-babel-6.x fis3-hook-commonjs fis3-postpackager-loader fis3-parser-node-sass node-sass
```
上面的几个包是必须的。可以依次安装，也可以像上面一样一次性安装完。

### 备选项
上面几个包有可能安装不上，请联系`柴青山`，让他把包拷给你，放到全局安装的`node_modules`下。

## run the project
### 开发
1. 开启服务, 默认使用`8080`端口。
```
fis3 server start
```
2. 开启实时监听
```
fis3 release -wl
```
### 构建打包
开发完成后打包项目到`output`文件夹下。打包时为了将`new-atf`中的打包文件包含进来，请遵循以下流程。
> **注意**： `new-atf`中的代码打包时需要`node`版本最低为`8.9.0`。考虑到部分同学没有安装`nvm`，所以我将`new-atf`中打包好的`build`文件夹纳入了`git`的管理。

1. 使用`fis3`打包`new-atf`外部代码。
```fis3 release -d output
```
2. 将`output`中的`public`、`assets`、`pages`以及`new-atf`中的`build`打包发给后台人员。

#### 简便流程
运行以下命令，`output`文件夹下将会有上述需要的几个文件夹。具体请参考`package.json`。
```
npm run build
```
