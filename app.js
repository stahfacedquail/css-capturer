
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var questionnaires = require('./routes/questionnaires');
var questions = require('./routes/questions');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.static(path.join(__dirname, '.tmp')));
app.use(function(req, res, next) { console.log('a request has come!', req); });

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/questionnaire', questionnaires.fetch);

app.get('/questions', questions.fetch);

app.post('/response', questionnaires.saveResponse);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
