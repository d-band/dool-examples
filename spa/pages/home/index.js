import home from './mods/home.atpl';
import router from '../../common/router';

const main = {
  render: function() {
    $('#container').append(home());
  },
  init: function() {
    console.log('home');
    this.bindEvent();
  },
  bindEvent: function() {
    $('#test2').off('click').on('click', function() {
      router.changePage('login');
    });
  }
};

export default main;
