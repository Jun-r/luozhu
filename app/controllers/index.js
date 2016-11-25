var async = require('async');
var moment = require("moment");
var config = require("../../config");
var nav = require("../controllers/navigator");
var banner = require("../controllers/banner");
var cases = require("../controllers/cases");
var teams = require("../controllers/teams");
var news = require("../controllers/news");
var banners = require("../models/banner");

// 首页
exports.index = function(req, res){
	async.parallel([
		// 导航
		function(cb){
			nav.getAllnav(function (err, navigator) {
				if (err) {
					cb(err);
				} else {
					cb(null, navigator);
				}
			})
		},
		// 轮播
		function(cb){
			banner.indexBanner(function (err, banner) {
				if (err) {
					cb(err);
				} else {
					cb(null, banner);
				}
			})
		},
		// 丰富的项目经验
		function(cb){
			cases.getCases(function (err, cases) {
				if (err) {
					cb(err);
				} else {
					cb(null, cases);
				}
			})
		},
		// 行业快讯
		function(cb){
			news.getNews(function (err, news) {
				if (err) {
					cb(err);
				} else {
					cb(null, news);
				}
			})
		},
		// 团队成员
		function(cb){
			teams.getTeams(function (err, teams) {
				if (err) {
					cb(err);
				} else {
					cb(null, teams);
				}
			})
		}],
	function(err, results){
		var navigator = results[0], banner = results[1], cases = results[2], news = results[3], teams = results[4];
		res.render('index', {
			navigator: navigator,
			experience:cases,
			banner: banner,
			teams: teams,
			news: news
		})
	})
}

// 团队
exports.teams = function (req, res) {
	async.parallel([
		// 导航
		function(cb){
			nav.getAllnav(function (err, navigator) {
				if (err) {
					cb(err);
				} else {
					cb(null, navigator);
				}
			})
		},
		// teamsTabs
		function(cb){
			teams.getTeams(function (err, teams) {
				if (err) {
					cb(err);
				} else {
					cb(null, teams);
				}
			})
		},function(cb){
			cases.getCases(function (err, cases) {
				if (err) {
					cb(err);
				} else {
					cb(null, cases);
				}
			})
		}],
	function(err, results){
		var navigator = results[0], teamsTabs = results[1], works=results[2];
		var teamsTabs = [
			[{avatar:'dist/img/21.png',
					name:'凯子',
					job:'总经理/CEO',
					about:'工程师指具有从事工程系统操作、设计、管理、评估能力的人员。工程师的称谓，通常只用于在工程学其中一个范畴持有专业性'
				},{avatar:'dist/img/22.png',
					name:'凯子',
					job:'总经理/CEO',
					about:'工程师指具有从事工程系统操作、设计、管理、评估能力的人员。'
				}
			],
			[{avatar:'dist/img/22.png',
				name:'凯子',
				job:'总经理/CEO',
				about:'工程师指具有从事工程系统操作、设计、管理、评估能力的人员。'
			},{avatar:'dist/img/21.png',
				name:'凯子',
				job:'总经理/CEO',
				about:'工程师指具有从事工程系统操作、设计、管理、评估能力的人员。工程师的称谓，通常只用于在工程学其中一个范畴持有专业性'
			}],
			[{avatar:'dist/img/22.png',
				name:'凯子',
				job:'总经理/CEO',
				about:'工程师指具有从事工程系统操作、设计、管理、评估能力的人员。'
			},{avatar:'dist/img/21.png',
				name:'凯子',
				job:'总经理/CEO',
				about:'工程师的称谓，通常只用于在工程学其中1个范畴持有专业性'
			}]
		];
		res.render('teams', {
			navigator: navigator,
			teamsTabs:teamsTabs,
			works: works
		})
	})
}

// 关于我们
exports.aboutus = function (req, res) {
	async.parallel([
		// 导航
		function(cb){
			nav.getAllnav(function (err, navigator) {
				if (err) {
					cb(err);
				} else {
					cb(null, navigator);
				}
			})
		},
		// teamsTabs
		/*function(cb){
			
		}*/], 
	function(err, results){
		var navigator = results[0];
		var aboutCompany={
			imgPath:['dist/img/05.png','dist/img/06.png'],
			intro:['本公司座落于深圳市流塘新村六巷十号，现扔有高级工程师1名，工程师4人，技术人员8名，项目经理5名，一流的施工生产设备，先进的施工工艺，科学的管理施工流程和完善的检测手段，可根据不同的业主，设计不同的施工方案，根据业主不同性格定位、设计出不同的、令业主满意的产品风格。<br>&emsp;&emsp;螺主劳务建筑装饰公司拥有几支优秀专业的施工队伍，在建筑装饰行业摸爬滚打了20几年，先后完成了，XXX等项目的装饰设计工程项目，同时本公司也在全国、上海、成都、广州、佛山、惠州、顺德等地建设了花都、广州南沙、碧桂园、成都万达广场项目的钢筋、模板、混泥土等主体工程，施工技术和管理方面都积累了丰富的经验，在建筑装饰行业都树立了良好的形象，赢得了客户的广泛赞赏，并培养了一批技术人员和管理人才、为自发性组织发展成为业内劳务公司奠定了坚实的基础。','螺主劳务建筑装饰公司拥有几支优秀专业的施工队伍，在建筑装饰行业摸爬滚打了20几年，先后完成了，XXX等项目的装饰设计工程项目，同时本公司也在全国、上海、成都、广州、佛山、惠州、顺德等地建设了花都、广州南沙、碧桂园、成都万达广场项目的钢筋、模板、混泥土等主体工程，施工技术和管理方面都积累了丰富的经验，在建筑装饰行业都树立了良好的形象，赢得了客户的广泛赞赏，并培养了一批技术人员和管理人才、为自发性组织发展成为业内劳务公司奠定了坚实的基础。']
		}
		var watchword={
			imgPath:'dist/img/24.png',
			title:'“ 共享平台、共同创业、共谋发展、共离成果 ”',
			signs:'主打造开放、共赢的装修家居生态系统，推动行业更阳光、更透明。螺主用实际行动获得众多的关注，相继受到央视网、光明网、新华网、凤凰网、第一财经周刊、21世纪商业评论、IT经理世界、36氪 等多家媒体的关注与报道。'
		}
		var goals=[{
			title:'严查施工保证质量',
			details:'施工技术和管理方面都积累了丰富的经验，在建筑装饰行业都树立了良好的形象，赢得了客户的广泛赞赏，并培养了一批技术人员和管理人才、为自发性组织发展成为业内劳务公司奠定了坚实的基础'
		},{
			title:'把控方案设计风格',
			details:'施工技术和管理方面都积累了丰富的经验，在建筑装饰行业都树立了良好的形象，赢得了客户的广泛赞赏，并培养了一批技术人员和管理人才、为自发性组织发展成为业内劳务公司奠定了坚实的基础'
		},{
			title:'严查施工保证质量',
			details:'施工技术和管理方面都积累了丰富的经验，赢得了客户的广泛赞赏，并培养了一批技术人员和管理人才、为自发性组织发展成为业内劳务公司奠定了坚实的基础'
		}]
		res.render('aboutus', {
			navigator: navigator,
			aboutCompany:aboutCompany,
			watchword: watchword,
			goals: goals
		})
	})
}

// 服务案例
exports.cases = function (req, res) {
	async.parallel([
		// 导航
		function(cb){
			nav.getAllnav(function (err, navigator) {
				if (err) {
					cb(err);
				} else {
					cb(null, navigator);
				}
			})
		},
		// 案例列表
		function(cb){
			cases.getCases(function (err, cases) {
				if (err) {
					cb(err);
				} else {
					cb(null, cases);
				}
			})
		}],
	function(err, results){
		var navigator = results[0], cases = results[1];
		var cases = [
			[{
				id:0,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/10.png'
			},{
				id:1,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/11.png'
			},{
				id:2,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/12.png'
			},{
				id:3,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/13.png'
			},{
				id:4,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/14.png'
			},{
				id:5,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/15.png'
			},{
				id:6,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/16.png'
			},{
				id:7,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/17.png'
			}],
			[{
				id:7,
				title:'古典风格四室居设计',
				imgPath:'dist/img/17.png'
			},{
				id:6,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/16.png'
			},{
				id:5,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/15.png'
			},{
				id:4,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/14.png'
			},{
				id:3,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/13.png'
			},{
				id:2,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/12.png'
			},{
				id:1,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/11.png'
			},{
				id:1,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/10.png'
			}]
		]
		res.render('cases', {
			navigator: navigator,
			cases: cases
		})
	})
}

// 查看案例轮播
exports.getCasesShow = function(req, res){
	res.send({
		
	})
}

// 企业新闻
exports.news = function (req, res) {
	async.parallel([
		// 导航
		function(cb){
			nav.getAllnav(function (err, navigator) {
				if (err) {
					cb(err);
				} else {
					cb(null, navigator);
				}
			})
		},
		// 新闻列表
		function(cb){
			news.getNews(function (err, news) {
				if (err) {
					cb(err);
				} else {
					cb(null, news);
				}
			})
		}], 
	function(err, results){
		var navigator = results[0], news = results[1];
		res.render('news', {
			navigator:navigator,
			pages:10,
			news:news
		})
	})
}

// 联系我们
exports.contactus = function (req, res) {
	async.parallel([
		// 导航
		function(cb){
			nav.getAllnav(function (err, navigator) {
				if (err) {
					cb(err);
				} else {
					cb(null, navigator);
				}
			})
		}],
	function(err, results){
		var navigator = results[0];
		res.render('contactus', {
			navigator: navigator
		})
	})
}

exports.suggest = function(req,res){
	res.send({success:true})
}

/* 后台管理页面 */
exports.indexBanner=function(req, res){
	async.parallel([
		// 导航
		function(cb){
			nav.getAllnav(function (err, navigator) {
				if (err) {
					cb(err);
				} else {
					cb(null, navigator);
				}
			})
		},
		// 导航列表
		function(cb){
			banner.indexBanner(function (err, banner) {
				if (err) {
					cb(err);
				} else {
					cb(null, banner);
				}
			})
		}],
	function(err, results){
		var navigator = results[0], banner = results[1];
		res.render('admin/bannerList', {
			navigator:navigator,
			banner:banner
		})
	})
}
exports.delete=function(req, res){
	var id=req.params.id;
	banners.remove({_id: id}, function (err) {
		res.redirect("admin/bannerList");
	})
}
exports.update=function(req, res){
	async.parallel([
		// 导航列表
		function(cb){
			banner.indexBanner(function (err, banner) {
				if (err) {
					cb(err);
				} else {
					cb(null, banner);
				}
			})
		}],
	function(err, results){
		var banner = results[0];
		res.render('admin/bannerUpdate', {
			banner:banner
		})
	})
}