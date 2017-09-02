'use strict';
angular.module('app')
	.directive('goTop', function () {
			return {
				templateUrl: 'app/directives/goTop/goTop.html',
				restrict: 'AE',
				replace: true,
				link: function ($scope, element, attr) {
					$scope.goTop = function () {
						$('html,body').animate({scrollTop: 0}, 400)
					};

					var scrollHandler = function () {
						if ($(window).scrollTop() > 150) {
							element.addClass('show');
						} else {
							element.removeClass('show');
						}
					};

					$(window).on('scroll', scrollHandler);
					$scope.$on('$destroy', function () {
						$(window).off('scroll', scrollHandler);
					});
					scrollHandler();
				}
			};
		}
	);
