angular.module('app').controller('views.content.editController',
	function($rootScope, $scope, dimmerService, ngDialog, articleService, toastr, initData) {
		dimmerService.hide();
		$scope.data = initData.result || {};
		//地图定位
		$scope.data.lonLat = {};

		try {
			$scope.data.lonLat.bd = {
				lng: $scope.data.baiduAddress.geometry.x,
				lat: $scope.data.baiduAddress.geometry.y
			};
			$scope.data.lonLat.gc = {
				lng: $scope.data.articleAddress.geometry.x,
				lat: $scope.data.articleAddress.geometry.y
			};
			$scope.data.lonLat.wgs84 = {
				lng: $scope.data.otherAddress.geometry.x,
				lat: $scope.data.otherAddress.geometry.y
			};
			$scope.data.lonLat.address = $scope.data.addressName;
		} catch(e) {}
		//活动内容
		$scope.data.jsonList = {};

		try {
			var content = JSON.parse($scope.data.articleContent);
			for(var i = 0; i < content.content.length; i++) {
				try {
					content.content[i].info = JSON.parse(content.content[i].info);
					$scope.data.jsonList.content = content.content || [];
				} catch(err) {

				}
			}
			$scope.data.jsonList.content = content.content;
		} catch(err) {
			$scope.data.jsonList.content = [];
		}
		//提交
		$scope.submit = function() {
			//内容内容
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
				articleId: $scope.data.articleId,
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
			articleService.updatePost(data).then(function(data) {
				$rootScope.$state.go('views.content.list', {
					pageNum: 1
				});
			});
		};
	});