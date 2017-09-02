angular.module('app').controller('news.content.editController',
	function($rootScope, $scope, dimmerService, ngDialog, newsService, toastr, initData) {
		dimmerService.hide();
		$scope.data = initData.result || {};
		$scope.data.jsonList = {};
		$scope.data.jsonList.content = [];

		//推荐的图片
		$scope.data.picForList = [];
		try {
			if(!$scope.data.articlePicture) {
				$scope.data.picForList = []
			} else {
				$scope.data.picForList = JSON.parse($scope.data.articlePicture);
			}
		} catch(err) {
			$scope.data.picForList = [];
		}
		$scope.$on('to-parent', function(d, data) {
			if($scope.data.picForList.length >= 3) {
				toastr.error('对不起，最多只能添加三张', '添加失败!');
				return false;
			}
			if(data) {
				$scope.data.picForList.push(data);
			}
		});
		//开始结束日期
		$scope.data.startDate = moment($scope.data.startDate);
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
			var data = {
				articleId: $scope.data.articleId,
				articleTitle: $scope.data.articleTitle,
				articleContent: JSON.stringify($scope.data.jsonList),
				startDate: $scope.data.startDate.format('YYYY-MM-DD') + ' 00:00:00',
				articlePicture: JSON.stringify($scope.data.picForList),
				articleType: 1
			};
			newsService.updatePost(data).then(function(data) {
				$rootScope.$state.go('news.content.list', {
					pageNum: 1
				});
			});
		}
	});