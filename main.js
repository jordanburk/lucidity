var page = require('node_modules/page/index.js')

page('/', root)
page('/user/:id', user.load, user.show)
page('/user/:id/edit', user.load, user.edit)
page('*', notfound)

function root(...args) {
  console.log(args)
}
