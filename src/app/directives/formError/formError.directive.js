'use strict';
angular.module('app')
	.directive('formError', function() {
		return {
			templateUrl: 'app/directives/formError/formError.html',
			restrict: 'AE',
			replace: true,
			transclude: true
		};
	});