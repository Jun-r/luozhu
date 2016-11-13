//后台路由
var Admin = require('../app/controllers/admin')
var Article = require('../app/controllers/article')
var navigator = require('../app/controllers/navigator')
var category = require('../app/controllers/category')
var friendlylink = require('../app/controllers/friendlylinks')
var Page = require('../app/controllers/page') //前台路由
var Index = require('../app/controllers/index')

module.exports = function (app) {

	/*//pre handle user
	app.use(function(req, res, next) {
	    var _user = req.session.admin
	    console.log(_user)
	    //app.locals.user = _user
	    next()
	})*/

	// 首页
	app.get('/', Index.index);
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
	app.get('/error', Index.error);
	// User
	app.post('/user/signin', Admin.login);
	app.get('/admin/login', Admin.showSignin);
	app.get('/admin/quit', Admin.quit);

	//后台
	app.get('/admin/main', Admin.isLogin, Admin.main);
	//导航管理
	app.get('/admin/navigateList', Admin.isLogin, navigator.list);
	app.get('/admin/navigateAdd', Admin.isLogin, navigator.add);
	app.post('/admin/navigateAdd/save', Admin.isLogin, navigator.save);
	app.get("/admin/navigate/delete/:id", Admin.isLogin, navigator.delete);
	app.get("/admin/navigate/update/:id", Admin.isLogin, navigator.update);
	//其他管理
	app.get(['/admin/pageList', '/admin/pageList/page/:num'], Admin.isLogin, Page.list);
	app.get('/admin/pageList/add', Admin.isLogin, Page.add);
	app.get('/admin/pageList/edit/:id', Admin.isLogin, Page.updata);
	app.post('/admin/pageList/save', Admin.isLogin, Page.save);
	app.get('/admin/pageList/delete/:id', Admin.isLogin, Page.delete); //文章管理
	app.get('/admin/articleList', Admin.isLogin, Article.list);
	app.get('/admin/articleAdd', Admin.isLogin, Article.add);
	app.get('/admin/articleEdit/:id', Admin.isLogin, Article.updata);
	app.get(['/admin/articleCategoryList', '/admin/articleCategoryList/page/:num'], Admin.isLogin, category.list);
	app.get('/admin/articleCategory/delete', Admin.isLogin, category.delete);
	app.post('/admin/articleCategory/save', Admin.isLogin, category.save);
	app.post('/admin/article/save', Admin.isLogin, Article.save);
	app.get('/admin/article/delete/:id', Admin.isLogin, Article.delete);
	//友情连接
	app.get(['/admin/friendlylinkList', '/admin/friendlylinkList/page/:num'], Admin.isLogin, friendlylink.list);
	app.post('/admin/friendlylinkList/save', Admin.isLogin, friendlylink.save);
	app.get('/admin/friendlylinkList/delete', Admin.isLogin, friendlylink.delete);

	app.get(['/home'], Article.getHome);						//首页
	//文章列表页
	app.get(['/blog'], Article.getList);
	app.get(['/:Alias'], Article.getCategoryList);
	//单页
	app.get('/page/:url', Article.getPage);
	//文章详情页
	app.get('/:Alias/:alias', Article.getShow);
}