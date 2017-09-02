angular.module('app').config(function ($urlRouterProvider, routerManagerProvider) {
    $urlRouterProvider.when('/views', '/views/content');
    routerManagerProvider.add('views', {
        url: '/views',
        templateUrl: 'app/module/views/views.html',
        controller: 'viewsController',
        title: '景点设置',
        desc: '对景点内容进行设置',
        icon: 'iconfont icon-views icon'
    });
});