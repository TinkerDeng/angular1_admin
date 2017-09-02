'use strict';
angular.module('app').controller('homeController',
    function ($scope, dimmerService, newsService, articleService, viewsService) {
        dimmerService.hide();
        $scope.data = {};

        newsService.getPostList(0, 1).then(function (data) {
            $scope.data.newsTotal = data.totalCount;
        });
        articleService.getPostList(0, 1).then(function (data) {
            $scope.data.articleTotal = data.totalCount;
        });
        viewsService.getPostList(0, 1).then(function (data) {
            $scope.data.viewsTotal = data.totalCount;
        })
    }
);