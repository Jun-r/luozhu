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
	}
	/* 返回页面顶部 
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
	/* ajax 请求 start 
	loadLock : true,
	loadParams : {
		pageSize : 6,
		page : 0
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
						/**** 本地测试 start ****
						if(self.loadParams.page>3){
							self.loadLock = false;
							ajaxLoading.removeClass('rotating');
							return;
						};
						/**** 本地测试 end ****
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
	
	
});

/* 轮播 */
function Slides(id, options){
	var _this = this;
	_this.opts={
		playTime : 3000,
		controls : true,
		autoPlay : true,
		thumbnails : false,
		animation : 'opacity',		/*  horizontal | vertical */
		images_count : '',
		thumbShowCount : 1,
		type : ''
	},
	_this.bannerWrap = $(id);
	_this.config = $.extend(_this.opts, options);
	_this.slides = _this.bannerWrap.find('.slides');
	_this.slides_ul = _this.bannerWrap.find('.slides_ul');
	_this.playArr = _this.slides_ul.find('li');
	_this.init();
};

Slides.prototype = {
	index : 0,
	timer : null,
	imgsArr : [],
	thumb_count : 0,
	init : function(){
		var _this = this;
		_this.prev=$('.prev');
		_this.next = $('.next');
		_this.slideWidth='';
		for(var i=0, length=_this.playArr.length; i<length; i++){
			_this.imgsArr.push( $(_this.playArr[i] ).find('img').attr('_src'));
		}
		$(_this.playArr[0]).addClass('active').find('img').attr('src', _this.imgsArr[0]).removeAttr('_src');
		
		if(_this.config.type=='index'){
			var ideas=$('#ideas'),
					texts=$('#texts'),
					firstTxt=texts.children().eq(0);
			_this.texts=texts.children();
			setTimeout(function(){
				firstTxt.addClass('active');
				ideas.addClass('isplay');
			},400);
		}
		/*
		if(_this.config.animation=='horizontal'){
			_this.slideWidth = _this.playArr[0].offsetWidth + parseInt(_this.getStyle(_this.playArr[0]).marginLeft) + parseInt(_this.getStyle(_this.playArr[0]).marginRight);
			_this.slides_ul.css('width', _this.slideWidth*_this.playArr.length);
		}*/
		
		if(_this.config.thumbnails){
			_this.thumbnails = _this.bannerWrap.find('.thumbnails');
			_this.thumb_ul = _this.thumbnails.find('.thumb_ul');
			_this.thumbnailsArr = _this.thumbnails.find('li');
			_this.thumbnailWidth = _this.thumbnailsArr[0].offsetWidth + parseInt(_this.getStyle(_this.thumbnailsArr[0]).marginLeft) + parseInt(_this.getStyle(_this.thumbnailsArr[0]).marginRight);
			_this.thumb_ul.css('width', _this.thumbnailWidth*_this.thumbnailsArr.length);
			$(_this.thumbnailsArr[0]).addClass('active');
			for(var i=0, length=_this.thumbnailsArr.length; i<length; i++){
				if(i<=_this.config.thumbShowCount-1){
					$(_this.thumbnailsArr[i]).find('img').attr('src', _this.imgsArr[i]).removeAttr('_src');
				}
			}
			if(_this.thumbnailsArr.length>=_this.config.thumbShowCount){
				var prev, next;
				_this.thumb_steps = _this.thumbnailsArr.length-_this.config.thumbShowCount;
				_this.thumbnails.append('<i class="thumb_prev icon_bf"></i><i class="thumb_next icon_bf"></i>');
				prev=_this.thumbnails.find('.thumb_prev');
				next=_this.thumbnails.find('.thumb_next');
				_this.thumb_controls(prev, next, _this.thumbnailWidth, _this.thumbnailWidth*_this.thumbnailsArr.length);
			}
		}
		_this.mouseover();
		_this.config.autoPlay && _this.autoPlay();
		if(_this.config.animation=='opacity'){
			_this.controls();
		};
		/*if(_this.config.animation=='horizontal'){
			_this.animations();
		};*/
	},
	getStyle:function(obj){
		var style=null;
		if (window.getComputedStyle) {
			style = window.getComputedStyle(obj, null);		// 非IE
		} else { 
			style = obj.currentStyle;											// IE
		}
		return style
	},
	autoPlay : function(){
		var _this = this, length=_this.playArr.length;
		_this.timer=setInterval(function(){
			_this.index++;
			if(_this.index>=length){
				_this.index=0;
			}
			_this.transtions();
		}, _this.config.playTime);
	},
	controls : function(){
		var _this = this, length=_this.playArr.length;
		_this.prev.on('click',function(){
			clearInterval(_this.timer);
			_this.index--;
			if(_this.index<0){
				_this.index = length-1;
			}
			_this.transtions();
		});
		_this.next.on('click',function(){
			clearInterval(_this.timer);
			_this.index++;
			if(_this.index>=length){
				_this.index=0;
			}
			_this.transtions();
		});
	},
	transtions : function(){
		var _this = this, initType=_this.config.type;
		$(_this.playArr[_this.index]).addClass('active').siblings().removeClass('active');
		
		if(initType=='index'){
			$(_this.texts[_this.index]).addClass('active').siblings().removeClass('active');
		}
		
		if($(_this.playArr[_this.index]).find('img').attr('_src')){
			$(_this.playArr[_this.index]).find('img').attr('src', _this.imgsArr[_this.index]).removeAttr('_src', '');
		}
	},
	/*animations:function(){
		var _this = this, length=_this.playArr.length-1;
		_this.prev.on('click',function(){
			_this.index--;
			if(_this.index<0){
				_this.index = length-1;
				_this.slides_ul.css({'transform':'translate('+-_this.slideWidth*length+'px,0)', 'transitionDuration':'0s'});
				setTimeout(function(){
					_this.slides_ul.css({'transform':'translate('+-_this.slideWidth*(length-1)+'px,0)', 'transitionDuration':'300ms'});
				},1);
			}else{
				_this.slides_ul.css({'transform':'translate('+-_this.slideWidth*_this.index+'px,0)', 'transitionDuration':'300ms'});
			}
			_this.transtions();
			$(_this.thumbnailsArr[_this.index]).addClass('active').siblings().removeClass('active');
		});
		_this.next.on('click',function(){
			_this.index++;
			if(_this.index>length){
				_this.index=0;
				_this.slides_ul.css({'transform':'translate(0,0)', 'transitionDuration':'0s'});
				setTimeout(function(){
					_this.slides_ul.css({'transform':'translate('+-_this.slideWidth+'px,0)', 'transitionDuration':'300ms'});
				},1);
			}else{
				_this.slides_ul.css({'transform':'translate('+-_this.slideWidth*_this.index+'px,0)', 'transitionDuration':'300ms'});
				if(_this.index==length){
					$(_this.thumbnailsArr[0]).addClass('active').siblings().removeClass('active');
				}
			}
			if(_this.index==0){
				_this.index=1;
			}
			_this.transtions();
			$(_this.thumbnailsArr[_this.index]).addClass('active').siblings().removeClass('active');
		});
	},*/
	thumb_scroll:function(){
		var _this=this, x, offsetL, navWidth, maxScrollX;
		offsetL = _this.thumbnailsArr[_this.index].offsetLeft+_this.thumbnailsArr[0].offsetWidth/2;
		navWidth = 800;
		maxScrollX=_this.thumbnailWidth*_this.thumbnailsArr.length-navWidth;
		x=Math.max(Math.min(0, -offsetL + (navWidth / 2)), -maxScrollX);
		_this.thumb_ul.css({
			'transform':'translate('+x+'px,0)',
			'webkitTransform':'webkitTranslate('+x+'px,0)'
		});
		$(_this.thumbnailsArr[_this.index]).addClass('active').siblings().removeClass('active');
		if($(_this.thumbnailsArr[_this.index+2]).find('img').attr('_src')){
			$(_this.thumbnailsArr[_this.index+2]).find('img').attr('src', $(_this.thumbnailsArr[_this.index+2]).find('img').attr('_src'));
		}
	},
	thumb_controls:function(prev, next, width, totalWidth){
		var _this = this, curThumb, curThumbIndex;
		prev.on('click',function(){
			_this.thumb_count--;
			if(_this.thumb_count<0){
				return _this.thumb_count = 0;
			}
			_this.thumb_ul.css({
				'transform':'translate('+-width*_this.thumb_count+'px,0)',
				'webkitTransform':'webkitTranslate('+-width*_this.thumb_count+'px,0)'
			});
		});
		next.on('click',function(){
			_this.thumb_count++;
			if(_this.thumb_count > _this.thumb_steps){
				return _this.thumb_count = _this.thumb_steps;
			}
			curThumbIndex = _this.thumb_count+_this.config.thumbShowCount-1;
			curThumb = $(_this.thumbnailsArr[curThumbIndex]).find('img');
			if(curThumb.attr('_src')){
				$(_this.thumbnailsArr[curThumbIndex]).find('img').attr('src', curThumb.attr('_src')).removeAttr('_src');
			}
			_this.thumb_ul.css({
				'transform':'translate('+-width*_this.thumb_count+'px,0)',
				'webkitTransform':'webkitTranslate('+-width*_this.thumb_count+'px,0)'
			});
		});
		_this.thumbnailsArr.on('click',function(){
			var _index=$(this).attr('_index');
			_this.index=_index;
			//_this.thumb_count=_index-_this.config.thumbShowCount;
			_this.slides_ul.css({
				'transform':'translate('+-_this.slideWidth*_index+'px,0)',
				//'transitionDuration':'300ms',
				'webkitTransform':'webkitTranslate('+-_this.slideWidth*_index+'px,0)'
				//'webkitTransitionDuration':'300ms'
			});
			$(this).addClass('active').siblings().removeClass('active');
			if($(_this.playArr[_this.index]).find('img').attr('_src')){
				$(_this.playArr[_this.index]).find('img').attr('src', _this.imgsArr[_this.index]).removeAttr('_src', '');
			}
			$(_this.playArr[_index]).addClass('active').siblings().removeClass('active');
		});
	},
	mouseover : function(){
		var _this = this;
		_this.bannerWrap.on('mouseenter', function(){
			clearInterval(_this.timer);
		});
		_this.bannerWrap.on('mouseleave', function(){
			_this.config.autoPlay && _this.autoPlay();
		});
	}
}