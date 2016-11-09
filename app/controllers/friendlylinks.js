var friendlylink = require("../models/friendlylinks");
var laypage = require('laypage');

//友情连接列表
exports.list = function(req, res) {
    var pageSize = 10;//每页显示条数
    var page = req.params.num-1 || 0 ;
    friendlylink.find().count().exec(function(err ,sum){
        friendlylink.find().limit(pageSize).skip(pageSize*page).sort({_id : -1}).exec(function(err,friendlylink){
            if(err) res.send(err);
            res.render("admin/friendlylinksList",{
                friendlylink:friendlylink,
                title:"友情连接列表",
                pagesise:sum,
                laypage: laypage({
                    curr: req.params.num || 1,
                    url: req.url, //必传参数，获取当前页的url
                    groups: 5,
                    pages: Math.ceil(sum/pageSize), //分页总数你需要通过sql查询得到
                    prev: '‹',
                    next: '›'
                })
            });
        });

    });

}

//提交与更新
exports.save= function(req,res) {
    var _friendlylink = req.body;
    if(_friendlylink._id){
        var id = _friendlylink._id;
        friendlylink.update({_id:id},_friendlylink,function (err,friendlylink) {
            res.send({"success":true,"msg":"更新成功"})
        });
    }else{
        delete _friendlylink._id
        friendlylink.create(_friendlylink, function (err,friendlylink) {
            res.send({"success":true,"msg":"提交成功"})
        });
    }
}
//获取所有数据
exports.getLinkAll= function(callback) {
    friendlylink.find().sort({sort:1}).exec(function (err,friendlylink) {
        if (err) {
            return callback(err);
        }else{
            return callback(err,friendlylink);
        }
    })
}
//删除
exports.delete= function(req,res) {
    var id = req.query.id;
    friendlylink.remove({_id:id},function (err,friendlylinks) {
        res.send({"success":true,"msg":"删除成功"})
    })
}


////批量删除
//exports.deleteAll = function (req,res) {
//    Category.remove({_id:"572c49846be8c7b02c79ffce",_id:"572c4cae530327c43ad767cf"},function (err,category) {
//        res.send({"success":true,"msg":"删除成功"})
//    })
//};