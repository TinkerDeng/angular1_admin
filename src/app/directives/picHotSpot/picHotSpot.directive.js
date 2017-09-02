'use strict';
angular.module('app')
	.directive('picHotSpot', function($rootScope, ngDialog, $timeout, layerService, toastr, config) {
		return {
			templateUrl: 'app/directives/picHotSpot/picHotSpot.html',
			restrict: 'AE',
			replace: true,
			scope: {
				width: "@?",
				height: "@?"
			},
			require: '?ngModel',
			transclude: true,
			link: function($scope, $element, $attr, $ctrl) {
				$scope.data = {};
				$ctrl && ($ctrl.$render = function() {
					if($ctrl.$viewValue) {
						try {
							$scope.data = JSON.parse($ctrl.$viewValue);

						} catch(err) {
							$scope.data = {
								w: $scope.width * 1,
								h: $scope.height * 1
							};
						}
					}
				});

				$scope.$watch("data.hotspot", function(newValue, oldValue) {
					$ctrl && $ctrl.$setViewValue(JSON.stringify($scope.data));
				});

				$scope.$watch("data.image", function(newValue, oldValue) {
					if(newValue != oldValue) {
						$scope.data.hotspot = [];
						$ctrl && $ctrl.$setViewValue(JSON.stringify($scope.data));
					}
				});
			}
		};
	});