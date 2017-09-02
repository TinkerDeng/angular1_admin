'use strict';
angular.module('app').directive('switchBtn',
	function() {
		return {
			templateUrl: 'app/directives/switchBtn/switchBtn.html',
			restrict: 'AE',
			replace: true,
			require: '?ngModel',
			scope: {},
			link: function($scope, $element, $attr, $ctrl) {
				$scope.checked = false;
				$ctrl && ($ctrl.$render = function() {
					if($ctrl.$viewValue) {
						$scope.checked = $ctrl.$viewValue;
					}
				});
				$scope.change = function() {
					$ctrl && $ctrl.$setViewValue($scope.checked);
				};
			}
		};
	}
);