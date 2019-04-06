var sendComment = new Vue({
    el: "#send_comments",
    data: {
        vcode: "",
        rightCode: ""
    },
    computed: {
        sendComment(){
            return function () {
                var code = document.getElementById("comment_code").value;
                if(code != this.rightCode){
                    alert("验证码错误");
                    return;
                }
                var searchParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                if(searchParams == ""){
                    return;
                }
                var bid = -1;
                for( i = 0; i < searchParams.length; i ++){
                    if(searchParams[i].split("=")[0] == "bid"){
                        try {
                            bid = parseInt(searchParams[i].split("=")[1]);
                        }catch (e) {
                            console.log(e)
                        }
                    }
                }
                var reply = document.getElementById("comment_reply").value;
                var replyName = document.getElementById("comment_reply_name").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value;
                axios({
                    method: "get",
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&parentName=" + replyName + "&userName=" + name + "&email=" + email + "&content=" + content,
                }).then(res=>{
                    alert(res.data.msg)
                    location.reload()
                })
            }
        },
        changeCode (){
            return function () {
                axios.get("/queryRandomCode").then(res => {
                    this.vcode = res.data.data.data
                    this.rightCode = res.data.data.text
                })
            }
        },
        transformTime(){
            return function (ctime) {
                var time = new Date(parseInt(ctime*1000));

                var year = time.getFullYear();
                var month = time.getMonth() + 1;
                var date = time.getDate();
                var hour = time.getHours() > 10? time.getHours() : '0' + time.getHours();
                var minutes = time.getMinutes() > 10? time.getMinutes() : '0' + time.getMinutes();
                return year + '-' + month + '-' + date + ' ' + hour + ":" + minutes;
            }
        }
    },
    created(){
        this.changeCode();
    }
})

var blogComments = new Vue({
    el: "#blog_comments",
    data: {
        count: 0,
        comments: []
    },
    computed: {
        reply(){
            return function (commentId, userName) {
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                location.href = "#send_comments"
            }
        },
        transformTime(){
            return function (ctime) {
                var time = new Date(parseInt(ctime*1000));

                var year = time.getFullYear();
                var month = time.getMonth() + 1;
                var date = time.getDate();
                var hour = time.getHours() > 10? time.getHours() : '0' + time.getHours();
                var minutes = time.getMinutes() > 10? time.getMinutes() : '0' + time.getMinutes();
                return year + '-' + month + '-' + date + ' ' + hour + ":" + minutes;
            }
        },
        showComments(){
            return function () {
                var searchParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                if(searchParams == ""){
                    return;
                }
                var bid = -1;
                for( i = 0; i < searchParams.length; i ++){
                    if(searchParams[i].split("=")[0] == "bid"){
                        try {
                            bid = parseInt(searchParams[i].split("=")[1]);
                        }catch (e) {
                            console.log(e)
                        }
                    }
                }
                axios.get("/queryCommentsByBlogId?bid=" + bid).then( res=> {
                    var myComments = res.data.data
                    for (var i = 0; i < myComments.length; i++){
                        if(myComments[i].parent > -1){
                            myComments[i].options = "回复@" + myComments[i].parent_name;
                        }
                    }
                    this.comments = myComments;
                })
                axios.get("/queryCommentsCountByBlogId?bid=" + bid).then( res=> {
                    this.count = res.data.data[0].count
                })
            }
        }
    },
    created (){
        this.showComments();
    }
})