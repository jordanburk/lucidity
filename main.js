var page = require('page')

page('/', root)
page('/:argument', argument)
// page('/user/:id', user.load, user.show)
// page('/user/:id/edit', user.load, user.edit)
// page('*', notfound)

function root(...args) {
  console.log(args)
}

function argument(...args) {
  console.log(args)
}
