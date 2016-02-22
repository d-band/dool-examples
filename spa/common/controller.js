import collect from './collect'
import login from './login'
import router from './router'

function load(pageId, isFirst) {
  $('.spa-page').css('z-index', 2015);
  if (isFirst) {
    require(['../pages/' + pageId + '/index'], function(mod) {
      mod.render();
      mod.init();
    });
  } else {
    require(['../pages/' + pageId + '/index'], function(mod) {
      $('.spa-page').css('z-index', 2015);
      let cl = '#' + pageId;
      $(cl).css('z-index', 2016);
      mod.init();
    });
  }

}


function controller(pageId) {
  var pageId = pageId;
  init();

  function init() {
    requireJs();
    collect.pageId = pageId;
  }

  function requireJs() {

    if (!collect[pageId]) {
      load(pageId, true);
      collect[pageId] = true;
    } else {
      load(pageId, false);
    }


  }

  function isLogin() {
    if ((login.isLogin()) != true && collect.pageId !== 'login') {
      return false;
    } else {
      return true;
    }
  }
}

module.exports = controller;