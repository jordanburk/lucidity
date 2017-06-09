var page = require('page');
var entries = require('./entries.json');
var cap = entries.length - 1;
var currentPage;

document.addEventListener('DOMContentLoaded', function() {
  page('/', logRootRoute);
  page('/test', pageTest);
  page('/:entry', getEntry);
  page('*', somethingElse);
  page();

  document.getElementById('next').addEventListener('click', clickNext);
  document.getElementById('last').addEventListener('click', clickLast);
  document.getElementById('previous').addEventListener('click', clickPrevious);
  document.getElementById('first').addEventListener('click', clickFirst);
})

function logRootRoute(...args) {
  console.log('root!');
}

function getEntry(context, next) {
  var entry = parseInt(context.params.entry);
  if (entry > cap) { entry = cap; }
  if (entry < 0) { entry = 0; }
  currentPage = entry;
  nextEntry(entry);
}

function pageTest() {
  console.log(ctx);

}

function somethingElse(...args) {
  console.log('other!');
}

function nextEntry(entry) {
  var elements = document.getElementsByClassName('text')
  console.log(elements[0]);
  elements[0].innerHTML = entries[entry].text;
}

function clickNext() {
  page('/' + (currentPage + 1));
}

function clickPrevious() {
  page('/' + (currentPage - 1));
}

function clickLast() {
  page('/' + cap);
}

function clickFirst() {
  page('/0');
}
