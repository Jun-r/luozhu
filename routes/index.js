//后台路由后台路由
var path = require('path');
var ueditor = require("ueditor");
var Admin = require('../app/controllers/admin')
var Index = require('../app/controllers/index')
var Cases = require('../app/controllers/cases')
var Article = require('../app/controllers/article')
var category = require('../app/controllers/category')
var Navigator = require('../app/controllers/navigator')
var friendlylink = require('../app/controllers/friendlylinks')
var Page = require('../app/controllers/page')//前台路由

module.exports = function (app) {

	//编辑器上传图片
	app.use("/ueditor/ue",ueditor(path.join(__dirname, '../public/'), function(req, res, next) {
		// ueditor 客户发起上传图片请求
		if(req.query.action === 'uploadimage'){
			// 这里你可以获得上传图片的信息
			var foo = req.ueditor;
			// 下面填写你要把图片保存到的路径 （ 以 path.join(__dirname, 'public') 作为根路径）
			var img_url = "/Uimg/";
			res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
		}
		//  客户端发起图片列表请求
		else if (req.query.action === 'listimage'){
			var dir_url = 'your img_dir'; // 要展示给客户端的文件夹路径
			res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片
		}else{
			res.setHeader('Content-Type', 'application/json');
			// 这里填写 ueditor.config.json 这个文件的路径
			res.redirect('/ueditor/config.json')
		}
	}));

	/******前端*****/
	app.get(['/','/index','/home'], Index.index);
	// 团队
	app.get('/teams', Index.teams);
	// 关于我们
	app.get('/aboutus', Index.aboutus);
	// 服务案例
	app.get('/cases', Index.cases);
	app.post('/getCasesShow', Index.getCasesShow);
	// 企业新闻
	app.get('/news', Index.news);
	// 联系我们
	app.get('/contactus', Index.contactus);
	app.post('/suggest', Index.suggest);
	// User
	app.post('/user/signin', Admin.login);
	app.get('/admin/login', Admin.showSignin);
	app.get('/admin/quit', Admin.quit);

	/******后台*****/
	app.get('/admin/main', Admin.isLogin, Admin.main);
	
	//导航管理
	app.get('/admin/navigatorList', Admin.isLogin, Navigator.list);
	app.get('/admin/navigatorAdd', Admin.isLogin, Navigator.add);
	app.post('/admin/navigatorSave', Admin.isLogin, Navigator.save);
	app.get("/admin/navigatorUpdate/:id", Admin.isLogin, Navigator.update);
	app.get("/admin/navigatorDelete/:id", Admin.isLogin, Navigator.delete);
	
	//首页管理
	/*app.get("/admin/indexBanner", Admin.isLogin, Index.indexBanner);
	app.get("/admin/indexIntro", Admin.isLogin, Index.indexIntro);
	app.get("/admin/indexExp", Admin.isLogin, Index.indexExp);
	app.get("/admin/indexNews", Admin.isLogin, Index.indexNews);
	app.get("/admin/indexTeams", Admin.isLogin, Index.indexTeams);
	app.get("/admin/indexContactus", Admin.isLogin, Index.indexContactus);*/
	
	//新闻管理
	app.get('/admin/articleList', Admin.isLogin, Article.list);
	app.get('/admin/articleAdd', Admin.isLogin, Article.add);
	app.post('/admin/articleSave', Admin.isLogin, Article.save);
	app.get('/admin/articleEdit/:id', Admin.isLogin, Article.update);
	app.get('/admin/articleDelete/:id', Admin.isLogin, Article.delete);
	
	//案例管理
	app.get('/admin/casesList', Admin.isLogin, Cases.list);
	app.get('/admin/casesAdd', Admin.isLogin, Cases.add);
	app.get('/admin/casesSave', Admin.isLogin, Cases.save);
	app.get('/admin/casesEdit/:id', Admin.isLogin, Cases.update);
	app.get('/admin/casesDelete/:id', Admin.isLogin, Cases.delete);
	
	//分类管理
	app.get(['/admin/categoryList', '/admin/categoryList/page/:num'], Admin.isLogin, category.list);
	app.get('/admin/categoryListDelete', Admin.isLogin, category.delete);
	app.post('/admin/categoryListSave', Admin.isLogin, category.save);
	
	//友情连接
	app.get(['/admin/friendlylinkList', '/admin/friendlylinkList/page/:num'], Admin.isLogin, friendlylink.list);
	app.post('/admin/friendlylinkListSave', Admin.isLogin, friendlylink.save);
	app.get('/admin/friendlylinkListDelete', Admin.isLogin, friendlylink.delete);
	
	//其他管理
	app.get(['/admin/pageList', '/admin/pageList/page/:num'], Admin.isLogin, Page.list);
	app.get('/admin/pageListAdd', Admin.isLogin, Page.add);
	app.post('/admin/pageListSave', Admin.isLogin, Page.save);
	app.get('/admin/pageListEdit/:id', Admin.isLogin, Page.update);
	app.get('/admin/pageListDelete/:id', Admin.isLogin, Page.delete);

	//新闻列表页
	app.get(['/blog'], Article.getList);
	app.get(['/:Alias'], Article.getCategoryList);
	//单页
	app.get('/page/:url', Article.getPage);
	//文章详情页
	app.get('/:Alias/:alias', Article.getShow);
}