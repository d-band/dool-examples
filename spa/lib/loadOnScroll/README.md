loadOnScroll
============
loadOnScroll组件，用于在页面或者元素滚动时动态加载数据，支持垂直滚动和水平滚动。

构造属性：

  	element: document.body,  //可以自动伸缩的元素
  
	container: window,  //默认的容器
	
	vertical: true, //是否垂直方向滚动，否则是水平滚动
	
	threshold: 200,  //加载的阈值，即滚动至离底部或右侧多大距离时加载
	
	loadTimes: "infinite", // 加载的次数，可以无限次（默认），或者固定的次数
	
	onload: function(o){} //加载的主体函数，可以是普通函数或者是ajax请求
	
公共方法：

    options：修改默认属性的方法，用户可以在使用过程中，修改上面某个（些）属性，参数是对象，key-value格式
  
    refresh：刷新组件，只要是对子元素大小，加载状态等的更新，这个是作为用户自定义函数的必须的回调
  
    stop： 停止组件，去除事件绑定
  
Example：

    var los = new loadOnScroll({
			loadTimes: 2,
			onload: function(o){
				$("#itemList").append('<div class="item"></div><div class="item"></div>');
				los.refresh();
			}
		});
		更多可以参见test.html
