module.exports = {
  files: ['page-*.js'],
  commons: [{
    name: 'common',
    chunks: 'initial',
    minChunks: 2,
    enforce: true
  }, {
    test: /node_modules/gi,
    name: 'vendor',
    chunks: 'all',
    priority: 10,
    enforce: true
  }]
}
