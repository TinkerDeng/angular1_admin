'use strict';
angular.module('app')
    .directive('editTab', function (uploadService, ngDialog, $timeout, config) {
        return {
            templateUrl: 'app/directives/editorDialog/editorTab/editorTab.html',
            restrict: 'AE',
            replace: true,
            transclude: true,
            scope: {
                title: "@",
                type: "@",
                icon: "@?"
            },
            require: "?^editorDialog",
            link: function ($scope, $element, $attr, $ctrl) {
                $scope.clickHandler = function () {
                    if ($scope.type == "text") {
                        $ctrl.addText();
                    } else if ($scope.type == "image") {
                        $ctrl.addImage();
                    } else if ($scope.type == "video") {
                        $ctrl.addVideo();
                    } else if ($scope.type == "product") {
                        $ctrl.addProduct();
                    } else {
                        $ctrl.addAudio();
                    }
                    //alert($scope.type);

                }
            }
        };
    });