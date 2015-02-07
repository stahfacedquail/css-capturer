var entities = require('../models/entities');

exports.fetch = function(req, res) {
	var start_month, start_year, facility_id;
	
	try {
		start_month = parseInt(req.query.start_month);
		start_year = parseInt(req.query.start_year);
		facility_id = parseInt(req.query.facility_id);
	} catch(processQueryError) {
		console.log('error processing questionnaire fetch criteria', processQueryError);
		return res.status(400).json({ error: 'Bad parameters for the questionnaire search were given.' });
	}
	
	createQuestionnaire = req.query.createQuestionnaire; //if one with these props doesn't exist
	
	var q_aire = new entities.Questionnaire({
		"start_month": start_month,
		"start_year": start_year,
		"facility_id": facility_id
	});
	
	var createdQuestionnaire = false;
	
	q_aire.fetch({ withRelated: 'responses' })
	.then(function(questionnaire) {
		console.log('Questionnaire found', questionnaire ? questionnaire.get('id') : 'nothing!');
		
		if(questionnaire)
			return res.status(200).json(questionnaire);
		else {
			createdQuestionnaire = true;
			return q_aire.save();
		}
	})
	.then(function(newQuestionnaire) {
		if(createdQuestionnaire)
			res.status(200).json(newQuestionnaire);
	})
	.catch(function(dbError) {
		console.log('Fetch questionnaire error', dbError.stack || dbError);
		res.status(500).json({ "error": "The questionnaire for that period could not be found." });
	});
};

exports.saveResponse = function(req, res) {
	var response = new entities.Response(req.body);
	
	response.save()
	.then(function(result) {
		console.log('Result of saving response', result);
		res.status(200).json(result);
	})
	.catch(function(saveResponseError) {
		console.log('Error saving response', saveResponseError);
		res.status(500).json({ error: 'An error occurred and the survey response could not be saved.' });
	});
};