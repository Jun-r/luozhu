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
			_this.thumb_scroll(_this.index);
		});
		_this.next.on('click',function(){
			clearInterval(_this.timer);
			_this.index++;
			if(_this.index>=length){
				_this.index=0;
			}
			_this.transtions();
			_this.thumb_scroll(_this.index);
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
	thumb_scroll:function(index){
		var _this=this, x, offsetL, navWidth, maxScrollX;
		offsetL = _this.thumbnailsArr[index].offsetLeft+_this.thumbnailsArr[0].offsetWidth/2;
		navWidth = 800;
		maxScrollX=_this.thumbnailWidth*_this.thumbnailsArr.length-navWidth;
		x=Math.max(Math.min(0, -offsetL + (navWidth / 2)), -maxScrollX);
		_this.thumb_ul.css({
			'transform':'translate('+x+'px,0)',
			'webkitTransform':'webkitTranslate('+x+'px,0)'
		});
		$(_this.thumbnailsArr[index]).addClass('active').siblings().removeClass('active');
		if($(_this.thumbnailsArr[index+2]).find('img').attr('_src')){
			$(_this.thumbnailsArr[index+2]).find('img').attr('src', $(_this.thumbnailsArr[index+2]).find('img').attr('_src'));
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
