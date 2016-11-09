var Navigate = require("../models/navigate");
//导航列表
exports.list = function (req, res) {
    Navigate.find().sort({sort:1}).exec(function (err,navigates) {
        res.render("admin/navigateList",{
            navigates:navigates,
            title:"导航列表"
        });
    })
}
//添加导航
exports.add = function (req,res) {
    Navigate.find({}, function (err,navigates) {
        res.render("admin/navigateAdd",{
            navigates:navigates,
            title:"添加导航"
        });
    });
}
//编辑导航
exports.update = function (req,res) {
    var id = req.params.id;
    Navigate.findById({_id:id},function (err,navigate) {
        res.render("admin/navigateUpdata",{
            navigate:navigate,
            title:"编辑导航"
        });
    });
}
//获取所有导航
exports.getAllnav = function (callbrak) {
    Navigate.find().sort({sort:1}).exec(function (err,navigate) {
        if(err){
            return callbrak(err)
        }else {
            return callbrak(null,navigate)
        }
    });
}
//更新、添加
exports.save = function (req,res) {
    var _navigate = req.body;
    var id = _navigate._id;
    if(id){
        Navigate.update({_id:id},_navigate,function (err,_navigate) {
            res.redirect("/admin/navigateList");
        });
    }else{
        delete _navigate._id
        Navigate.create(_navigate, function (err,navigate) {
            res.redirect("/admin/navigateList");
        });
    }
}
exports.delete = function (req,res) {
    var id = req.params.id;
    Navigate.remove({_id:id},function (err,navigate) {
        res.redirect("/admin/navigateList");
    })
}
