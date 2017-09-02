angular.module('app').config(function ($urlRouterProvider, routerManagerProvider) {
    $urlRouterProvider.when('/news', '/news/content');
    routerManagerProvider.add('news', {
        url: '/news',
        templateUrl: 'app/module/news/news.html',
        controller: 'newsController',
        title: '新闻设置',
        desc: '对新闻内容进行设置',
        icon: 'newspaper icon'
    });
});