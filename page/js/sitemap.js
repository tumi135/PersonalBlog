var mapBlogList = new Vue({
    el: "#map_blog-list",
    data: {
        blogList: []
    },
    created(){
        axios.get("/queryAllBlog").then(res => {
            var blogList = res.data.data;
            for(var i = 0; i < blogList.length; i++){
                blogList[i].link = "blog_detail.html?bid=" + blogList[i].id;
            }
            this.blogList = blogList;
        })
    }
})