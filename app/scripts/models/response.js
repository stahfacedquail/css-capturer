/*global cssCapturer, Backbone*/

cssCapturer.Models = cssCapturer.Models || {};

(function () {
    'use strict';

    cssCapturer.Models.ResponseModel = Backbone.Model.extend({

        url: '/response',

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
