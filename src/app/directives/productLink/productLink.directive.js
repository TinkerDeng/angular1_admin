'use strict';
angular.module('app')
    .directive('productLink', function (uploadService, ngDialog, $timeout, layerService, toastr, config, articleService) {
        return {
            templateUrl: 'app/directives/productLink/productLink.html',
            restrict: 'AE',
            replace: true,
            scope: {
                info: "=",
                type: "@"
            },
            require: '?ngModel',
            link: function ($scope, $element, $attr, $ctrl) {
                $scope.showProduct = function () {
                    ngDialog.open({
                        template: 'app/directives/editorDialog/html/item.html',
                        appendClassName: 'addChild',
                        controller: ['$scope', function (scope) {
                            var max = scope.max || 7;
                            scope.pagenum = 1;
                            scope.totalPage = 1;
                            scope.items = [];
                            if ($scope.type == 1) {
                                skuProductService.getProductList(0, max).then(function (data) {
                                    scope.items = data.result;
                                    scope.totalPage = data.totalPage;
                                });
                            } else if ($scope.type == 2) {
                                vegetablesService.getVegetablesList(0, max).then(function (data) {
                                    scope.items = data.result;
                                    scope.totalPage = data.totalPage;
                                });
                            } else if ($scope.type == 3) {
                                articleService.getList(0, max).then(function (data) {
                                    scope.items = data.result;
                                    scope.totalPage = data.totalPage;
                                });
                            }
                            scope.addItem = function (item) {
                                if ($scope.type == 1) {
                                    $scope.info = item.productId;
                                } else if ($scope.type == 2) {
                                    $scope.info = item.cookbookId;
                                } else if ($scope.type == 3) {
                                    $scope.info = item.articleId;
                                }
                                scope.closeThisDialog();
                            };
                            scope.change = function (pagenum) {
                                if ($scope.type == 1) {
                                    skuProductService.getProductList((pagenum - 1) * max, max).then(function (data) {
                                        scope.items = data.result;
                                    });
                                } else if ($scope.type == 2) {
                                    vegetablesService.getVegetablesList((pagenum - 1) * max, max).then(function (data) {
                                        scope.items = data.result;
                                    });
                                } else if ($scope.type == 3) {
                                    articleService.getList((pagenum - 1) * max, max).then(function (data) {
                                        scope.items = data.result;
                                    });
                                }
                            };
                        }]
                    })
                }
            }
        };
    });