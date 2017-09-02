'use strict';
angular.module('app')
	.directive('columnLocation', function($state, routerManager) {
		return {
			templateUrl: 'app/directives/columnLocation/columnLocation.html',
			restrict: 'AE',
			replace: true,
			link: function($scope) {
				var route = routerManager.getRouteByName($state.current.name);

				var routes = [];
				while(1) {
					routes.push(route);
					route = route.parent;
					if(!route) {
						break
					}
				}
				$scope.routes = routes.reverse();
				
				$scope.active = function(item) {
					return $state.is(item.name);
				}
			}
		};
	});