/*global cssCapturer, Backbone, JST*/

cssCapturer.Views = cssCapturer.Views || {};

(function () {
    'use strict';

    cssCapturer.Views.CaptureView = Backbone.View.extend({

        template: JST['app/scripts/templates/capture.ejs'],
		
		initialize: function(options) {
			var that = this;
			$.ajax('/questionnaire', {
				data: options.query,
				method: 'GET',
				success: function(questionnaire) {
					if(questionnaire) {
						that.questionnaire = questionnaire;
						that.render(questionnaire);
					} else
						that.render({ noQuestionnaire: true });
				}
			});
		},
		
		render: function() {
			this.$el.html(this.template( this.questionnaire ? this.questionnaire : { noQuestionnaire: true }));
				return this;
		}

    });

})();
