angular.module('app').controller('news.category.detailController',
	function($rootScope, $scope, dimmerService, newsService, toastr, initData, ngDialog, layerService, toastr) {
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