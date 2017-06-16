var page = require('page');
var entries = require('./entries.json');
var cap = entries.length - 1;
var currentPage;

document.addEventListener('DOMContentLoaded', function() {
  page('/', getRoot);
  page('/about', getAbout);
  page('/:entry', getEntry);
  page();

  document.getElementById('next').addEventListener('click', clickNext);
  document.getElementById('last').addEventListener('click', clickLast);
  document.getElementById('previous').addEventListener('click', clickPrevious);
  document.getElementById('first').addEventListener('click', clickFirst);
})

function getRoot(...args) {
  currentPage = cap;
  nextEntry();
}

function getAbout(context, next) {
  currentPage = 0;
  nextEntry();
}

function getEntry(context, next) {
  var entry = parseInt(context.params.entry);
  if (!(entry === entry)) { page('/'); }
  if (entry > cap) { entry = cap; }
  if (entry < 1) { entry = 1; }
  currentPage = entry;
  nextEntry();
}


function nextEntry() {
  var elements = document.getElementsByClassName('text')
  elements[0].innerHTML = entries[currentPage].text;
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
  page('/1');
}
