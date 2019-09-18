# API 路由

## file

### 返回文件（包括图片）列表(json)

```
GET /files
```

### 文件（包括图片）名查询返回(json)

```
GET /files/:filename
```

### 上传文件（每次只能上传一个）

```
POST /post/file
```

### 文件（包括图片）删除

```
DELETE /files/:id
```

### 文件（包括图片）下载

```
POST /download/:filename
```

## image

### 返回图片文件流

```
GET /image/:filename
```

### 上传图片（每次可以多张上传）

```
POST /post/image
```

## link

### 返回链接列表(json)

```
GET /links/
```

### 上传

```
POST /post/link
```

### 链接删除

```
DELETE /links/:id
```

## note

### 返回笔记列表(json)

```
GET /notes/
```

### 上传

```
POST /post/note
```

### 笔记删除

```
DELETE /notes/:id
```

## user

### 登陆

```
GET /login

POST /login
```

### 注册

```
GET /register

POST /register
```
