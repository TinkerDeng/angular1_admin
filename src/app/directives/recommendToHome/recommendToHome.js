'use strict';
angular.module('app')
	.directive('recommendToHome', function($rootScope, ngDialog, $timeout, layerService, toastr, config) {
		return {
			templateUrl: 'app/directives/recommendToHome/recommendToHome.html',
			restrict: 'AE',
			replace: true,
			transclude: true,
			scope: {
				max: '@?',
				width: '@?',
				height: "@?"
			},
			require: '?ngModel',
			link: function($scope, $element, $attr, $ctrl) {
				$scope.max = $scope.max || 2;
				$scope.imgs = '';
				$ctrl && ($ctrl.$render = function() {
					if($ctrl.$viewValue) {
						$scope.imgs = $ctrl.$viewValue.join(',')
					}
				});

				$scope.$watch('imgs', function(newData) {
					$scope.imgs = newData;
					$ctrl && $ctrl.$setViewValue($scope.imgs.split(','));
				});

				$scope.$on('editorContentPushImage', function(ev, data) {
					var arr = [];
					if($scope.imgs) {
						arr = $scope.imgs.split(',');
					}
					if($scope.width&&$scope.width!=data.w){
						toastr.error('图片宽度不符', '操作失败');
						return ;
					}
					if($scope.height&&$scope.height!=data.h){
						toastr.error('图片高度不符', '操作失败');
						return ;
					}
					arr.push(data.image);
					if(arr.length > $scope.max) {
						toastr.error('已超过最大数量，添加失败！', '操作失败');
						return;
					}
					$scope.imgs = arr.join(',');
				})
			}
		};
	});