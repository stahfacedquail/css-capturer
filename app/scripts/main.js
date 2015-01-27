/*global cssCapturer, $*/


window.cssCapturer = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Hello from Backbone!');
		Object.keys(this.Routers).forEach(function(router) {
			new this.Routers[router]();
		}, this);
		Backbone.history.start();
    }
};

$(document).ready(function () {
    'use strict';
    cssCapturer.init();
});
