var dbutil = require("./dbutil");

function q(content, ctime, success) {
    var insertSql = "insert into user_list (`user_name`,`psw`) values (?, md5(?));";
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
// q("tumi123", "zxcvbnm123",function (result) {
//     console.log(result)
// })

function insertCookie(value, success) {
    var insertSql = "insert into cookies_list (`value`) values (?);";
    var params = [value];

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

function queryCookie(value, success) {
    var querySql = "select * from cookies_list where value = ?;";
    var connection = dbutil.createConnection();
    connection.content;
    var params = [value];
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

function login(user, password, success) {
    var querySql = "select * from user_list where user_name = ? and psw = md5(?);";
    var connection = dbutil.createConnection();
    connection.content;
    var params = [user, password];
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

function queryCookierUserMapping(userId, cookieId){
    var querySql = "select * from cookie_user_mapping where user_id = ?, cookie_id = ?;";
    var connection = dbutil.createConnection();
    connection.content;
    var params = [userId, cookieId];
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

function insertCookierUserMapping(cookieId, userId, success) {
    var insertSql = "insert into cookie_user_mapping (`cookie_id`,`user_id`) values (?, ?);";
    var params = [cookieId, userId];

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

module.exports.queryCookie = queryCookie;
module.exports.insertCookie = insertCookie;
module.exports.login = login;
module.exports.queryCookierUserMapping = queryCookierUserMapping;
module.exports.insertCookierUserMapping = insertCookierUserMapping;