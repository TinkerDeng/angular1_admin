angular.module('app').config(function ($urlRouterProvider, routerManagerProvider) {
    $urlRouterProvider.when('/views/content/edit', '/views/content/list/1');
    routerManagerProvider.add('views.content.edit', {
        url: '/edit/{id:[1-9][0-9]*}',
        templateUrl: 'app/module/views/content/create/create.html', //同create页面，直接调用
        controller: 'views.content.editController',
        resolve: {
            initData: ['$q', 'dimmerService', '$stateParams', 'viewsService',
                function ($q, dimmerService, $stateParams, viewsService) {
                    dimmerService.show();
                    return viewsService.getPostById($stateParams.id);
                }
            ]
        },
        title: '修改景点',
        desc: '修改选中的景点内容',
        icon: 'edit icon'
    });
});