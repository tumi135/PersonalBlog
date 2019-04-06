var sendComment = new Vue({
    el: "#send_comments",
    data: {
        vcode: "",
        rightCode: ""
    },
    computed: {
        sendComment(){
            return function () {

                var code = document.getElementById("comment_code").value.toLowerCase();
                if(code != this.rightCode.toLowerCase()){
                    alert("验证码错误");
                    return;
                }
                console.log("aaa")
                var bid = -10;
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
                return year + '-' + month + '-' + date
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
                return year + '-' + month + '-' + date
            }
        },
        showComments(){
            return function () {
                var bid = -10;
                axios.get("/queryCommentsByBlogId?bid=" + bid).then( res=> {
                    console.log(res)
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