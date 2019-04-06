var dbutil = require("./dbutil");

function insertEveryDay(content, ctime, success) {
    var insertSql = "insert into every_day (`content`,`ctime`) values (?, ?);";
    var params = [content, ctime];

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

function queryEveryDay(success) {
    var querySql = "select * from every_day order by id desc limit 1;";
    var connection = dbutil.createConnection();
    connection.content;
    var params = [];
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

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;