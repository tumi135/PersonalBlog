var blogDetail = new Vue({
    el: "#blog_detail",
    data: {
        title: "",
        content: "",
        ctime: "",
        tags: "",
        views: ""
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
    created() {
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
        axios({
            method: "get",
            url: "/queryBlogById?bid=" + bid,
        }).then(res=>{
            var result = res.data.data[0];
            this.title = result.title;
            this.content = result.content;
            this.tags = result.tags;
            this.views = result.views;
            this.ctime = this.transformTime(result.ctime);


        })
    }
})