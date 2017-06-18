var dom = require ('./dom.js');
var state = require('./state.js');
var database = firebase.database();
var page = require('page');

function renderEntry() {
  if (!state.entries) { return }
  if (state.currentPage > state.cap) {
    page.redirect('/' + state.cap)
    return;
  }
  if (state.currentPage < 1) {
    page.redirect('/1')
    return;
  }
  dom.text.innerHTML = state.entries[state.currentPage].text;
}

function nextEntry() {
  page('/' + (state.currentPage + 1));
}

function previousEntry() {
  page('/' + (state.currentPage - 1));
}

function lastEntry() {
  page('/' + state.cap);
}

function firstEntry() {
  page('/1');
}

function neww() {
  page('/new');
}

function createEntry() {
  var content = dom.box.value;
  state.entries.push({ text: content });
  state.cap += 1;
  database.ref('posts').set(state.entries);
  page.redirect('/' + state.cap);
}

module.exports = {
  renderEntry,
  nextEntry,
  previousEntry,
  firstEntry,
  lastEntry,
  neww,
  createEntry
};
