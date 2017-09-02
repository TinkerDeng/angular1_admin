'use strict';
angular.module('app')
	.directive('activityRelation', function(uploadService, ngDialog, $timeout, layerService, toastr, config, articleService) {
		return {
			templateUrl: 'app/directives/activityRelation/articleRelation.html',
			restrict: 'AE',
			replace: true,
			scope: {},
			require: '?ngModel',
			link: function($scope, $element, $attr, $ctrl) {
				$scope.otherData = {};
				$scope.otherData.type = 0;
				$ctrl && ($ctrl.$render = function() {
					if($ctrl.$viewValue) {
						$scope.data = $ctrl.$viewValue;
						//$ctrl && $ctrl.$setViewValue($scope.data);
					}
				});
				$scope.showDialog = function(item, index) {
					ngDialog.open({
						template: 'app/directives/activityRelation/activityRelation.html',
						appendClassName: 'addChild',
						controller: ['$scope', function(scope) {
							var max = scope.max || 7;
							scope.pagenum = 1;
							scope.totalPage = 1;
							scope.items = [];
							articleService.getPostList(0, max).then(function(data) {
								scope.items = data.result;
								scope.totalPage = data.totalPage;
							});
							scope.addItem = function(item) {
								$scope.data.push(item);
								$ctrl && $ctrl.$setViewValue($scope.data);
								scope.closeThisDialog();
							};
							scope.change = function(pagenum) {
								articleService.getPostList((pagenum - 1) * max, max).then(function(data) {
									scope.items = data.result;
								});
							};
						}]
					});
				};
				$scope.del = function(index) {
					layerService.confirm('警告', '确定要删除该产品吗？').then(function() {
						$scope.data.splice(index, 1);
						toastr.success('删除成功!');
					})
				}
			}
		};
	});