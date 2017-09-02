'use strict';
angular.module('app')
	.directive('columnTitleBar', function($rootScope) {
		return {
			templateUrl: 'app/directives/columnTitleBar/columnTitleBar.html',
			restrict: 'AE',
			replace: true,
			link: function($scope, element, attr) {}
		};
	});