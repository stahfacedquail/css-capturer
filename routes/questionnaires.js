var entities = require('../models/entities');

exports.fetch = function(req, res) {
	var startMonth = req.params.startMonth,
		startYear = req.params.startYear,
		facilityId = req.params.facilityId;
		
		
	console.log('yo', req.params);
	
	new entities.Questionnaire({
		"start_month": startMonth,
		"start_year": startYear,
		"facility_id": facilityId
	}).fetch()
	.then(function(questionnaire) {
		console.log('Questionnaire found', questionnaire ? questionnaire.get('id') : 'nothing!');
		res.status(200).json(questionnaire);
	})
	.catch(function(dbError) {
		console.log('Fetch questionnaire error', dbError.stack || dbError);
		res.status(500).json({ "error": "The questionnaire for that period could not be found." });
	});
};