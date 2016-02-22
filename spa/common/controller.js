import collect from './collect'
import login from './login'
// import router from './router'  //出错

	
function load(pageId) {
	$('.spa-page').css('z-index',2015);
	require(['../pages/'+ pageId +'/index' ],function () {
  	
  });
}


function controller (template) {
	var dom = $("#main-contain"),
		magicFlowDom = $("#magic-flow"),
		template = template;
	init();

	function init() {
		requireJs();
		collect.pageId = template;  
	}

	function requireJs() {
		if(isLogin()){
			if (!collect[template]) {
				load(template);
				collect[template] = true;
			}else{
				$('.spa-page').css('z-index',2015);
				let cl = '#'+template;
				$(cl).css('z-index',2016);
			}
		}else{
			// router.changePage('login');
		}
		
	}

	function isLogin(){
		if((login.isLogin())!= true && collect.pageId !== 'login'){
			return false;
		}else{
		 	return true;
		}
	}
}
module.exports = controller;




