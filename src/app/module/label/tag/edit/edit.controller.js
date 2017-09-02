angular.module('app').controller('label.tag.editController',
	function($rootScope, $scope, dimmerService, tagService, toastr, initData) {
		dimmerService.hide();
		$scope.otherData = {};
		$scope.data = initData.result;
		$scope.submit = function() {
			$scope.otherData.loading = true;
			var data = {
				tagName: $scope.data.tagName,
				tagId: $scope.data.tagId
			};
			tagService.update(data).then(function() {
				$rootScope.back();
				toastr.success($scope.data.topicTitle, '修改成功!');
			}, function() {
				$scope.otherData.loading = false;
				toastr.error($scope.data.topicTitle + '，该标签已存在', '修改失败!');
			})
		}
	}
);