'use strict';
angular.module('app')
    .directive('editorContent', function ($state, $timeout, routerManager, ngDialog, layerService, toastr, config) {
        return {
            templateUrl: 'app/directives/editorContent/editorContent.html',
            restrict: 'AEMC',
            replace: true,
            scope: {
                data: "="
            },
            require: '?ngModel',
            controller: function ($scope) {
            },
            link: function ($scope, $element, $attr, ctrl) {
                $scope.jsonList = $scope.data;
            }
        };
    });