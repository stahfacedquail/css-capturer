/*global cssCapturer, Backbone, JST*/

cssCapturer.Views = cssCapturer.Views || {};

(function () {
    'use strict';

    cssCapturer.Views.CaptureView = Backbone.View.extend({

        template: JST['app/scripts/templates/capture.ejs'],
		
		initialize: function(options) {
			var that = this;
			this.dataForRender = { noQuestionnaire: true, numberOfQuestionnairesPlusOne: 1, position: 1 };
			$.ajax('/questionnaire', {
				data: _.extend({ createQuestionnaire: true }, options.query),
				method: 'GET',
				success: function(questionnaire) {
					if(questionnaire) {
						that.questionnaire = questionnaire;
						that.dataForRender.noQuestionnaire = false;
						that.dataForRender.numberOfQuestionnairesPlusOne = questionnaire.responses.length + 1;
						that.dataForRender.position = that.dataForRender.numberOfQuestionnairesPlusOne;
						that.render(that.dataForRender);
					} else
						that.render(that.dataForRender);
				}
				
				//TO-DO: handle error!  Can't carry on with capture screen :|
			});
		},
		
		events: {
			"click button#goToFirst"								: "goToFirst",
			"click button#goToPrevious"								: "goToPrevious",
			"click button#goToNext"									: "goToNext",
			"click button#goToLast"									: "goToLast",
			"change select#type"									: "updateQuestionSet",
			"click button#close"									: "saveAndClose",
			"click button#delete"									: "deleteForm",
			"submit form#moveTo"									: "goToSpecificSurvey",
			"submit form#survey"									: "saveAndNew",
			"click button#generateStats" 							: "goToStatsGenerator",
			"click button#goHome"									: "goHome"
		},
		
		render: function() {
			this.$el.html(this.template(this.dataForRender));
			
			var that = this,
				$tbody = this.$('table#questions tbody');
			this.childrenViews = this.childrenViews || [];
			
			if(this.questions) {
				this.questions.forEach(function(questionModel) {
					var questionView = new cssCapturer.Views.QuestionView({ model: questionModel });
					$tbody.append(questionView.render().el);
				});
			} else {
				new cssCapturer.Collections.QuestionCollection().fetch({
					success: function(questions) {
						that.questions = questions;
						questions.forEach(function(questionModel) {
							var questionView = new cssCapturer.Views.QuestionView({ model: questionModel });
							$tbody.append(questionView.render().el);
						});
					}
				});
			}
				return this;
		},
		
		removeBackdrop: function() {
			console.debug('removing backdrop', $('.modal-backdrop'));
			$('.modal-backdrop').removeClass('modal-backdrop');
		},
		
		goHome: function() {
			this.removeBackdrop();
			Backbone.history.navigate('/', { trigger: true });
		},
		
		goToStatsGenerator: function() {
			this.removeBackdrop();
		},
		
		updateQuestionSet: function() {
			var chosenType = this.$('select#type').val();
			
			if(chosenType === 'inpatient')
				this.$('tr.inpatient-only').show();
			else
				this.$('tr.inpatient-only').hide();
		},
		
		saveForm: function(cb) {
			var surveyResponse = cssCapturer.Utils.serializeForm(this.$('form#survey'));
			try {
				surveyResponse.questionnaire_id = this.questionnaire.id;
				
				new cssCapturer.Models.ResponseModel(surveyResponse).save({}, {
					success: function() {
						if(cb) { console.debug('there is a cb!'); cb(); }
						else console.debug('there is no cb');
					}
				});
			} catch(saveFormError) {
				console.debug('error saving form', saveFormError);
			}
		},
		
		saveAndNew: function(e) {
			e.preventDefault();
			var that = this;
			this.saveForm(function() {
				toastr.success('Questionnaire saved');
			
				that.dataForRender.numberOfQuestionnairesPlusOne += 1;
				that.dataForRender.position += 1;
				that.render(that.dataForRender);
			});
		},
		
		saveAndClose: function(e) {
			e.preventDefault();
			var that = this;
			this.saveForm(function() {
				that.$('div#confirmCaptureCloseModal').modal({
					backdrop: "static"
				});
			});
		}

    });

})();
