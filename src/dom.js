var fn = require('./functions.js');

var text = document.getElementsByClassName('text')[0]
document.getElementById('next').addEventListener('click', fn.nextEntry);
document.getElementById('last').addEventListener('click', fn.lastEntry);
document.getElementById('previous').addEventListener('click', fn.previousEntry);
document.getElementById('first').addEventListener('click', fn.firstEntry);
document.getElementById('mobile-spacer').addEventListener('click', fn.neww);

var box = document.createElement('textarea');
var button = document.createElement('button');
box.id = 'box';

module.exports = {
  text,
  box,
  button
};
