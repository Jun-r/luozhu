$(function(){
    $(".edit,#addCategory").on("click",function(ev){
        var tg=ev.target;
        var _this=$(this);
        var categoryId=$("#categoryId");
        A.alertHtml($(".varsion-box").html(),function(layero){
            //parent.laydate.skin('yalan');
            //parent.laydate({
            //    elem: '#varsion-time',
            //    format: 'YYYY-MM-DD hh:mm:ss',
            //    choose: function(datas){
            //       console.log(datas);
            //    }
            //});
            if(tg.className=="edit"){
                var json=_this.attr("data-json").split(",");
                layero.find("input[name='CateName']").val(json[1]);
                layero.find("input[name='Alias']").val(json[2])
                layero.find("input[name='Link']").val(json[3]);
                categoryId.val(json[0]);
            }

        },function(index,layero){
                var _CateName=layero.find("input[name='CateName']").val();
                var _Alias=layero.find("input[name='Alias']").val();
                var _Link=layero.find("input[name='Link']").val();
                var id=categoryId.val();
                var data={
                    _id:id,
                    CateName:_CateName,
                    Alias:_Alias,
                    Link:_Link
                }
                $.ajax({
                    url:'/admin/articleCategory/save',
                    type:'POST',
                    data:data,
                    success:function(data){
                        if(data.success){
                            A.closeAll();
                            A.Msg(data.msg,function(){
                                categoryId.val('');
                            })
                            location.reload()
                        }
                    }
                });
        });
    })
    $(".delete").on("click",function(){
        var _this=$(this);
        var categoryId=_this.attr("data-id");
        $.ajax({
            url:'/admin/articleCategory/delete',
            type:'GET',
            data:{id:categoryId},
            success:function(data){
                if(data.success){
                    A.closeAll();
                    A.Msg(data.msg)
                    location.reload()
                }
            }
        });
    });

   //$("#deleteAll").on("click",function(){
   //    $.ajax({
   //        url:'/admin/articleCategory/deleteAll',
   //        type:'GET',
   //        data:{id:categoryId},
   //        success:function(data){
   //            if(data.success){
   //                A.closeAll();
   //                A.Msg(data.msg)
   //                location.reload()
   //            }
   //        }
   //    });
   //})
})