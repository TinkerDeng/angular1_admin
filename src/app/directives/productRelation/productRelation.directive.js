'use strict';
angular.module('app')
	.directive('productRelation', function(uploadService, ngDialog, $timeout, layerService, toastr, config, skuProductService) {
		return {
			templateUrl: 'app/directives/productRelation/productRelation.html',
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
						template: 'app/directives/editorDialog/html/product.html',
						appendClassName: 'addChild',
						controller: ['$scope', function(scope) {
							scope.data = {};
							scope.product = item || {};
							if(item) {
								scope.data.image = item.image;
							}
							scope.checked = false;
							if(item && item.type == 6) {
								scope.checked = true;
							}
							scope.submit = function() {
								var type = scope.checked ? 6 : 5;
								var data = {
									title: scope.product.title,
									image: scope.data.image,
									info: scope.product.info,
									price: scope.product.price,
									type: type
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