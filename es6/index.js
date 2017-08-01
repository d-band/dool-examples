import 'babel-polyfill';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class Model {
  constructor() {}
}

class User extends Model {
  name = 'Hello World!';
  constructor() {
    super();
    this.sayHello();
  }
  sayHello() {
    alert(this.name);
  }
}

import B from './b';

alert(B);

async function main() {
  await delay(2000);
  new User();
}

main();
