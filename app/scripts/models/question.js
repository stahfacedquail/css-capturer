/*global cssCapturer, Backbone*/

cssCapturer.Models = cssCapturer.Models || {};

(function () {
    'use strict';

    cssCapturer.Models.QuestionModel = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
