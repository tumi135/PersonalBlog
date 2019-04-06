var dbutil = require("./dbutil");

function insertComment(blogId, parent,parentName, comments, userName, email, ctime, success) {
    var insertSql = "insert into comments (`blog_id`,`parent`,`parent_name`,`comments`,`user_name`,`email`,`ctime`) values (?, ?, ?, ?, ?, ?,?);";
    var params = [blogId, parent,parentName, comments, userName, email, ctime];

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

function queryCommentsByBlogId(blogId, success){
    var querySql = "select * from comments where blog_id = ?;";
    var params = [blogId];

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

function queryCommentsCountByBlogId(blogId, success){
    var querySql = "select count(1) as count from comments where blog_id = ?;";
    var params = [blogId];

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

function queryNewComments(size, success){
    var querySql = "select * from comments order by ctime desc limit ?;";
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

module.exports.insertComment = insertComment;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId;
module.exports.queryCommentsCountByBlogId = queryCommentsCountByBlogId;
module.exports.queryNewComments = queryNewComments;