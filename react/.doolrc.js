module.exports = {
  files: ['index.js'],
  devServer: {
    historyApiFallback: {
      rewrites: [{
        from: /./,
        to: '/index.html'
      }]
    }
  }
}