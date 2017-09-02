angular.module('app').controller('views.content.detailController',
	function($rootScope, $scope, dimmerService, viewsService, toastr, initData, ngDialog, layerService, toastr) {
		dimmerService.hide();

		$scope.data = initData.result;
		$scope.otherData = {};
		$scope.data.jsonList = {};
	
		try {
			$scope.data.jsonList = JSON.parse($scope.data.articleContent);
		} catch(err) {
			$scope.data.jsonList.content = [];
		}
	}
);