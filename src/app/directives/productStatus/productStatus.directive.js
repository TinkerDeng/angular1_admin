'use strict';
angular.module('app').directive('productStatus',
	function () {
		return {
			templateUrl: 'app/directives/productStatus/productStatus.html',
			restrict: 'AE',
			replace: true,
			scope: {
				data: '='
			},
			link: function ($scope) {

			}
		};
	}
);
