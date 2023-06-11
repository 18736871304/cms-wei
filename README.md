# 中策业务管理系统
一个简单的后台管理系统
作者：魏
这是一个基于Web的后台管理系统，用于管理网站的内容和用户信息。

# 安装
安装依赖：npm install
如果版本过高， 可在package.json 中修改， 添加 SET NODE_OPTIONS=--openssl-legacy-provider &&
  "scripts": {
    "serve": "SET NODE_OPTIONS=--openssl-legacy-provider &&  vue-cli-service serve",
    "build": "SET NODE_OPTIONS=--openssl-legacy-provider &&  vue-cli-service build",
    "test:unit": "vue-cli-service test:unit",
    "lint": "vue-cli-service lint"
  },
启动项目：npm start
# 使用方法
登录系统：在浏览器中输入http://localhost:8080，
