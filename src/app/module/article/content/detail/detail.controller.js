angular.module('app').controller('article.content.detailController',
	function($rootScope, $scope, dimmerService, articleService, toastr, initData, ngDialog, layerService, toastr) {
		dimmerService.hide();
		$scope.data = initData[0].result;
		$scope.data.jsonList = {};
		try {
			$scope.data.jsonList = JSON.parse($scope.data.articleContent);
		} catch(err) {
			$scope.data.jsonList.content = [];
		}
		$scope.commentList = initData[1].result;
		$scope.otherData = {};
		$scope.updateComment = function(item) {
			ngDialog.open({
				template: 'addCommentTemplate',
				appendClassName: 'addChild',
				controller: ['$scope', function(scope) {
					scope.data = $.extend(true, {}, item);
					scope.submit = function() {
						var data = {
							articleId: item.id,
							commentId: item.commentId,
							commentContent: scope.data.commentContent
						};
						articleService.updateComment(data).then(function(data) {
							scope.closeThisDialog();
							$rootScope.$state.reload();
						});
					}
				}]
			});
		}
		$scope.deleteComment = function(id) {
			layerService.confirm('警告', '确认要删除该评论么？').then(function() {
				articleService.deleteComment(id).then(function() {
					toastr.success('删除成功!');
					$rootScope.$state.reload();
				}, function() {
					toastr.error('该评论不能删除', '删除失败!');
				})
			})
		}
		$scope.addComment = function(id) {
			ngDialog.open({
				template: 'addCommentTemplate',
				appendClassName: 'addChild',
				controller: ['$scope', function(scope) {
					/*
					 commentAttachment: "aa",
					 commentCreateTime: "aa",
					 commenterIp: "aa",
					 commentId: "aa",
					 parentCommentId: "aa",
					 platform: "aa",
					 shareUserId: "aa",
					 userId: "aa"*/
					scope.data = {};
					scope.submit = function() {
						var data = {
							articleId: id,
							commentContent: scope.data.commentContent
						};
						articleService.addComment(data).then(function(data) {
							scope.closeThisDialog();
							$rootScope.$state.reload();
						});
					}
				}]
			});
		}
	}
);