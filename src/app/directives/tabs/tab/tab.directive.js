'use strict';
angular.module('app').directive('tab',
    function () {
        return {
            templateUrl: 'app/directives/tabs/tab/tab.html',
            restrict: 'AE',
            transclude: true,
            require: '^tabs',
            scope: {
                title: '@?'
            },
            replace: true,
            link: function ($scope, $element, $attr, $ctrl) {
                $scope.active = $ctrl.tabs.length == 0;
                $ctrl.addTab($scope);
            }
        };
    }
);
