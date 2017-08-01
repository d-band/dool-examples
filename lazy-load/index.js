document.getElementById('button').onclick = e => (
import ('./print').then(module => {
  const print = module.default;
  print();
}));
