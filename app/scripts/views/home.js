/*global cssCapturer, Backbone, JST*/

cssCapturer.Views = cssCapturer.Views || {};

(function () {
    'use strict';

    cssCapturer.Views.HomeView = Backbone.View.extend({

        template: JST['app/scripts/templates/home.ejs'],
		
		events: {
			'submit form': 'requestQuestionnaire'
		},
		
		render: function() {
			this.$el.html(this.template());
				return this;
		},
		
		requestQuestionnaire: function(e) {
			e.preventDefault();
			
			var params = cssCapturer.Utils.serializeForm(this.$('form'));
			Backbone.history.navigate('/capture?' + this.concatenateParams(params), { trigger: true });
			
		},
		
		concatenateParams: function(paramsObj) {
			var paramsStr = "";
			Object.keys(paramsObj).forEach(function(key) {
				paramsStr += ( key + "=" + paramsObj[key] + "&");
			});
			paramsStr = paramsStr.substr(0, paramsStr.length - 1); //leave out last ampersand
			
				return paramsStr;
		}

    });

})();
