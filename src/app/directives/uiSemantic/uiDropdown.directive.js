'use strict';
angular.module('app').directive('uiDropdown',
	function ($timeout) {
		return {
			restrict: 'EA',
			scope: {
				action: '=action',
				show: '=show'
			},
			link: function ($scope, element) {
				$timeout(function () {
					element.dropdown({
						action: $scope.action || 'activate'
					})
				});
			}
		};
	}
);
