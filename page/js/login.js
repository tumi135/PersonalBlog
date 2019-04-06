var login = new Vue({
    el:"#login",
    data: {
        vcode: "",
        rightCode: "",
        code: "",
        user: "",
        password: ""
    },
    methods: {
        changeCode(){
                axios.get("/queryRandomCode").then(res => {
                    this.vcode = res.data.data.data
                    this.rightCode = res.data.data.text
                })
        },
        sentUserIfo (){
            if(this.code != this.rightCode){
                alert("验证码错误");
                return;
            }
            if(this.user == "" || this.password == ""){
                alert("用户名或密码不能为空")
                return
            }
            axios.post("/login",{
                user: this.user,
                password: this.password
            }).then(res => {
                alert(res.data.msg)
                if(res.data.status == "success"){
                    location.href = "/edit.html"
                }
            })
        }
    },
    created(){
        this.changeCode();
    }
})