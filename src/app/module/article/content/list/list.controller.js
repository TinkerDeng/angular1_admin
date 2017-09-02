angular.module('app').controller('article.content.listController',
	function($scope, $rootScope, dimmerService, initData, articleService, util, layerService, tagRelationService, tagService, viewsService, relationService, toastr) {
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
			$rootScope.$state.go('article.content.list', {
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
			layerService.confirm('警告', '确定要删除该活动吗？').then(function() {
				articleService.deletePost(id).then(function() {
					toastr.success('删除成功!');
					$rootScope.$state.reload();
				}, function() {
					toastr.error('该活动已经关联景点，不能被删除!', '删除失败!');
				})
			})
		}
		$scope.deleteRelation = function(id) {
			//158
			/*relationService.deleteRelation(148).then(function(data) {
				console.log(data);
			});*/
		}
	}
);