angular.module('app').controller('news.content.listController',
	function($scope, $rootScope, dimmerService, initData,util, newsService, tagRelationService, tagService, layerService, toastr) {
		dimmerService.hide();
		$scope.list = initData.result;
		$scope.totalPage = initData.totalPage;
		$scope.conf = {
			name: "tagName",
			bindListPromise: tagRelationService, //已绑定
			allListPromise: tagService, //待绑定
			submitPromise: tagRelationService, //提交
			idName: "tagId"
		};
		
		$scope.other = util.deserialize($rootScope.$stateParams.search);
		
		$scope.search = function() {
			$rootScope.$state.go('news.content.list', {
				search: util.serialize($scope.other),
				pageNum: 1
			});
		};

		$scope.delete = function(id) {
			layerService.confirm('警告', '确定要删除该新闻吗？').then(function() {
				newsService.deletePost(id).then(function() {
					toastr.success('删除成功!');
					$rootScope.$state.reload();
				}, function() {
					toastr.error('该新闻不能删除', '删除失败!');
				})
			})
		}
	}
);