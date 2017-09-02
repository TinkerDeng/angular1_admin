'use strict';
angular.module('app')
	.directive('pageHeader', function(localStorageService, $rootScope) {
		return {
			templateUrl: 'app/directives/pageHeader/pageHeader.html',
			restrict: 'AE',
			replace: true,
			link: function($scope, element, attr) {
				$scope.exit = function() {
					localStorageService.clearAll();
					$rootScope.$state.go('login');
				};
				var scrollHandler = function() {
					var scrollTop = $(window).scrollTop();
					if(scrollTop >= 60) {
						element.addClass('hide');
					} else {
						element.removeClass('hide');
					}
				};
				scrollHandler();

				$(window).on('scroll', scrollHandler);

				$scope.$on('$destroy', function() {
					$(window).off('scroll', scrollHandler);
				});
			}
		};
	});