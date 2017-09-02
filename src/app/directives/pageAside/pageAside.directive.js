'use strict';
angular.module('app').directive('pageAside',
    function ($rootScope, util) {
        return {
            templateUrl: 'app/directives/pageAside/pageAside.html',
            restrict: 'AE',
            replace: true,
            scope: {
                route: '='
            },
            link: function ($scope, element, attr) {
                $scope.active = function (item) {
                    return $rootScope.$state.includes(item.name)
                };
                $scope.children = util.getObjectValueToArray($scope.route.children);
            }
        };
    }
);
