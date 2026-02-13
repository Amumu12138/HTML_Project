### koa2框架目录
```
manage-server    
    --app.js #根入口
    --package-lock.json #依赖版本锁定文件
    --packge.json #项目依赖包文件
    --bin
        --www #运行启动文件
    --public #公共资源
        --images #图片资源
        --javascripts #js文件目录
        --stylesheets #样式文件目录
            --style.css
    --routes
        --index.js #定义了localhost:3000之下的路由
        --users.js #定义了localhost:3000/users之下的路由
    --views #视图pug是一款HTML模版引擎,专门为nodesjs平台开发
```