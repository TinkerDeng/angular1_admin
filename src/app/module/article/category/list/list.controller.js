angular.module('app').controller('article.category.listController',
	function($rootScope, $scope, ngDialog, layerService, toastr, dimmerService, initData, articleService) {
		dimmerService.hide();
		$scope.list = initData.result;
		$scope.totalPage = initData.totalPage;
		$scope.data = {};
		$scope.delete = function(topicId) {
			layerService.confirm('警告', '确认要删除该分类么？').then(function() {
				articleService.deleteTopic(topicId).then(function() {
					toastr.success('删除成功!');
					$rootScope.$state.reload();
				}, function() {
					toastr.error('该分类下有活动，不能被删除!', '删除失败!');
				})
			})
		};
	}
);