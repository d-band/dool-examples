import login from './mods/login.atpl';
import router from '../../common/router';


const main = {
  render:function  () {
    $('#container').append(login());
  },
  init: function() {
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

// $(function() {
//   main.init();
// });
module.exports = main;