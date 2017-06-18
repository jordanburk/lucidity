var page = require('page');
var fn = require('./functions.js');
var dom = require('./dom.js');

page('/', getRoot);
page('/new', getNew);
page('/about', getAbout);
page('/edit/:entry', getEdit);
page('/:entry', getEntry);

page.exit('/edit/*', leaveEdit);
page.exit('/about', leaveEdit);

page();

function getRoot(context, next) {
  if (state.cap) { state.currentPage = state.cap; }
  fn.renderEntry();
}

function getNew(context, next) {
  dom.box.innerHTML = '';
  dom.button.onclick = fn.createEntry;
  dom.button.innerHTML = 'Create Entry';
  dom.text.innerHTML = '';
  dom.text.appendChild(dom.box);
  dom.text.appendChild(dom.button);
}

function getEdit(context, next) {
  console.log('heya');
}

function getAbout(context, next) {
  state.currentPage = 0;
  if (!state.entries) { return; }
  text.innerHTML = state.entries[0].text;
}

function getEntry(context, next) {
  var entry = parseInt(context.params.entry);
  if (!(entry === entry)) {
    page.redirect('/');
  } else {
    state.currentPage = entry
    fn.renderEntry();
  }
}

function leaveEdit(context, next) {
  console.log('leaving edit');
}
