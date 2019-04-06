var path = new Map();
var tagsDao = require("../dao/tagsDao");
var tagBlogMappingDao = require("../dao/tagBlogMappingDao");
var blogDao = require("../dao/blogDao");
var timeUtil = require("../util/timeUtil");
var writeResult = require("../util/respUtil");
var url = require("url");

function queryRandomTags(request, response){
    tagsDao.queryRandomTags(function (result) {
        result.sort(function () {
            return Math.random() > 0.5 ? true : false;
        })
        response.writeHead(200);
        response.write(writeResult("success", "随机标签云", result));
        response.end();
    })
}

function queryBlogByTag(request, response) {
    var params = url.parse(request.url, true).query;
    tagsDao.queryTag(params.tag, function (result) {
        if(result == null || result.length == 0){
            response.writeHead(200);
            response.write(writeResult("success", "查询失败", null));
            response.end();
        }else {
            tagBlogMappingDao.queryBlogByTag(parseInt(result[0].id), parseInt (params.page), parseInt(params.pageSize), function (res) {
                var blogList = [];
                for(var i = 0; i < res.length; i ++){
                    blogDao.queryBlogById(res[i].blog_id, function (resp) {
                        resp[0].content = resp[0].content.replace(/<img[\w\W]*>/g, "");
                        resp[0].content = resp[0].content.replace(/<[\w\W]{1,5}>/g, "");
                        resp[0].content = resp[0].content.substring(0,300)

                        blogList.push(resp[0]);
                    })
                }
                getResult(blogList, res.length, response)
            })
        }
    })
}

function getResult(blogList, len, response) {
   if(blogList.length < len){
       setTimeout(function () {
           getResult(blogList, len, response);
       }, 10)
   } else {
       response.writeHead(200);
       response.write(writeResult("success", "成功", blogList));
       response.end();
   }
}

function queryBlogCountByTag(request, response){
    var params = url.parse(request.url, true).query;
    tagsDao.queryTag(params.tag, function (result) {
        if(result == null || result.length == 0){
            response.writeHead(200);
            response.write(writeResult("success", "查询失败", null));
            response.end();
        }else {
            tagBlogMappingDao.queryBlogCountByTag(parseInt(result[0].id), function (res) {
                response.writeHead(200);
                response.write(writeResult("success", "成功", res));
                response.end();
            })
        }
    })
}

path.set("/queryRandomTags", queryRandomTags);
path.set("/queryBlogByTag", queryBlogByTag);
path.set("/queryBlogCountByTag", queryBlogCountByTag);

module.exports.path = path