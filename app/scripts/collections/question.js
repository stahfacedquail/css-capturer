/*global cssCapturer, Backbone*/

cssCapturer.Collections = cssCapturer.Collections || {};

(function () {
    'use strict';

    cssCapturer.Collections.QuestionCollection = Backbone.Collection.extend({

        model: cssCapturer.Models.QuestionModel,
		
		url: '/questions'

    });

})();
