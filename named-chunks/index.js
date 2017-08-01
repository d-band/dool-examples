async function getComponent() {
  var element = document.createElement('div');
  const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');
  var button = document.createElement('button');
  var br = document.createElement('br');
  button.innerHTML = 'Click me and look at the console!';
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.appendChild(br);
  element.appendChild(button);
  button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    var print = module.default;
    print();
  });
  return element;
}

getComponent().then(component => {
  document.body.appendChild(component);
});
