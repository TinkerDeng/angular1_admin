angular.module('app').controller('labelController', function($scope, routerManager) {
	$scope.route = routerManager.getRouteByName('label');
});