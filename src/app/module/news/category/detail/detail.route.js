angular.module('app').config(function ($urlRouterProvider, routerManagerProvider) {
    $urlRouterProvider.when('/news/category/detail', '/news/category/detail/1');
    routerManagerProvider.add('news.category.detail', {
        url: '/detail/{id:[1-9][0-9]*}',
        templateUrl: 'app/module/news/category/detail/detail.html', //同create页面，直接调用
        controller: 'news.category.detailController',
        resolve: {
            initData: ['$q', 'dimmerService', '$stateParams', 'newsService', 'config',
                function ($q, dimmerService, $stateParams, newsService, config) {
                    dimmerService.show();
                    return newsService.getPostById($stateParams.id);
                }
            ]
        },
        title: '轮播详情',
        desc: '查看具体的轮播详情',
        icon: 'edit icon'
    });
});