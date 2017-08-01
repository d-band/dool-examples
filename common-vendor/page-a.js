import $ from 'jquery';
import utils from './utils';
import fnA from './fn-a';

fnA();
utils();
console.log('page a');

$('#root').text('Page A');
