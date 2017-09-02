angular.module('app').config(function ($urlRouterProvider, routerManagerProvider) {
    $urlRouterProvider.when('/news/content', '/news/content/list');
    routerManagerProvider.add('news.content', {
        url: '/content',
        templateUrl: 'app/module/news/content/content.html',
        controller: 'news.contentController',
        title: '新闻列表',
        desc: '所有的新闻列表，可以对其进行增加，删除，修改',
        icon: 'large iconfont icon-manager icon',
        sort: 1
    });
});