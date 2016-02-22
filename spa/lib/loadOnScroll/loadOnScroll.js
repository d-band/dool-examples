/**
 * loadOnScroll组件，用于在页面滚动时动态加载数据
 * 可以支持修改属性，刷新以及停止功能
 * 兼容ie6+, ff, chrome...
 * @authors diving (liujiejunior@gmail.com)
 * @date    2014-04-24 16:20:57
 * @version $Id$
 */

var loadOnScroll = (function($){

	var getSize = function(elem, vertical, type){
		if(type && type == "scroll"){
			return vertical ?  $(elem).scrollTop() : $(elem).scrollLeft();
		}
		return vertical ?  $(elem).height() : $(elem).width();
	};
	
	/*
	 * 组件声明
	 */
	var _loadOnScroll = function(options){
		this.containerSize = 0;
		this.containerScroll = 0;
		this.elementSize = 0;
		this.isLoading = false;
		this.opts = {
			element: document.body,  //可以自动伸缩的元素
			container: window,  //默认的容器
			vertical: true, //是否垂直方向滚动
			threshold: 200,  //加载的阈值，即滚动至离底部或右侧多大距离时加载
			loadTimes: "infinite", // 加载的次数，可以无限次（默认），或者固定的次数
			onload: function(o){} //加载的主体函数，可以是普通函数或者是ajax请求
		};
		$.extend(this.opts, options);
		this.init();		
	};
	/*
	 * 组件初始化方法
	 */
	_loadOnScroll.prototype.init = function(){
		var self = this,
			opts = self.opts;
		this.containerSize = getSize(opts.container, opts.vertical);
		this.elementSize = getSize(opts.element, opts.vertical);
		 	
		$(opts.container).bind("scroll", {instance: self}, self.load);
		$(opts.container).bind("resize", {instance: self}, self.load);
	};
	/*
	 * 修改默认属性的方法，用户可以在使用过程中，修改某个属性
	 */
	_loadOnScroll.prototype.options = function(options){
		if($.type(options) !== "object"){
			return;
		}
		opts = $.extend(opts, options);
	};
	/*
	 * 绑定的加载事件
	 */
	_loadOnScroll.prototype.load = function(e){
		var self = e.data.instance || this,
			opts = self.opts;
		self.containerScroll = getSize(opts.container, opts.vertical, "scroll");
		if(e.type == "resize"){
			self.containerSize = getSize(opts.container, opts.vertical);
		}
		//console.log(self.containerScroll + ", elementSize:" + self.elementSize + ", containerSize:" + self.containerSize);
		if(self.elementSize - self.containerSize - self.containerScroll < opts.threshold){
			if(!self.isLoading && opts.loadTimes){
				self.isLoading = true;
				//do sth
				opts.onload && opts.onload(self);
			}else if(opts.loadTimes == 0){
				self.stop();
			}
		}
	};
	/*
	 * 刷新组件，主要是对子元素大小，加载状态等的更新，这个是作为用户自定义函数的必须的回调
	 */
	_loadOnScroll.prototype.refresh = function(){
		var self = this,
			opts = self.opts;
		self.elementSize = getSize(opts.element, opts.vertical);	
		self.isLoading = false;
		if(opts.loadTimes !== "infinite") opts.loadTimes--;	
	};
	/*
	 * 停止组件，去除事件绑定
	 */
	_loadOnScroll.prototype.stop = function(){	
		$(this.opts.container).unbind("scroll", self.load);
		$(this.opts.container).unbind("resize",self.load);
	};

	return _loadOnScroll;
})($);