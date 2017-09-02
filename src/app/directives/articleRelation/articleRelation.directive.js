'use strict';
angular.module('app')
	.directive('articleRelation', function(uploadService, ngDialog, $timeout, layerService, toastr, config) {
		return {
			templateUrl: 'app/directives/articleRelation/articleRelation.html',
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
						template: 'app/directives/articleRelation/article.html',
						appendClassName: 'addChild',
						controller: ['$scope', function(scope) {
							scope.data = item || {};
							scope.submit = function() {
								var data = {
									title: scope.data.title,
									image: scope.data.image,
									info: scope.data.info,
									content: scope.data.content,
									type: 9
								};
								if(item) {
									$scope.data[index] = data;
								} else {
									$scope.data.push(data);
								}
								scope.closeThisDialog();
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