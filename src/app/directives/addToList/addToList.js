'use strict';
angular.module('app')
    .directive('addToList', function ($rootScope, ngDialog, $timeout, layerService, toastr, config) {
        return {
            templateUrl: 'app/directives/addToList/addToList.html',
            restrict: 'AE',
            replace: true,
            scope: {
                image: "="
            },
            require: '?ngModel',
            link: function ($scope, $element, $attr, $ctrl) {
                $scope.add = function () {
                    $rootScope.$broadcast('editorContentPushImage', $scope.image);
                }
            }
        };
    });