// import axios from "axios";
var everyDay = new Vue({
    el: "#every_day",
    data: {
        content: "失败乃成功之母~"
    },
    computed: {
        getContent(){
            return this.content;
        }
    },
    created(){
        axios.get("/queryEveryDay").then(res => {
            // var result = JSON.parse(res);
            this.content = res.data.data[0].content;
        })
    }
})

var articleList = new Vue({
    el: "#article_list",
    data: {
        page: 1,
        pageSize: 5,
        count: null,
        pageNumList: [],
        articleList: []
    },
    computed: {
        jumpTo(){
            return function (page) {
                this.getPage(page, this.pageSize)
            }
        },
        getPage (){
            return function (page, pageSize) {
                var searchParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                    var tag = '';
                    var blogList = '';
                for( i = 0; i < searchParams.length; i ++){
                    if(searchParams[i].split("=")[0] == "tag"){
                        try {
                            tag = searchParams[i].split("=")[1];
                        }catch (e) {
                            console.log(e)
                        }
                    }
                    if(searchParams[i].split("=")[0] == "blogList"){
                        try {
                            blogList = searchParams[i].split("=")[1];
                        }catch (e) {
                            console.log(e)
                        }
                    }
                }

                if(tag == '' && blogList == ''){
                    axios.get("/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize).then(res => {
                        var result = res.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i ++){
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.tags = result[i].tags
                            temp.date = result[i].ctime
                            temp.views = result[i].views
                            temp.id = result[i].id
                            temp.link = "/blog_detail.html?bid=" + result[i].id
                            list.push(temp)
                        }
                        this.articleList = list;
                        this.page = page;
                    }).catch(function (error) {
                        console.log("请求错误！")
                    })

                    axios.get("/queryBlogCount").then(resp =>{
                        this.count = resp.data.data[0].count;
                        this.generatePageTool;
                    })
                } else if(blogList && tag == ''){
                    console.log("blogList")
                    axios.get("/queryBlogByblogList?blogList=" + blogList +"&page=" + (page - 1) + "&pageSize=" + pageSize).then(res => {
                        var result = res.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i ++){
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.tags = result[i].tags
                            temp.date = result[i].ctime
                            temp.views = result[i].views
                            temp.id = result[i].id
                            temp.link = "/blog_detail.html?bid=" + result[i].id
                            list.push(temp)
                        }
                        this.articleList = list;
                        this.page = page;
                    }).catch(function (error) {
                        console.log("请求错误！")
                    })

                    axios.get("/queryBlogCountByblogList?blogList=" + blogList).then(resp =>{
                        this.count = resp.data.data[0].count;
                        console.log(this.count)
                        this.generatePageTool;
                    })
                }else {
                    //根据标签查询
                    axios.get("/queryBlogByTag?tag=" + tag +"&page=" + (page - 1) + "&pageSize=" + pageSize).then(res => {
                        var result = res.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i ++){
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.tags = result[i].tags
                            temp.date = result[i].ctime
                            temp.views = result[i].views
                            temp.id = result[i].id
                            temp.link = "/blog_detail.html?bid=" + result[i].id
                            list.push(temp)
                        }
                        this.articleList = list;
                        this.page = page;
                    }).catch(function (error) {
                        console.log("请求错误！")
                    })

                    axios.get("/queryBlogCountByTag?tag=" + tag).then(resp =>{
                        this.count = resp.data.data[0].count;
                        console.log(resp.data.data[0].count)
                        this.generatePageTool;
                    })
                }
            }
        },
        generatePageTool(){
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({text:"<<", page: 1});
            if(nowPage > 2){
                result.push({text:nowPage - 2, page: nowPage - 2});
            }
            if(nowPage > 1){
                result.push({text:nowPage - 1, page: nowPage - 1});
            }
            result.push({text:nowPage, page: nowPage});
            if(nowPage + 1 <= (totalCount + pageSize - 1) / pageSize){
                result.push({text:nowPage + 1, page: nowPage +1});
            }
            if(nowPage + 2 <= (totalCount + pageSize - 1) / pageSize){
                result.push({text:nowPage + 2, page: nowPage +2});
            }
            result.push({text:">>", page: parseInt((totalCount + pageSize - 1) / pageSize)});

            this.pageNumList = result;
            return result
        }
    },
    created(){
        this.getPage(this.page, this.pageSize)
    }

})