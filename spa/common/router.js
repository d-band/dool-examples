import controller from './controller'
import util from './util'

const router = {
  init: function() {
    window.onpopstate = function(event) {
      var template = util.getUrlArgs("t");
      controller(template);
    };
  },
  changePage: function(pageId) {
    var url = '?t=' + pageId;
    console.log(url);
    console.log(controller);
    history.pushState('', '', url);
    controller(pageId);
  }
};

module.exports = router;