# Collection App

## 快速开始

```
创建.env文件，写入：

DB_CONNECT=你的MongoDB数据库地址
```

```
进入 client目录：

npm run build

将build好的dist文件夹复制到server/public下
```

```bash
npm install

npm start
```

[client](https://github.com/clutchJoe/collectionApp-client)

## 说明

这是一个前后端分离项目。

后端用 node 以及 express 搭建路由，创建 API；使用 express 中间件 multer 进行文件上传；使用 mongoose 作为 MongoDB 的 node 客户端读取、储存信息。

前端使用 Vue 并且配合 Vuex 进行构建，同时使用 Bootstrap 作为 CSS 框架，实现页面响应。

由于目前本项目仅作为个人使用，简单地使用 passport 实现了一下注册、登陆认证功能。

[快照](https://github.com/clutchJoe/fullstack-collectionApp/tree/master/prev)

## 路由 API

[API]()

## 用到的一些第三方包

[multer-gridfs-storage](https://github.com/devconcept/multer-gridfs-storage)：初始化 multer storage，以及对文件名重新随机命名，避免同名

[gridfs-stream](https://github.com/aheckmann/gridfs-stream)：将文件流写入数据库、同时能实现查找、删除文件

[axios](https://github.com/axios/axios)：前端使用 axios 进行 HTTP 请求，主要获取 API

## 参考

[node_passport_login](https://github.com/bradtraversy/node_passport_login)

[Nodejs-Passport-Login](https://github.com/WebDevSimplified/Nodejs-Passport-Login)

[mongo_file_uploads](https://github.com/bradtraversy/mongo_file_uploads)

## Todo

-   [x] 文件上传、删除
-   [x] 笔记上传、删除
-   [x] 注册、登陆
-   [x] 图片上传、删除
-   [x] 链接上传、删除
-   [x] 文件、图片下载
-   [ ] 增加 Edit 功能
-   [ ] 完善前端构建和注册、登陆功能
