/*global cssCapturer, Backbone, JST*/

cssCapturer.Views = cssCapturer.Views || {};

(function () {
    'use strict';

    cssCapturer.Views.QuestionView = Backbone.View.extend({

        template: JST['app/scripts/templates/question.ejs'],
		
		tagName: 'tr',
		
		events: {
			"click button#clear": "clearSelection"
		},
		
		clearSelection: function() {
			this.$('input[type="radio"]').prop('checked', false);
		},
		
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			
			if(this.model.get('inpatient_only')) {
				this.$el.css('display', 'none');
				this.$el.addClass('inpatient-only');
			}
				return this;
		}

    });

})();
