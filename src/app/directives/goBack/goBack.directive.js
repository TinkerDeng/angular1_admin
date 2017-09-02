'use strict';
angular.module('app')
  .directive('goBack', function () {
      return {
        templateUrl: 'app/directives/goBack/goBack.html',
        restrict: 'AE',
        replace: true,
        link: function () {

        }
      };
    }
  );
