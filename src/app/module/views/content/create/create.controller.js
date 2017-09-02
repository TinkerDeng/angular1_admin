angular.module('app').controller('views.content.createController',
	function($scope, $rootScope, $timeout, dimmerService, toastr, articleService, layerService, ngDialog) {
		dimmerService.hide();
		$scope.data = {};
		//scope.data.startDate = moment(scope.data.startDate);
		//startDate: scope.data.startDate.format('YYYY-MM-DD') + ' 00:00:00',

		$scope.data.jsonList = {};
		$scope.data.jsonList.content = [];
		$scope.data.jsonList.recommend = [];

		//地图定位
		$scope.data.lonLat = {};

		$scope.submit = function() {
			//内容
			var content = $scope.data.jsonList.content;
			var last = content.length - 1;
			if(content[last].isTextarea) {
				content[last].isTextarea = false;
				var info = content[last].info.replace(/^\s\s*/, "");
				if(!info) {
					$scope.data.jsonList.content.splice(last, 1);
				}
			}
			if($scope.data.lonLat.bd) {
				var baiduAddress = JSON.stringify({
					"x": parseFloat($scope.data.lonLat.bd.lng),
					"y": parseFloat($scope.data.lonLat.bd.lat)
				});
				var articleAddress = JSON.stringify({
					"x": parseFloat($scope.data.lonLat.gc.lng),
					"y": parseFloat($scope.data.lonLat.gc.lat)
				});
				var otherAddress = JSON.stringify({
					"x": parseFloat($scope.data.lonLat.wgs84.lng),
					"y": parseFloat($scope.data.lonLat.wgs84.lat)
				});
				var address = $scope.data.lonLat.address;
			}
			var data = {
				articleTitle: $scope.data.articleTitle,
				addressName: address,
				telephone: $scope.data.telephone,
				articlePicture: $scope.data.articlePicture,
				articleContent: JSON.stringify($scope.data.jsonList),
				articleOtherText: $scope.data.articleOtherText,
				baiduAddress: baiduAddress,
				articleAddress: articleAddress,
				otherAddress: otherAddress,
				articleType: 2
			};
			articleService.addPost(data).then(function(data) {
				$rootScope.$state.go('views.content.list', {
					pageNum: 1
				});
			});
		};
	}
);