## Project Config

使用vue-cli3.0构建项目

https://cli.vuejs.org/zh/

安装 
```
npm install -g @vue/cli
```

配置
```
vue ui
```

## 目录

* [样式布局](./doc/style.md)
* [目录结构](#目录结构)
* [控件规范](#控件规范)
* [CodeSnippet](#CodeSnippet)


## 项目结构

```bash
─── ./
  └── _dist/                 # 编译出的结果文件.
  └── build/                 # 新建文件的模板.
  └── doc/                   # 项目文档
  └── ext/                   # 通过npm无法安装的第三方库.
  └── src/                   # 项目代码.
  └── config.dev.js          # 项目配置文件(dev环境).
  └── config.js              # 项目配置文件.
  └── index.html             # 页面模板.
```

## 控件规范

- 运行系统后查看 http://127.0.0.1:8082/dev/
- 系统样式在 src/components/style 中.
- 系统布局在 src/components/layout 中.
- ui组件在 src/components/ui 中.
- 组件引用路径别名: `@` 代表 `src` 目录; 样式文件的引用路径别名查看[样式路径](./doc/style.md#require)


## CodeSnippet

目录 `doc/snippets` 中的文件是`vscode`的code snippet配置文件; 可以快速加入版权信息等;

> 使用方法:

拷贝 xxx.json 文件内容到 vscode->设置->用户代码片段 中指定的语言snippet中