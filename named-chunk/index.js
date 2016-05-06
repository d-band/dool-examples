require.ensure(['./a.js'], function(require) {
    var a = require('./a.js');
    console.log(a);
}, 'a');