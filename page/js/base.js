const delay = (function() {
    let timer = 0;
    return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

var searchBar = new Vue({
    el: "#search_bar",
    data: {
        searchValue: "",
        searchList: []
    },
    watch: {
        searchValue(){
            delay(() => {
                this.changValue();
            }, 300);
        }
    },
    methods: {
        stripscript(s)
        {
            var pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")        //格式 RegExp("[在中间定义特殊过滤字符]")
            var rs = "";
            for (var i = 0; i < s.length; i++) {
                rs = rs+s.substr(i, 1).replace(pattern, '');
            }
            return rs;
        },
        changValue (){

            var searchValue = this.stripscript(this.searchValue);
                axios.post("/querySearchList",{
                    keyWord: searchValue,
                    size: 5
                }).then(res => {
                    var myRes = res.data.data;
                    for(var i =0; i < myRes.length; i ++){
                        myRes[i].link = "/blog_detail.html?bid=" + myRes[i].id;
                    }
                    this.searchList = myRes;
                })

        },
        searchBlur (){
            setTimeout(function () {
                this.searchValue = '';
            },200)
        },
        clickButton (){
            location.href = "/index.html?blogList=" + this.searchValue + "&page=0&pageSize=5";
        }
    }
})

var randomTags = new Vue({
    el:"#random_tags",
    data: {
        tags: []
    },
    computed: {
        randomColor(){
            return function () {
                var red = Math.random()*255;
                var green = Math.random()*255;
                var blue = Math.random()*255;
                return "rgb("+ red +","+ green +","+ blue +")"
            }
        },
        randomSizs(){
            return function () {
                var size = Math.floor(Math.random()*10 + 12) + 'px';
                return size;
            }
        }
    },
    created(){
        axios.get("/queryRandomTags").then(res => {
            this.tags = res.data.data
        })
    }
})

var newHot = new Vue({
    el: "#new_hot",
    data: {
        hotList: []
    },
    created (){
        axios.get("/queryHotBlog").then(res => {
            var hotList = res.data.data;
            for(var i = 0; i < hotList.length; i ++){
                hotList[i].link = "/blog_detail.html?bid=" + hotList[i].id;
            }
            this.hotList = hotList
        })
    }
})

var newComments = new Vue({
    el: "#new_comments",
    data: {
        commentList: []
    },
    computed: {
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
    created (){
        axios.get("/queryNewComments").then(res => {
            var commentList = res.data.data;
            for(var i = 0; i < commentList.length; i ++){
                commentList[i].date = this.transformTime(commentList[i].ctime)
                if(commentList[i].blog_id > 0){
                    commentList[i].link = "/blog_detail.html?bid=" + commentList[i].blog_id
                } else if(commentList[i].blog_id == -20){
                    commentList[i].link = "/guestbook.html"
                }else if(commentList[i].blog_id == -10){
                    commentList[i].link = "/about.html"
                }
            }
            this.commentList = commentList
        })
    }
})
