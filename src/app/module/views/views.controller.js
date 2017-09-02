angular.module('app').controller('viewsController', function($scope, routerManager) {
	$scope.route = routerManager.getRouteByName('views');
});