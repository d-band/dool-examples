import login from './mods/login.atpl';
import router from '../../common/router';


const main = {
  render: function() {
    $('#container').append(login());
  },
  init: function() {
    this.bindEvent();
    console.log('login');
  },
  bindEvent: function() {
    $('#test').off('click').on('click', function() {
      router.changePage('home');
    });
  }
};

module.exports = main;