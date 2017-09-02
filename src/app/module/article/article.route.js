angular.module('app').config(function ($urlRouterProvider, routerManagerProvider) {
    $urlRouterProvider.when('/article', '/article/category');
    routerManagerProvider.add('article', {
        url: '/article',
        templateUrl: 'app/module/article/article.html',
        controller: 'articleController',
        title: '活动设置',
        desc: '对活动内容进行设置',
        icon: 'sitemap icon'
    });
});