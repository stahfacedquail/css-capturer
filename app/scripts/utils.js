/*global cssCapturer */

'use strict';

cssCapturer.Utils = {
	serializeForm: function(form) {
		return form.serializeArray().reduce(function(objSoFar, next) {
			objSoFar[next.name] = next.value || null;
			return objSoFar;
		}, {});
	}
};