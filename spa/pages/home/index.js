import home from './mods/home.atpl';
import router from '../../common/router';

const main = {
  init: function() {
  	$('#container').append(home());
  	console.log('home');
  	this.bindEvent()
  },
  bindEvent:function () {
  	$('#test2').click(function () {
      router.changePage('login');
  	});
  }
};

$(function() {
  main.init();
});