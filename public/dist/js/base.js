//zepto 图片懒加载插件
;(function($){
	$.fn.lazyload=function(settings){
		var _self=$(this), win=$(window), _winScrollTop=win.scrollTop();
		settings=$.extend({
			lazys : 0,
			classes : '.lazy',
			container : win,		//懒加载的容器，默认为window
			threshold : 100,		//默认提前加载距离
			layout : 'vertical',		//图片布局方式，默认为纵向
			effectCls : 'fadeIn',		//预留给css3动画的class
			placeholder : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IA',
			endFn : ''				//每张图片加载后的回调
		},settings || {});

		//lazyload函数
		function lazyLoad(){
			_self.each(function(){
			var that=$(this), resource=that.attr('_src'), _offsetTop=that.offset().top;
			if(that.attr('_src')){
				if((_offsetTop - settings.threshold) <= (settings.container.height()+_winScrollTop)){
					if(that.is('img')){
						//如果是img标签
						that.attr('src',resource);
					}else{
						//如果是背景图
						that.css('background','');
						that.css('background','url('+ resource +') no-repeat 50% 0');
					}
					that.removeAttr('_src');
					that.addClass(settings.effectCls);
					settings.endFn && settings.endFn(that);
					settings.lazys++;
				}else{
					if(that.is('img')){
						that.attr('src', settings.placeholder);
					}else{
						that.css('background','#c3c3c3');
					}
				}
			}
			});
		}
		lazyLoad();
		settings.container.on('scroll',function(){
			_self = $(settings.classes);
			if(settings.lazys == _self.length){return}
			_winScrollTop = win.scrollTop();
			lazyLoad();
		});
	}
	
})(window.Zepto || $);

/* 全局对象 */
var index = {
	toast:function(str, callback){
		var toast='';
		$('body').append('<div id="toast" class="layer show"><div class="toastTip">' + str + '</div></div>');
		toast = $('#toast');
		console.log(toast)
		setTimeout(function(){
			toast.remove();
			callback && callback();
		},1000);
	},
	/* 返回页面顶部 */
	backtotop : function(){
		var doc = document, timer=null,back=doc.getElementById('backtotop');
		back.onclick=function(){
			setTimeout(function(){
				var scrollTop=doc.documentElement.scrollTop || doc.body.scrollTop, iSpeed=Math.ceil(-scrollTop/8);
				doc.documentElement.scrollTop = doc.body.scrollTop=scrollTop+iSpeed;
				timer=setTimeout(arguments.callee,16);
				if(scrollTop<=10){
					doc.documentElement.scrollTop = doc.body.scrollTop = 0;
					clearInterval(timer);
				}
			},16);
		};
	},
	/* ajax 请求 start */
	loadLock : true,
	loadParams : {
		pageSize : 6,	 /* 每页加载的数量 */
		page : 0		  /* 加载页数 */
	},
	ajaxLoad : function(pageName){
		var self = this, win = $(window), winH = win.height(), ajaxLoading = $('#ajaxLoading'), parent = $('.experiences'), footerH = $('#footer').height();
		win.on('scroll',function(){
			var scrollTop = document.body.scrollTop || document.documentElement.scrollTop, docH = $(document).height();
			if(self.loadLock && (winH + scrollTop) >= (docH - footerH - 300)){
				self.loadLock = false;
				self.loadParams.page++;
				ajaxLoading.addClass('rotating');
				$.ajax({
					type : 'GET',
					 url : '../build/js/datas.js',
					data : {
						page : self.loadParams.page,
						pageSize : self.loadParams.pageSize
					},
					success:function(data){
						/**** 本地测试 start ****/
						if(self.loadParams.page>3){
							self.loadLock = false;
							ajaxLoading.removeClass('rotating');
							return;
						};
						/**** 本地测试 end ****/
						if(datas.list.length <= 0){
							self.loadLock = false;
							ajaxLoading.removeClass('rotating');
							return;
						}else{
							var _html = '';
							if(pageName == 'case'){
								for(var i=0, len = datas.list.length; i<len; i++){
									_html += '';
								}
							}else if(pageName == 'news'){
								for(var i=0, len = datas.list.length; i<len; i++){
									_html += '';
								}
							}
							parent.append(_html);
							setTimeout(function(){
								ajaxLoading.removeClass('rotating');
								self.loadLock = true;
							},200);
						}
					},
					error:function(){
						self.loadParams.page--;
						ajaxLoading.removeClass('rotating');
						self.loadLock=true; 
					}
				})
			}
		});
	}
	/* ajax 请求 end */
};
$(function(){
	var page = $('#page'), circleG=$('#circleG');
	//初始化懒加载
	$('.lazy').lazyload();
	setTimeout(function(){
		circleG.hide();
		page.addClass('open');
	}, 400)
	
	
})