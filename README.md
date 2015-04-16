generator-ppsite
=================

a scaffoloding tool for  built ppsite of generator-yeoman 

##<a name="code"/>如何使用
```javascript
npm install -g yo
```
```javascript
npm install -g generator-ppsite
```
```javascript
yo ppsite
```

##开发流程

###开发阶段

```javascript
gulp watch
```

-sass编译处理
-js不做压缩合并处理，能够快速定位到脚本错误
-images/sprite文件夹下添加侦听，自动生成雪碧图
-sass集成compass工具
-html可以分模块化管理

###发布阶段

```javascript
gulp build
```

-images/sprite 添加cache，重新生成雪碧图
-sass编译，打包、压缩、合并
-js，压缩、合并
-html 合并压缩
-html MD5 js、css版本


如果有建议可以跟我交流或者issue
### E-mail:328174271@qq.com

![](http://g.hiphotos.baidu.com/baike/w%3D268/sign=0a9f547136a85edffa8cf925715509d8/f9dcd100baa1cd11c4254f01bb12c8fcc2cec3fdfc030d43.jpg)
