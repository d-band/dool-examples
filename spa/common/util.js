const util = {
  getUrlArgs: function(type) {
    let url = window.location.href;
    let urlArr = url.split("?");
    if (urlArr[1]) {
      let args = urlArr[1].split("&");
      for (let i = 0; i < args.length; i++) {
        let tmpArr = args[i].split("=");
        if (tmpArr[0] == type) {
          return tmpArr[1];
        }
      }
    }
    return 'home';
  }
};

module.exports = util;