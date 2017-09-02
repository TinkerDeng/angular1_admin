angular.module('app').config(function ($urlRouterProvider, routerManagerProvider) {
    $urlRouterProvider.when('/article/content', '/article/content/list');
    routerManagerProvider.add('article.content', {
        url: '/content',
        templateUrl: 'app/module/article/content/content.html',
        controller: 'article.contentController',
        title: '活动列表',
        desc: '所有的活动列表，可以对其进行增加，删除，修改',
        icon: 'large list layout icon',
        sort: 3
    });
});