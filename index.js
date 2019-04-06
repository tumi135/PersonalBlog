var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader");
var cookie = require("cookie-parser");
// var loginDao = require("./dao/loginDao");
var loginFilter = require("./filter/loginFilter");

var app = new express();
app.use(cookie());

app.use(function (request,response,next) {
    var url = request.originalUrl
    if(url.indexOf("edit") > 0){
        if(request.cookies.id){
            loginFilter.queryCookie(request.cookies.id, function (result) {
                    if(result.length > 0){
                        return next()
                    }else {
                        return response.redirect("/login.html")
                    }
            })
        }else {
            return response.redirect("/login.html")
        }
    }else {
        next()
    }
})

app.use(express.static("./page/"));

app.post("/editEveryDay",loader.get("/editEveryDay"))
app.get("/queryEveryDay",loader.get("/queryEveryDay"))
app.post("/editBlog",loader.get("/editBlog"));
app.get("/queryBlogByPage",loader.get("/queryBlogByPage"));
app.get("/queryBlogCount",loader.get("/queryBlogCount"));
app.get("/queryBlogById",loader.get("/queryBlogById"));
app.get("/addComment",loader.get("/addComment"));
app.get("/queryRandomCode",loader.get("/queryRandomCode"));
app.get("/queryCommentsByBlogId",loader.get("/queryCommentsByBlogId"));
app.get("/queryCommentsCountByBlogId",loader.get("/queryCommentsCountByBlogId"));
app.get("/queryAllBlog",loader.get("/queryAllBlog"));
app.get("/queryRandomTags",loader.get("/queryRandomTags"));
app.get("/queryHotBlog",loader.get("/queryHotBlog"));
app.get("/queryNewComments",loader.get("/queryNewComments"));
app.get("/queryBlogByTag",loader.get("/queryBlogByTag"));
app.get("/queryBlogCountByTag",loader.get("/queryBlogCountByTag"));
app.post("/querySearchList",loader.get("/querySearchList"));
app.get("/queryBlogByblogList",loader.get("/queryBlogByblogList"));
app.get("/queryBlogCountByblogList",loader.get("/queryBlogCountByblogList"));
app.post("/login",loader.get("/login"));


app.listen(globalConfig["port"],function () {
    console.log("服务器已启动")
})


