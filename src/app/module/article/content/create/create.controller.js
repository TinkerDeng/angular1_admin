angular.module('app').controller('article.content.createController',
	function($scope, $rootScope, $timeout, dimmerService, toastr, articleService, viewsService, relationService, layerService, ngDialog) {
		dimmerService.hide();
		$scope.data = {};
		$scope.data.articleGeneralRecommentSort = 0;
		$scope.data.jsonList = {};
		$scope.data.jsonList.content = [];

		//活动分类
		articleService.getTopicList(0, 100).then(function(data) {
			$scope.topicSort = data.result;
		});

		viewsService.getPostList(0, 1000).then(function(data) {
			if(data.result.length > 0) {
				$scope.views = data.result;
			}
		});
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
			var baiduAddress = {};
			var articleAddress = {};
			var otherAddress = {};
			if($scope.data.lonLat.bd) {
				baiduAddress = JSON.stringify({
					"x": parseFloat($scope.data.lonLat.bd.lng),
					"y": parseFloat($scope.data.lonLat.bd.lat)
				});
				articleAddress = JSON.stringify({
					"x": parseFloat($scope.data.lonLat.gc.lng),
					"y": parseFloat($scope.data.lonLat.gc.lat)
				});
				otherAddress = JSON.stringify({
					"x": parseFloat($scope.data.lonLat.wgs84.lng),
					"y": parseFloat($scope.data.lonLat.wgs84.lat)
				});
				var address = $scope.data.lonLat.address;
			}
			var data = {
				articleTitle: $scope.data.articleTitle,
				startDate: $scope.data.startDate.format('YYYY-MM-DD') + ' 00:00:00',
				endDate: $scope.data.endDate.format('YYYY-MM-DD') + ' 00:00:00',
				addressName: address,
				telephone: $scope.data.telephone,
				activityAddress: $scope.data.activityAddress,
				articlePicture: $scope.data.articlePicture,
				topicId: $scope.data.topicId,
				articleContent: JSON.stringify($scope.data.jsonList),
				articleOtherText: $scope.data.articleOtherText,
				baiduAddress: baiduAddress,
				articleAddress: articleAddress,
				otherAddress: otherAddress,
				articleType: 3,
				articleGeneralRecommentSort: $scope.data.articleGeneralRecommentSort
			};
			articleService.addPost(data).then(function(data) {
				if(!$scope.data.linkArticleId) {
					$rootScope.$state.go('article.content.list', {
						pageNum: 1
					});
					return false;
				}
				var myData = {
					articleId: data.returnId,
					linkArticleId: $scope.data.linkArticleId
				};
				relationService.addRelation(myData).then(function(data) {
					$rootScope.$state.go('article.content.list', {
						pageNum: 1
					});
				});
			});
		};
	}
);