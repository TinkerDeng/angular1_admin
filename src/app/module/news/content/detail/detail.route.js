angular.module('app').config(function ($urlRouterProvider, routerManagerProvider) {
    $urlRouterProvider.when('/news/content/detail', '/news/content/detail/1');
    routerManagerProvider.add('news.content.detail', {
        url: '/detail/{id:[1-9][0-9]*}',
        templateUrl: 'app/module/news/content/detail/detail.html', //同create页面，直接调用
        controller: 'news.content.detailController',
        resolve: {
            initData: ['$q', 'dimmerService', '$stateParams', 'newsService', 'config',
                function ($q, dimmerService, $stateParams, newsService, config) {
                    dimmerService.show();
                    return newsService.getPostById($stateParams.id);
                }
            ]
        },
        title: '新闻详情',
        desc: '查看具体的新闻详情',
        icon: 'edit icon'
    });
});