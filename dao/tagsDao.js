var dbutil = require("./dbutil");

function insertTag(tag, ctime, success) {
    var insertSql = "insert into tags (`tag`,`ctime`) values (?, ?);";
    var params = [tag, ctime];

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

function queryTag(tag, success) {
    var querySql = "select * from tags where tag = ?;";
    var connection = dbutil.createConnection();
    connection.content;
    var params = [tag];
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

function queryRandomTags(success) {
    var querySql = "select * from tags;";
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

module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
module.exports.queryRandomTags = queryRandomTags;
