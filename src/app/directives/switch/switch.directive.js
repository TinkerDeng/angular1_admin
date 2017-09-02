'use strict';
angular.module('app').directive('switch',
	function() {
		return {
			templateUrl: 'app/directives/switch/switch.html',
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