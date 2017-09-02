'use strict';
angular.module('app')
    .directive('dot', function (uploadService, ngDialog, $timeout, config) {
        return {
            templateUrl: 'app/directives/dot/dot.html',
            restrict: 'AE',
            replace: true,
            require: '?ngModel',
            link: function ($scope, $element, $attr, $ctrl) {
            }
        };
    });