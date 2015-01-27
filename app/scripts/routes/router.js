/*global cssCapturer, Backbone*/

cssCapturer.Routers = cssCapturer.Routers || {};

(function () {
    'use strict';

    cssCapturer.Routers.Router = Backbone.Router.extend({
		
		mainContent: $('.main-content'),
		
		routes: {
			'': 'home',
			'capture?:params': 'captureSurvey'
		},

		home: function() {
			var homeView = new cssCapturer.Views.HomeView();
			this.mainContent.html(homeView.render().el);
		},
		
		captureSurvey: function(params) {
			params = params.split("&").reduce(function(objSoFar, paramPair) {
				if(paramPair.indexOf("=") >= 0) {
					paramPair = paramPair.split("=");
					try {
						objSoFar[paramPair[0]] = parseInt(paramPair[1]);
					} catch(e) {
						objSoFar[paramPair[0]] = paramPair[1];
					}
						return objSoFar;
				}
			}, {});
			var captureView = new cssCapturer.Views.CaptureView({ query: params });
			this.mainContent.html(captureView.render().el);
		}

    });

})();
