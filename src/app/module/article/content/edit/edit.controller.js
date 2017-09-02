angular.module('app').controller('article.content.editController',
	function($rootScope, $scope, dimmerService, ngDialog, articleService, toastr, viewsService, relationService, initData) {
		dimmerService.hide();
		$scope.data = initData[0].result || {};
		$scope.data.articleGeneralRecommentSort = $scope.data.articleGeneralRecommentSort || 0;
		//活动分类
		$scope.topicSort = initData[1].result || {};
		for(var i = 0; i < $scope.topicSort.length; i++) {
			if($scope.topicSort[i].topicId == $scope.data.topicId) {
				$scope.data.topicTitle = $scope.topicSort[i].topicTitle;
			}
		}

		//所有景点
		viewsService.getPostList(0, 10000).then(function(data) {
			$scope.views = data.result;
		});

		//已关联的景点
		relationService.getList($scope.data.articleId, 0, 10000).then(function(data) {
			if(data.result.length <= 0) {
				$scope.isRelation = false;
			} else {
				$scope.isRelation = true;
				for(var i = 0; i < data.result.length; i++) {
					$scope.data.linkArticleId = data.result[i].linkArticleId;
					$scope.data.viewsTitle = data.result[i].articleTitle;
					$scope.data.relationId = data.result[i].relationId;
				}
			}
		});

		//开始结束日期
		$scope.data.startDate = moment($scope.data.startDate);
		$scope.data.endDate = moment($scope.data.endDate);

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
		} catch(e) {

		}

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
			//内容
			var content = $scope.data.jsonList.content;
			var last = content.length - 1;
			if(content[last].isTextarea) {
				content[last].isTextarea = false;
				var info = content[last].info.replace(/^\s\s*!/, "");
				if(!info) {
					$scope.data.jsonList.content.splice(last, 1);
				}
			}

			//经纬度
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
				articleId: $scope.data.articleId,
				articleTitle: $scope.data.articleTitle,
				startDate: $scope.data.startDate.format('YYYY-MM-DD') + ' 00:00:00',
				endDate: $scope.data.endDate.format('YYYY-MM-DD') + ' 00:00:00',
				addressName: address,
				telephone: $scope.data.telephone,
				activityAddress: $scope.data.activityAddress,
				articlePicture: $scope.data.articlePicture,
				articleGeneralRecommentSort: $scope.data.articleGeneralRecommentSort,
				topicId: $scope.data.topicId,
				articleContent: JSON.stringify($scope.data.jsonList),
				articleOtherText: $scope.data.articleOtherText,
				baiduAddress: baiduAddress,
				articleAddress: articleAddress,
				otherAddress: otherAddress,
				articleType: 3
			};
			articleService.updatePost(data).then(function(data) {
				if(!$scope.data.linkArticleId) {
					$rootScope.$state.go('article.content.list', {
						pageNum: 1
					});
					return false;
				}
				if($scope.isRelation) {
					var myData = {
						articleId: $scope.data.articleId,
						linkArticleId: $scope.data.linkArticleId,
						relationId: $scope.data.relationId
					};
					relationService.updateRelation(myData).then(function(data) {
						$rootScope.$state.go('article.content.list', {
							pageNum: 1
						});
					});
				} else {
					var myData = {
						articleId: $scope.data.articleId,
						linkArticleId: $scope.data.relationId,
					};
					relationService.addRelation(myData).then(function(data) {
						$rootScope.$state.go('article.content.list', {
							pageNum: 1
						});
					});
				}
			});
		};
	});