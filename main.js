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
document.getElementById('mobile-spacer').addEventListener('click', neww);

var box = document.createElement('textarea');
var button = document.createElement('button');
box.id = 'box';

page('/', getRoot);
page('/new', getNew);
page('/about', getAbout);
page('/edit/:entry', getEdit);
page('/:entry', getEntry);

page.exit('/edit/*', leaveEdit);
page.exit('/about', leaveEdit);

page();

function getRoot() {
  if (cap) { currentPage = cap; }
  renderEntry();
}

function getNew() {
  box.innerHTML = '';
  button.onclick = createEntry;
  button.innerHTML = 'Create Entry';
  text.innerHTML = '';
  text.appendChild(box);
  text.appendChild(button);
}

function getEdit() {
  console.log('heya');
}

function getAbout(context, next) {
  currentPage = 0;
  if (!entries) { return; }
  text.innerHTML = entries[0].text;
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

function leaveEdit() {
  console.log('leaving edit');
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

function neww() {
  page('/new');
}

function createEntry() {
  var content = document.getElementById('box').value;
  entries.push({ text: content });
  cap += 1;
  database.ref('posts').set(entries);
  page.redirect('/' + cap);
}
