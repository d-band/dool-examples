import collect from './common/collect'
import controller from './common/controller'
import router from './common/router'
import util from './common/util'


const main = {
  init: function() {
    collect.init();
    router.init();
    let template = util.getUrlArgs("t") || "home";
    controller(template);
  }
};

$(function() {
  main.init();
});