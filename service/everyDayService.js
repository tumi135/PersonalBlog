var everyDayDao = require("../dao/everyDayDao");

function insertEveryDay(content, ctime, success) {
    everyDayDao.insertEveryDay(content, ctime, success)
}
function queryEveryDay(success) {
    everyDayDao.queryEveryDay(success)
}

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;