var page = require('page');
var database = firebase.database()
var currentPage = 1;
var entries, cap;

database.ref().once('value')
  .then( function(snapshot, error) {
    entries = snapshot.val().posts;
    cap = entries.length - 1;
    renderEntry();
  }).catch( function(error) {
    console.log(error);
  })

var text = document.getElementsByClassName('text')[0]
document.getElementById('next').addEventListener('click', nextEntry);
document.getElementById('last').addEventListener('click', lastEntry);
document.getElementById('previous').addEventListener('click', previousEntry);
document.getElementById('first').addEventListener('click', firstEntry);

page('/', getRoot);
page('/about', getAbout);
page('/:entry', getEntry);
page();

function getRoot(...args) {
  currentPage = cap;
  renderEntry();
}

function getAbout(context, next) {
  currentPage = 0;
  renderEntry();
}

function getEntry(context, next) {
  var entry = parseInt(context.params.entry);
  if (!(entry === entry)) {
    page.redirect('/');
  } else {
    currentPage = entry
    renderEntry();
  }
}

function renderEntry() {
  if (!entries) { return }
  if (currentPage > cap) {
    page.redirect('/' + cap)
    return;
  }
  if (currentPage < 1) {
    page.redirect('/1')
    return;
  }
  text.innerHTML = entries[currentPage].text;
}

function nextEntry() {
  page('/' + (currentPage + 1));
}

function previousEntry() {
  page('/' + (currentPage - 1));
}

function lastEntry() {
  page('/' + cap);
}

function firstEntry() {
  page('/1');
}
