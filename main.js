require('page')

page('/', logRootRoute)
page('/:argument', argument)
// page('/user/:id', user.load, user.show)
// page('/user/:id/edit', user.load, user.edit)
page('*', somethingElse)

function logRootRoute(...args) {
  console.log('root')
  console.log(args)
}

function argument(...args) {
  console.log(args)
}

function somethingElse(...args) {
  console.log('other!')
  console.log(args)
}
