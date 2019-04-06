var dbutil = require("./dbutil");

function insertTagBlogMapping(tagId, blogId, ctime, success) {
    var insertSql = "insert into tag_blog_mapping (`tag_id`,`blog_id`,`ctime`) values (?, ?, ?);";
    var params = [tagId, blogId, ctime];

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

function queryBlogByTag(tagId, page, pageSize, success) {
    var querySql = "select * from tag_blog_mapping where tag_id = ? limit ? , ?;";
    var connection = dbutil.createConnection();
    connection.content;
    var params = [tagId, page*pageSize, pageSize];
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

function queryBlogCountByTag(tagId, success) {
    var querySql = "select count(1) as count from tag_blog_mapping where tag_id = ?";
    var connection = dbutil.createConnection();
    connection.content;
    var params = [tagId];
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

module.exports.insertTagBlogMapping = insertTagBlogMapping;
module.exports.queryBlogByTag = queryBlogByTag;
module.exports.queryBlogCountByTag = queryBlogCountByTag;