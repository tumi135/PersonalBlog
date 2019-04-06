var path = new Map();
var blogDao = require("../dao/blogDao");
var tagsDao = require("../dao/tagsDao");
var tagBlogMappingDao = require("../dao/tagBlogMappingDao");
var timeUtil = require("../util/timeUtil");
var writeResult = require("../util/respUtil");
var url = require("url");

function queryBlogById(request, response) {
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogById(parseInt(params.bid), function (result) {
        response.writeHead(200);
        response.write(writeResult("success", "添加成功", result));
        response.end();
        blogDao.addViews(parseInt(params.bid), function (result) {
        })
    })

}

function editBlog(request, response) {
    request.on("data",function (data) {

        var params = url.parse(request.url, true).query;
        var tags = params.tags.replace(/ /g, "").replace(/，/g, ",");
        blogDao.insertBlog(params.title,data.toString().trim(), 0, tags, timeUtil.getNow(), function (result) {
            response.writeHead(200);
            response.write(writeResult("success", "添加成功", null));
            response.end();
            var blogId = result.insertId;
            var tagList = tags.split(",");
            for(var i =0 ; i < tagList.length; i ++){
                if(tagList[i] == ""){
                    continue
                }else {
                    queryTag(tagList[i], blogId)
                }
            }
        } )
    })
}

function queryTag(tag, blogId){
    tagsDao.queryTag(tag, function (result) {
        if(result == null || result.length == 0){
            insertTag(tag, blogId)
        }else {
            tagBlogMappingDao.insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), function (result) {

            })
        }
    })
}

function insertTag(tag, blogId){
    tagsDao.insertTag(tag, timeUtil.getNow(), function (result) {
        insertTagBlogMapping(result.insertId,blogId)
    })
}

function insertTagBlogMapping(tagId,blogId){
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), function (result) {
        
    })
}

function queryBlogByPage(request, response) {
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize),function (result) {
        for(var i = 0; i < result.length; i ++){
            result[i].content = result[i].content.replace(/<img[\w\W]*>/g, "");
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, "");
            result[i].content = result[i].content.substring(0,300)
        }
        response.writeHead(200);
        response.write(writeResult("success", "添加成功", result));
        response.end();
    })
}

function queryBlogCount(request, response){
    blogDao.queryBlogByCount(function (result) {
        response.writeHead(200);
        response.write(writeResult("success", "添加成功", result));
        response.end();
    })
}


function queryAllBlog(request, response){
    blogDao.queryAllBlog(function (result) {
        response.writeHead(200);
        response.write(writeResult("success", "添加成功", result));
        response.end();
    })
}


function queryHotBlog(request, response) {
    var params = url.parse(request.url, true).query;
    blogDao.queryHotBlog(5, function (result) {
        response.writeHead(200);
        response.write(writeResult("success", "添加成功", result));
        response.end();
    })
}

function querySearchList(request, response){
    request.on("data",function (data) {
        var value = JSON.parse(data);
        blogDao.querySearchList("%" + value.keyWord + "%", value.size, function (result) {
            response.writeHead(200);
            response.write(writeResult("success", "查询成功", result));
            response.end();
        })
    })
}

function queryBlogByblogList(request, response){
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogByblogList("%" + params.blogList + "%", parseInt(params.page), parseInt(params.pageSize),function (result) {
        for(var i = 0; i < result.length; i ++){
            result[i].content = result[i].content.replace(/<img[\w\W]*>/g, "");
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, "");
            result[i].content = result[i].content.substring(0,300)
        }
        response.writeHead(200);
        response.write(writeResult("success", "添加成功", result));
        response.end();
    })
}

function queryBlogCountByblogList(request, response){
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogCountByblogList("%" + params.blogList + "%", function (result) {
        response.writeHead(200);
        response.write(writeResult("success", "添加成功", result));
        response.end();
    })
}

path.set("/editBlog", editBlog);
path.set("/queryBlogByPage", queryBlogByPage);
path.set("/queryBlogCount", queryBlogCount);
path.set("/queryBlogById", queryBlogById);
path.set("/queryAllBlog", queryAllBlog);
path.set("/queryHotBlog", queryHotBlog);
path.set("/querySearchList", querySearchList);
path.set("/queryBlogByblogList", queryBlogByblogList);
path.set("/queryBlogCountByblogList", queryBlogCountByblogList);


module.exports.path = path