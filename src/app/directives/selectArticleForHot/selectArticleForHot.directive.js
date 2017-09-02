'use strict';
angular.module('app').directive('selectArticleForHot',
    function (ngDialog, newsService, viewsService, articleService) {
        return {
            templateUrl: 'app/directives/selectArticleForHot/selectArticleForHot.html',
            restrict: 'AE',
            replace: true,
            scope: {
                type: '@?'
            },
            require: '?ngModel',
            link: function ($scope, element, attr, $ctrl) {
                $scope.canSelectType = true;
                if ($scope.type) {
                    $scope.canSelectType = false;
                } else {
                    $scope.type = 0;
                }
                $scope.data = {};
                $scope.currentId = 0;
                $ctrl && ($ctrl.$render = function () {
                    $scope.data.id = $ctrl.$viewValue || '';
                });

                $scope.select = function () {
                    ngDialog.open({
                        template: 'app/directives/selectArticleForHot/selectArticleForHotModal.html',
                        appendClassName: 'mapLocationModel',
                        scope: $scope,
                        controller: ['$scope', function (scope) {
                            scope.currentType = $scope.type;
                            $scope.currentId = $scope.data.id;
                            var limit = 6;
                            var services = [newsService.getPostList, viewsService.getPostList, articleService.getPostList];
                            scope.changePageNum = function (pageNum) {
                                scope.pageNum = pageNum;
                                console.log(scope.currentType);
                                services[scope.currentType - 1]((pageNum - 1) * limit, limit).then(function (data) {
                                    scope.list = data.result;
                                    scope.totalPage = data.totalPage;
                                });
                            };
                            scope.changeListType = function (value, bl) {
                                if (!$scope.canSelectType && !bl) {
                                    return;
                                }
                                scope.currentType = value;
                                scope.list = [];
                                scope.pageNum = 1;
                                scope.totalPage = 1;
                                scope.changePageNum(1);
                            };
                            scope.selected = function (item) {
                                $scope.data.id = item.articleId;
                                $ctrl && $ctrl.$setViewValue(item.articleId);
                                scope.closeThisDialog();
                            };
                            scope.changeListType($scope.type, true);
                        }]
                    });
                }
            }
        };
    }
);
