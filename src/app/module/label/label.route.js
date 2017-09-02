angular.module('app').config(function ($urlRouterProvider, routerManagerProvider) {
    $urlRouterProvider.when('/label', '/label/tag');
    routerManagerProvider.add('label', {
        url: '/label',
        templateUrl: 'app/module/label/label.html',
        controller: 'labelController',
        title: '标签设置',
        desc: '对活动，新闻，景点进行标签设置',
        icon: 'iconfont icon-label icon'
    });
});