angular.module('app').config(function ($urlRouterProvider, routerManagerProvider) {
    $urlRouterProvider.when('/views/content', '/views/content/list');
    routerManagerProvider.add('views.content', {
        url: '/content',
        templateUrl: 'app/module/views/content/content.html',
        controller: 'views.contentController',
        title: '景点列表',
        desc: '所有的景点列表，可以对其进行增加，删除，修改',
        icon: 'large iconfont icon-manager icon',
        sort: 3
    });
});