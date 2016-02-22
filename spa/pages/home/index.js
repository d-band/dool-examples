import home from './mods/home.atpl';
import router from '../../common/router';

const main = {
  render:function  () {
    $('#container').append(home());
  },
  init: function() {
  	console.log('home');
  	this.bindEvent()
  },
  bindEvent:function () {
  	$('#test2').click(function () {
      router.changePage('login');
  	});
  }
};

module.exports = main;
