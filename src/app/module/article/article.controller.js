angular.module('app').controller('articleController', function($scope, routerManager) {
	$scope.route = routerManager.getRouteByName('article');
});