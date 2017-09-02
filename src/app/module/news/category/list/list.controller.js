angular.module('app').controller('news.category.listController',
	function($rootScope, $scope, ngDialog, layerService, dimmerService, initData, newsService, tagRelationService, tagService, toastr) {
		dimmerService.hide();
		$scope.list = initData.result;
		$scope.totalPage = initData.totalPage;
		$scope.data = {};
		$scope.conf = {
			name: "tagName",
			bindListPromise: tagRelationService, //已绑定
			allListPromise: tagService, //待绑定
			submitPromise: tagRelationService, //提交
			idName: "tagId"
		};
		$scope.delete = function(id) {
			layerService.confirm('警告', '确定要删除该轮播吗？').then(function() {
				newsService.deletePost(id).then(function() {
					toastr.success('删除成功!');
					$rootScope.$state.reload();
				}, function() {
					toastr.error('该轮播不能删除', '删除失败!');
				})
			})
		}
	}
);