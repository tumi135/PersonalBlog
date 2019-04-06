var loginDao = require("../dao/loginDao");
// var timeUtil = require("../util/timeUtil");
// var writeResult = require("../util/respUtil");

function queryCookie(value, callback) {
        loginDao.queryCookie(value, function (result) {
            callback(result)
        })
}




module.exports.queryCookie = queryCookie