var Navigator = require("../models/navigator");
var config = require("../../config");
var async = require('async');

// 首页
exports.index = function(req, res){
	async.parallel([
		/*// 导航
		function(cb){
			Navigator.getAllnav(function (err, navigator) {
				if (err) {
					cb(err);
				} else {
					cb(null, navigator);
				}
			})
		},
		// 轮播
		function(cb){
			
		},
		// 踏实的建筑公司
		function(cb){
			
		},
		// 丰富的项目经验
		function(cb){
			
		},
		// 行业快讯
		function(cb){
			
		},
		// 团队成员
		function(cb){
			
		}*/], function(err, results){
			//var navigator = results[0];
			var navigator=[{
				name:'团队成员',
				sort:'1',
				remark:'teams',
				url:'/teams.html'
			},{
				name:'关于我们',
				sort:'1',
				remark:'abouts',
				url:'/about.html'
			},{
				name:'服务案例',
				sort:'1',
				remark:'cases',
				url:'/cases.html'
			},{
				name:'企业新闻',
				sort:'1',
				remark:'news',
				url:'/news.html'
			},{
				name:'联系我们',
				sort:'1',
				remark:'contactus',
				url:'/contactus.html'
			}],
			banner={
				banners:[{
					url:'/teams.html',
					imgPath:'dist/img/01.png'
				},{
					url:'/about.html',
					imgPath:'dist/img/02.png'
				},{
					url:'/cases.html',
					imgPath:'dist/img/03.png'
				},{
					url:'/news.html',
					imgPath:'dist/img/04.png'
				}],
				texts:[{
					url:'/teams.html',
					title:'以“保证服务质量，满足客户需求”为宗旨',
					more:'To "ensure the quality of service, to meet customer needs" for the purpose of'
				},{
					url:'/about.html',
					title:'保证服务质量',
					more:'To "ensure the quality of service, to meet customer needs" for the purpose of'
				},{
					url:'/cases.html',
					title:'满足客户需求',
					more:'To "ensure the quality of service, to meet customer needs" for the purpose of'
				},{
					url:'/news.html',
					title:'“保证服务质量，满足客户需求”',
					more:'To "ensure the quality of service, to meet customer needs" for the purpose of'
				}],
				ideas:[{
					title:'严查施工保证质量',
					more:'施工技术和管理方面都积累了丰富的经验，在建筑装饰行业都树立了良好的形象，赢得了客户的广泛赞赏，并培养了一批技术人员和管理人才、为自发性组织发展成为业内劳务公司奠定了坚实的基础'
				},{
					title:'把控方案设计风格',
					more:'施工技术和管理方面都积累了丰富的经验，在建筑装饰行业都树立了良好的形象，赢得了客户的广泛赞赏，并培养了一批技术人员和管理人才、为自发性组织发展成为业内劳务公司奠定了坚实的基础'
				},{
					title:'严查施工保证质量',
					more:'施工技术和管理方面都积累了丰富的经验，在建筑装饰行业都树立了良好的形象，赢得了客户的广泛赞赏，并培养了一批技术人员和管理人才、为自发性组织发展成为业内劳务公司奠定了坚实的基础'
				}]
			};
			var company={
				title:'踏实的建筑公司',
				sub:'Practical construction company',
				bigImgPath:'dist/img/05.png',
				intro:'本公司座落于深圳市流塘新村六巷十号，现扔有高级工程师1名，工程师4人，技术人员8名，项目经理5名，一流的施工生产设备，先进的施工工艺，科学的管理施工流程和完善的检测手段，可根据不同的业主，设计不同的施工方案，根据业主不同性格定位、设计出不同的、令业主满意的产品风格。<br>&emsp;&emsp;螺主劳务建筑装饰公司拥有几支优秀专业的施工队伍，在建筑装饰行业摸爬滚打了20几年，先后完成了，XXX等项目的装饰设计工程项目，同时本公司也在全国、上海、成都、广州、佛山、惠州、顺德等地建设了花都、广州南沙、碧桂园、成都万达广场项目的钢筋、模板、混泥土等主体工程，施工技术和管理方面都积累了丰富的经验，在建筑装饰行业都树立了良好的形象，赢得了客户的广泛赞赏，并培养了一批技术人员和管理人才、为自发性组织发展成为业内劳务公司奠定了坚实的基础。',
				imgs:['dist/img/06.png','dist/img/07.png','dist/img/08.png','dist/img/09.png']
			};
			var experience={
				title:'丰富的项目经验',
				sub:'Rich project experience',
				list:[{
					url:'/experience.html',
					title:'古典风格四室居设计',
					imgPath:'dist/img/10.png'
				},{
					url:'/experience.html',
					title:'古典风格四室居设计',
					imgPath:'dist/img/11.png'
				},{
					url:'/experience.html',
					title:'古典风格四室居设计',
					imgPath:'dist/img/12.png'
				},{
					url:'/experience.html',
					title:'古典风格四室居设计',
					imgPath:'dist/img/13.png'
				},{
					url:'/experience.html',
					title:'古典风格四室居设计',
					imgPath:'dist/img/14.png'
				},{
					url:'/experience.html',
					title:'古典风格四室居设计',
					imgPath:'dist/img/15.png'
				},{
					url:'/experience.html',
					title:'古典风格四室居设计',
					imgPath:'dist/img/16.png'
				},{
					url:'/experience.html',
					title:'古典风格四室居设计',
					imgPath:'dist/img/17.png'
				}]
			};
			var news={
				title:'行业快讯',
				sub:'Industry News',
				newsList:[{
					url:'/news.html',
					imgPath:'dist/img/18.png',
					news_title:'郑州高校新食堂“致青春”逆天 装修风格文艺范',
					time:'2016-10-14 14:15:24',
					news_txt:'餐厅取名为“致青春”，正中间装饰了一棵高大的人造树，“藤蔓”、装饰架、壁画散落在各处，配以暖色照明灯，整个食堂文艺范爆棚。'
				},{
					url:'/news.html',
					imgPath:'dist/img/19.png',
					news_title:'郑州高校新食堂“致青春”逆天',
					time:'2016-10-14 14:15:24',
					news_txt:'餐厅取名为“致青春”，正中间装饰了一棵高大的人造树，“藤蔓”、装饰架、壁画散落在各处，配以暖色照明灯，整个食堂文艺范爆棚。'
				},{
					url:'/news.html',
					imgPath:'dist/img/20.png',
					news_title:'装修风格文艺范',
					time:'2016-10-14 14:15:24',
					news_txt:'餐厅取名为“致青春”，正中间装饰了一棵高大的人造树，“藤蔓”、装饰架、壁画散落在各处，配以暖色照明灯，整个食堂文艺范爆棚。'
				}]
			};
			var teams={
				title:'行业快讯',
				sub:'Industry News',
				team_members:[{
					url:'/teams.html',
					imgPath:'dist/img/21.png',
					name:'凯子',
					job:'总经理/CEO',
					intro:'工程师指具有从事工程系统操作、设计、管理、评估能力的人员。工程师的称谓，通常只用于在工程学其中1个范畴持有专业性学位或相等工作经验的人士'
				},{
					url:'/teams.html',
					imgPath:'dist/img/21.png',
					name:'凯子',
					job:'总经理/CEO',
					intro:'前端工程师前端工程师前端工程师前端工程师前端工程师前端工程师前端工程师前端工程师前端工程师前端工程师前端工程师前端工程师'
				},{
					url:'/teams.html',
					imgPath:'dist/img/21.png',
					name:'凯子',
					job:'总经理/CEO',
					intro:'架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师'
				}]
			};
			var contact={
				title:'联系我们',
				sub:'Contact us',
				phone:'0123-12345677',
				fax:'0123-12345677',
				address:'深圳市宝安区西乡流塘新村6巷10号'
			}
			res.render('index', {
				navigator: navigator,
				banner: banner,
				company: company,
				experience: experience,
				news: news,
				teams: teams,
				contact: contact
			})
		})
}
/*// index page
exports.index = function (req, res) {
	Navigator.find().sort({sort: 1}).exec(function (err, navigator) {
		res.render('index', {
			title: '首页-' + config.name,
			keywords: config.keywords,
			dirPath: config.dirname,
			description: config.description,
			navigator: navigator
		})
	})
}*/