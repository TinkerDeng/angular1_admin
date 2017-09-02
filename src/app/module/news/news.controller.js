angular.module('app').controller('newsController', function($scope, routerManager) {
	$scope.route = routerManager.getRouteByName('news');
});