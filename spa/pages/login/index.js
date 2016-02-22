import login from './mods/login.atpl';
import router from '../../common/router';


const main = {
  init: function() {
  	$('#container').append(login());
  	this.bindEvent();
  	console.log('login');
  },
  bindEvent:function () {
  	$('#test').click(function () {
  		// controller('home');
      router.changePage('home');
      
  	});
  }
};

$(function() {
  main.init();
});