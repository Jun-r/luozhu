var Page = require("../models/page");
var laypage = require('laypage');

//单页列表
exports.list = function(req, res) {
    var pageSize = 5;//每页显示条数
    var page = req.params.num-1 || 0 ;
    Page.find().count().exec(function(err ,sum){
        Page.find().limit(pageSize).skip(pageSize*page).sort({_id : 'asc'}).exec(function(err,pageList){
            if(err) res.send(err);
            res.render("admin/pageList",{
                pageList:pageList,
                title:"单页列表",
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
//添加单页
exports.add = function(req, res) {
    res.render('admin/pageAdd', {
        title: '添加单页'
    })
}
exports.updata = function(req, res) {
    var _article = req.params;
       Page.findById({"_id":_article.id}, function (err,_article) {
            res.render('admin/pageUpdata', {
                title: '编辑单页',
                page:_article
            })
        });
}
//文章提交与更新
exports.save= function(req,res) {
    var _pageA = req.body;
    var _page={
        name:_pageA.name,
        url: _pageA.url,
        remark:_pageA.remark,
        'markdownContent':_pageA['editormd-markdown-doc'],
    }
    if(_pageA._id){
        var id = _pageA._id;
        Page.update({_id:id},_page,function (err,_page) {
            res.redirect("/admin/pageList");
        });
    }else{
        Page.create(_page, function (err,_page) {
            res.redirect("/admin/pageList");
        });
    }

}


//删除
exports.delete= function(req,res) {
    var id = req.params.id;
    Page.remove({_id:id},function (err,page) {
        res.redirect("/admin/pageList");
    })
}
