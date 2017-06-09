var page = require('page');

console.log(page);

page('/', logRootRoute);
page('/:page', getPage);
// page('/user/:id', user.load, user.show)
// page('/user/:id/edit', user.load, user.edit)
page('*', somethingElse);
page();

function logRootRoute(...args) {
  console.log('root');
  console.log(args);
}

function getPage(context, next) {
  console.log(context.params.page);
}

function somethingElse(...args) {
  console.log('other!');
  console.log(args);
}
