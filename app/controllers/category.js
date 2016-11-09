var Category = require("../models/category");
var laypage = require('laypage');
var cateOther=[]
//分类列表
exports.list = function(req, res) {
    var pageSize = 15;//每页显示条数
    var page = req.params.num-1 || 0 ;
    Category.find().count().exec(function(err ,sum){
        Category.find().limit(pageSize).skip(pageSize*page).sort({_id : 'asc'}).exec(function(err,category){
            if(err) res.send(err);
            res.render("admin/articleCategoryList",{
                category:category,
                title:"分类列表",
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
    var _category = req.body;
    if(_category._id){
        var id = _category._id;
        Category.update({_id:id},_category,function (err,category) {
            //res.redirect("/admin/articleCategoryList");
            res.send({"success":true,"msg":"更新成功"})
        });
    }else{
        delete _category._id
        Category.create(_category, function (err,category) {
            //res.redirect("/admin/articleCategoryList");
            res.send({"success":true,"msg":"提交成功"})
        });
    }
}
//获取所有分类
exports.getCategoryAll= function(callback) {

    Category.find().sort({sort:1}).exec(function (err,categories) {
        if (err) {
            return callback(err);
        }else{
            return callback(err,categories);
        }
    })
}
//获取指定分类
exports.getCategoryOne= function(alias,callbrak) {
    var catAll=null;
    Category.find().sort({sort:1}).exec(function (err,categories) {
        var CateName,Alias,categoryId;
        for(var i =0;i<categories.length;i++){
            if((categories[i]['Alias'] == alias) || (categories[i]['_id'] == alias)){
                CateName= categories[i]['CateName']
                Alias = categories[i]['Alias']
                categoryId=categories[i]['_id']
                break;
            }
        }
        catAll={"name":CateName,"alias":Alias,"catId":categoryId};
        return callbrak(err,catAll);
    })

}

//提交与更新
exports.delete= function(req,res) {
    var id = req.query.id;
    Category.remove({_id:id},function (err,category) {
        res.send({"success":true,"msg":"删除成功"})
    })
}


////批量删除
//exports.deleteAll = function (req,res) {
//    Category.remove({_id:"572c49846be8c7b02c79ffce",_id:"572c4cae530327c43ad767cf"},function (err,category) {
//        res.send({"success":true,"msg":"删除成功"})
//    })
//};