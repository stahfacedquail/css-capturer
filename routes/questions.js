var entities = require('../models/entities');

exports.fetch = function(req, res) {
	new entities.Questions().fetch()
	.then(function(questions) {
		res.status(200).json(questions);
	})
	.catch(function(fetchQuestionsError) {
		console.log('error fetching questions', fetchQuestionsError.stack || fetchQuestionsError);
		res.status(500).json({ error: "An error occurred while trying to load the survey questions." });
	});
};