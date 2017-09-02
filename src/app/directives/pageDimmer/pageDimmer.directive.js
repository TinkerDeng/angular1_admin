'use strict';
angular.module('app')
	.directive('pageDimmer', function (dimmerService, $rootScope) {
			return {
				templateUrl: 'app/directives/pageDimmer/pageDimmer.html',
				restrict: 'AE',
				replace: true,
				link: function ($scope) {
					$scope.active = dimmerService.active;

					$rootScope.$on('dimmerService.show', function () {
						$scope.active = true;
					});
					$rootScope.$on('dimmerService.hide', function () {
						$scope.active = false;
					})
				}
			};
		}
	);
