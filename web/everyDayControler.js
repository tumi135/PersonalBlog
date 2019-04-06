var path = new Map();
var everyDayService = require("../service/everyDayService");
var timeUtil = require("../util/timeUtil");
var writeResult = require("../util/respUtil");

function editEveryDay(request, response) {
    request.on("data",function (data) {
        everyDayService.insertEveryDay(data.toString().trim(),timeUtil.getNow(), function (result) {
            response.writeHead(200);
            response.write(writeResult("success", "添加成功", null));
            response.end();
        } )
    })
}

function queryEveryDay(request, response) {
    everyDayService.queryEveryDay(function (result) {
        response.writeHead(200);
        response.write(writeResult("success", "添加成功", result));
        response.end();
    })
}

path.set("/editEveryDay", editEveryDay);
path.set("/queryEveryDay", queryEveryDay);

module.exports.path = path