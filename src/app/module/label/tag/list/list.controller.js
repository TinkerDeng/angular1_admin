angular.module('app').controller('label.tag.listController',
	function($rootScope, $scope, ngDialog, layerService, toastr, dimmerService, initData, tagService) {
		dimmerService.hide();
		$scope.list = initData.result;
		$scope.totalPage = initData.totalPage;
		$scope.data = {};
		$scope.delete = function(id) {
			layerService.confirm('警告', '确认要删除该标签么？').then(function() {
				tagService.delete(id).then(function() {
					toastr.success('删除成功!');
					$rootScope.$state.reload();
				}, function() {
					toastr.error('改标签已被关联', '删除失败!');
				})
			})
		};
	}
);