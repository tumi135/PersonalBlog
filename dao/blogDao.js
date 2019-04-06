var dbutil = require("./dbutil");

function insertBlog(title, content, views, tags, ctime, success) {
    var insertSql = "insert into blog (`title`,`content`,`views`,`tags`,`ctime`) values (?, ?, ?, ?, ?);";
    var params = [title, content, views, tags, ctime];

    var connection = dbutil.createConnection();
    connection.content;
    connection.query(insertSql, params, function (error, result) {
        if(error == null){
            success(result)
        }else {
            console.log("===")
            console.log(error)
            console.log("===")
        }
    })
    connection.end()
}

function queryBlogByPage(page, pageSize, success) {
    var insertSql = "select * from blog order by id desc limit ?, ? ";
    var params = [page * pageSize, pageSize];
    var connection = dbutil.createConnection();
    connection.content;
    connection.query(insertSql, params, function (error, result) {
        if(error == null){
            success(result)
        }else {
            console.log("===")
            console.log(error)
            console.log("===")
        }
    })
    connection.end()
}
function queryBlogByCount(success) {
    var querySql = "select count(1) as count from blog;";
    var params = [];
    var connection = dbutil.createConnection();
    connection.content;
    connection.query(querySql, params, function (error, result) {
        if(error == null){
            success(result)
        }else {
            console.log("===")
            console.log(error)
            console.log("===")
        }
    })
    connection.end()
}

function queryBlogById(bid, success) {
    var querySql = "select * from blog where id = ?;";
    var params = [bid];
    var connection = dbutil.createConnection();
    connection.content;
    connection.query(querySql, params, function (error, result) {
        if(error == null){
            success(result)
        }else {
            console.log("===")
            console.log(error)
            console.log("===")
        }
    })
    connection.end()
}

function queryAllBlog(success) {
    var querySql = "select * from blog;";
    var params = [];
    var connection = dbutil.createConnection();
    connection.content;
    connection.query(querySql, params, function (error, result) {
        if(error == null){
            success(result)
        }else {
            console.log("===")
            console.log(error)
            console.log("===")
        }
    })
    connection.end()
}


function addViews(id, success) {
    var querySql = "update blog set views = views + 1 where id = ?;";
    var params = [id];
    var connection = dbutil.createConnection();
    connection.content;
    connection.query(querySql, params, function (error, result) {
        if(error == null){
            success(result)
        }else {
            console.log("===")
            console.log(error)
            console.log("===")
        }
    })
    connection.end()
}

function queryHotBlog(size, success) {
    var querySql = "select * from blog order by views desc limit ?;";
    var params = [size];
    var connection = dbutil.createConnection();
    connection.content;
    connection.query(querySql, params, function (error, result) {
        if(error == null){
            success(result)
        }else {
            console.log("===")
            console.log(error)
            console.log("===")
        }
    })
    connection.end()
}

function querySearchList(value,size, success) {
    var querySql = "select title, id from blog where title like ? limit ?;";
    var params = [value,size];
    var connection = dbutil.createConnection();
    connection.content;
    connection.query(querySql, params, function (error, result) {
        if(error == null){
            success(result)
        }else {
            console.log("===")
            console.log(error)
            console.log("===")
        }
    })
    connection.end()
}

function queryBlogByblogList(value, page, pageSize, success) {
    var querySql = "select * from blog where title like ? limit ?, ?;";
    var params = [value, page * pageSize, pageSize];
    var connection = dbutil.createConnection();
    connection.content;
    connection.query(querySql, params, function (error, result) {
        if(error == null){
            success(result)
        }else {
            console.log("===")
            console.log(error)
            console.log("===")
        }
    })
    connection.end()
}

function queryBlogCountByblogList(value, success) {
    var querySql = "select count(1) as count from blog where title like ?;";
    var params = [value];
    var connection = dbutil.createConnection();
    connection.content;
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result)
        } else {
            console.log("===")
            console.log(error)
            console.log("===")
        }
    })
    connection.end()
}



module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogByCount = queryBlogByCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
module.exports.addViews = addViews;
module.exports.queryHotBlog = queryHotBlog;
module.exports.querySearchList = querySearchList;
module.exports.queryBlogByblogList = queryBlogByblogList;
module.exports.queryBlogCountByblogList = queryBlogCountByblogList;
