angular.module('app').controller('views.content.listController',
	function($scope, $rootScope, dimmerService, initData, viewsService, util,tagRelationService, tagService, layerService, toastr) {
		dimmerService.hide();
		$scope.list = $.map(initData.result, function(item, index) {
			try {
				item.articlePicture = JSON.parse(item.articlePicture);
			} catch(err) {
				item.articlePicture = {};
			}
			return item;
		});
		
		$scope.totalPage = initData.totalPage;
		$scope.other = util.deserialize($rootScope.$stateParams.search);

		$scope.search = function() {	
			$rootScope.$state.go('views.content.list', {
				search: util.serialize($scope.other),
				pageNum: 1
			});
		};
		$scope.conf = {
			name: "tagName",
			bindListPromise: tagRelationService, //已绑定
			allListPromise: tagService, //待绑定
			submitPromise: tagRelationService, //提交
			idName: "tagId"
		};

		$scope.delete = function(id) {
			layerService.confirm('警告', '确定要删除该景点吗？').then(function() {
				viewsService.deletePost(id).then(function() {
					toastr.success('删除成功!');
					$rootScope.$state.reload();
				}, function() {
					toastr.error('该景点已被活动关联，不能被删除!', '删除失败!');
				})
			})
		}
	}
);