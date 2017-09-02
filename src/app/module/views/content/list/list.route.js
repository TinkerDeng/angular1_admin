angular.module('app').config(function ($urlRouterProvider, routerManagerProvider) {
    $urlRouterProvider.when('/views/content/list', '/views/content/list/1');
    routerManagerProvider.add('views.content.list', {
        url: '/list/{pageNum:[1-9][0-9]*}?search',
        templateUrl: 'app/module/views/content/list/list.html',
        controller: 'views.content.listController',
        resolve: {
            initData: ['dimmerService', '$stateParams', 'viewsService', 'config',"util",
                function (dimmerService, $stateParams, viewsService, config,util) {
                    dimmerService.show();
                    return viewsService.getPostList(($stateParams.pageNum - 1) * config.limit, config.limit,util.deserialize($stateParams.search).value);
                }
            ]
        },
        title: '景点列表',
        desc: '景点列表，可查看所有的景点列表信息',
        icon: 'tree icon'
    });
});