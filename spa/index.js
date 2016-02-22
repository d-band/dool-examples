import collect from './common/collect'
import router from './common/router'
import util from './common/util'


const main = {
  init: function() {
    collect.init();
    router.init();
	let template = util.getUrlArgs("t") || "home";
    router.changePage(template);
  }
};

$(function() {
  main.init();
});