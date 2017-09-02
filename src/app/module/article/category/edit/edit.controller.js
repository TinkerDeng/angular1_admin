angular.module('app').controller('article.category.editController',
	function($rootScope, $scope, dimmerService, articleService, toastr, initData) {
		dimmerService.hide();
		$scope.otherData = {};
		$scope.data = initData.result;
		$scope.submit = function() {
			$scope.otherData.loading = true;
			var data = {
				topicId: $scope.data.topicId,
				topicTitle: $scope.data.topicTitle
			};
			articleService.updateTopic(data).then(function() {
				$rootScope.back();
				toastr.success($scope.data.topicTitle, '修改成功!');
			}, function() {
				$scope.otherData.loading = false;
				toastr.error($scope.data.topicTitle + '，该帖子已存在', '修改失败!');
			})
		}
	}
);