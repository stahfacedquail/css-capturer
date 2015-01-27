var bookshelf = require('../config/db').bookshelf;

var User = bookshelf.Model.extend({
	tableName: 'users'
});

var Users = bookshelf.Collection.extend({
	model: User
});

var Facility = bookshelf.Model.extend({
	tableName: 'facilities'
});

var Facilities = bookshelf.Collection.extend({
	model: Facility
});

var Questionnaire = bookshelf.Model.extend({
	tableName: 'questionnaires'
});

var Questionnaires = bookshelf.Collection.extend({
	model: Questionnaire
});

var Response = bookshelf.Model.extend({
	tableName: 'responses'
});

var Responses = bookshelf.Collection.extend({
	model: Response
});

var Question = bookshelf.Model.extend({
	tableName: 'questions'
});

var Questions = bookshelf.Collection.extend({
	model: Question
});

exports.User = User;
exports.Users = Users;
exports.Facility = Facility;
exports.Facilities = Facilities;
exports.Questionnaire = Questionnaire;
exports.Questionnaires = Questionnaires;
exports.Response = Response;
exports.Responses = Responses;
exports.Question = Question;
exports.Questions = Questions;