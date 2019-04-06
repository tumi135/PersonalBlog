var path = new Map();
var loginDao = require("../dao/loginDao");
var timeUtil = require("../util/timeUtil");
var writeResult = require("../util/respUtil");

function login(request, response) {
    request.on("data",function (data) {
        data = JSON.parse(data)
        loginDao.login(data.user, data.password, function (result) {
            if(result.length == 1){
                console.log(result)
                var cookieValue = parseInt(Date.now() / 1000) + 'cookie';
                response.cookie('id', cookieValue, { expires: new Date(Date.now() + 9000000), httpOnly: true });
                loginDao.insertCookie(cookieValue, function (res) {
                    loginDao.insertCookierUserMapping(result[0].id, res.insertId, function (resp) {
                        response.writeHead(200);
                        response.write(writeResult("success", "登录成功", null));
                        response.end();
                    })
                })
            }else {
                response.writeHead(200);
                response.write(writeResult("fail", "用户名或密码错误", null));
                response.end();
            }

        } )
    })
}



// path.set("/queryCookie", queryCookie);
path.set("/login", login);

module.exports.path = path