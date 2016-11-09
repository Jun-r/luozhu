//登录框
function login(){
    var username = $('#username').val();
    var password = $('#password').val();
    var data = { "username": username, "password":password};
    $.ajax({
        url:'/user/signin',
        type:'POST',
        data:data,
        success:function(data){
            if(data.success){
                window.location.href="http://"+window.location.host+"/admin/main"
            }else{
                J.Msg("用户或密码有误")
            }
        }
    });
}