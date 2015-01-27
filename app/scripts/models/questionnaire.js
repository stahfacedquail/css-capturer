/*global cssCapturer, Backbone*/

cssCapturer.Models = cssCapturer.Models || {};

(function () {
    'use strict';

    cssCapturer.Models.QuestionnaireModel = Backbone.Model.extend({

        url: '/questionnaire',

        /*initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }*/
    });

})();
