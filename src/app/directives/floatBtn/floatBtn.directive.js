'use strict';
angular.module('app')
  .directive('floatBtn', function () {
      return {
        templateUrl: 'app/directives/floatBtn/floatBtn.html',
        restrict: 'AE',
        replace: true,
        scope: {
          title: '@'
        },
        transclude: true,
        link: function () {

        }
      };
    }
  );
