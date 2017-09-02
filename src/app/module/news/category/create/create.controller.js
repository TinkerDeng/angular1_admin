angular.module('app').controller('news.category.createController',
	function($rootScope, $scope, newsService, toastr, dimmerService) {
		dimmerService.hide();
		$scope.data = {};

		//scope.data.startDate = moment(scope.data.startDate);
		//startDate: scope.data.startDate.format('YYYY-MM-DD') + ' 00:00:00',
		$scope.data.jsonList = {};
		$scope.data.jsonList.content = [];

		//推荐到首页的图
		$scope.data.picForList = [];
		$scope.$on('to-parent', function(d, data) {
			if($scope.data.picForList.length >= 3) {
				toastr.error('对不起，最多只能添加三张', '添加失败!');
				return false;
			}
			if(data) {
				$scope.data.picForList.push(data);
			}
		});

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
			var arr = [$scope.data.articlePicture];
			var data = {
				articleTitle: $scope.data.articleTitle,
				articleContent: JSON.stringify($scope.data.jsonList),
				startDate: $scope.data.startDate.format('YYYY-MM-DD') + ' 00:00:00',
				articlePicture: JSON.stringify(arr),
				articleType: 4
			};
			newsService.addPost(data).then(function(data) {
				$rootScope.$state.go('news.category.list', {
					pageNum: 1
				});
			});
		}
	}
);