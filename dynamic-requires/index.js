function load(lib) {
  require(['./lib/' + lib], function(run) {
    run();
  });
}

$('.hello').on('click', function() {
  let lib = $(this).data('lib');
  load(lib);
});