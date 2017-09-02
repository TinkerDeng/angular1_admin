'use strict';

angular.module('app').controller('loginController',
	function($rootScope, $scope, localStorageService, tokenService) {
		$scope.data = {};
		$scope.otherData = {};
		$scope.submit = function() {

			localStorageService.set('token', "private");
			$rootScope.$state.go('home');
			/*$scope.otherData.loading = true;
			$scope.otherData.loginFail = false;
			tokenService.getToken($scope.data.username, $scope.data.password).then(function(data) {
				localStorageService.set('token', data.access_token);
				$rootScope.$state.go('home');
			}, function() {
				$scope.otherData.loading = false;
				$scope.otherData.loginFail = true;
			});*/
		}
	}
);