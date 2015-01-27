var db = require('knex')({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : 'csscadmin',
    password : 'csscapturer',
    database : 'csscapturer'
  }
});

exports.bookshelf = require('bookshelf')(db);