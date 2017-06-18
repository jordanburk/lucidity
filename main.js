var page = require('page');
var database = firebase.database()

var state = require('./src/state.js')
var fn = require('./src/functions.js')

require('./src/dom.js')
require('./src/routes.js');

database.ref().once('value')
  .then( function(snapshot, error) {
    state.entries = snapshot.val().posts;
    state.cap = state.entries.length - 1;
    fn.renderEntry();
  }).catch( function(error) {
    console.log(error);
  })
