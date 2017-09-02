'use strict';
angular.module('app')
  .directive('formMessage', function () {
      return {
        templateUrl: 'app/directives/formMessage/formMessage.html',
        restrict: 'AE',
        replace: true,
        transclude: true,
        scope: {
          close: '=?'
        },
        link: function ($scope) {

          $scope.show = true;

          $scope.hide = function () {
            $scope.show = false;
          }

        }
      };
    }
  );
