var path = new Map();
var commentDao = require("../dao/commentDao");
var timeUtil = require("../util/timeUtil");
var writeResult = require("../util/respUtil");
var url = require("url");
var captcha = require("svg-captcha");

function addComment(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.insertComment(parseInt(params.bid), parseInt(params.parent),params.parentName,params.content, params.userName, params.email, timeUtil.getNow(), function (result) {
        response.writeHead(200);
        response.write(writeResult("success", "评论成功", null));
        response.end();
    })

}
function queryRandomCode(request, response){
    var img = captcha.create({fontSize: 50, width: 100,height: 34})
    response.writeHead(200);
    response.write(writeResult("success", "评论成功", img));
    response.end();
}

function queryCommentsByBlogId(request, response){
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentsByBlogId(parseInt(params.bid), function (result) {
        response.writeHead(200);
        response.write(writeResult("success", "查询评论成功", result));
        response.end();
    })
}

function queryCommentsCountByBlogId(request, response){
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentsCountByBlogId(parseInt(params.bid), function (result) {
        response.writeHead(200);
        response.write(writeResult("success", "查询评论成功", result));
        response.end();
    })
}

function queryNewComments(request, response){
    var params = url.parse(request.url, true).query;
    commentDao.queryNewComments(5 , function (result) {
        response.writeHead(200);
        response.write(writeResult("success", "查询评论成功", result));
        response.end();
    })
}


path.set("/addComment", addComment);
path.set("/queryRandomCode", queryRandomCode);
path.set("/queryCommentsByBlogId", queryCommentsByBlogId);
path.set("/queryCommentsCountByBlogId", queryCommentsCountByBlogId);
path.set("/queryNewComments", queryNewComments);

module.exports.path = path