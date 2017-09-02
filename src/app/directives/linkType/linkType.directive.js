'use strict';
angular.module('app')
	.directive('linkType', function($rootScope, ngDialog, $timeout, layerService, toastr, config) {
		return {
			templateUrl: 'app/directives/linkType/linkType.html',
			restrict: 'AE',
			replace: true,
			scope: {
				resourceType: "=?",
				resourceLocation: "=?"
			},
			require: '?ngModel',
			transclude: true,
			link: function($scope, $element, $attr, $ctrl) {
				/*$ctrl && ($ctrl.$render = function() {
					$scope.data = $ctrl.$viewValue || [];
				})*/
				$scope.data = {};
				$scope.data.resourceType = $scope.resourceType;
				$scope.data.targetValue = $scope.resourceLocation;
				$scope.config = {};
				$scope.config.linkType = [{
					title: "内链",
					value: 1,
					showId: true
				}, {
					title: "外链",
					value: 2,
					showUrl: true
				}];
				$scope.config.type = [{
					title: "产品",
					value: 1,
					linkTypes: [1, 2]
				}, {
					title: "菜谱",
					value: 2,
					linkTypes: [1]
				}, {
					title: "文章",
					value: 3,
					linkTypes: [1]
				}];
				if($scope.resourceType == 5) {
					$scope.currentType = $scope.config.type[0];
					$scope.currentLinkType = $scope.config.linkType[0];
				} else if($scope.resourceType == 6) {
					$scope.currentType = $scope.config.type[0];
					$scope.currentLinkType = $scope.config.linkType[1];
				} else if($scope.resourceType == 7) {
					$scope.currentType = $scope.config.type[1];
					$scope.currentLinkType = $scope.config.linkType[0];
				} else if($scope.resourceType == 9) {
					$scope.currentType = $scope.config.type[2];
					$scope.currentLinkType = $scope.config.linkType[0];
				} else {
					$scope.currentType = $scope.config.type[0];
					$scope.currentLinkType = $scope.config.linkType[0];
				}
				$scope.change = function(item) {
					if(item.value == 1) {
						$scope.resourceType = 5;
					} else if(item.value == 2) {
						$scope.resourceType = 7;
					} else if(item.value == 3) {
						$scope.resourceType = 9;
					}
					$scope.resourceLocation = $scope.data.targetValue;
					$scope.currentType = item;
					$scope.currentLinkType = $scope.config.linkType[0];
				};
				$scope.choice = function(item) {
					if(item.value == 2) {
						$scope.resourceType = 6;
					}
					$scope.currentLinkType = item;
				};

			}
		};
	});