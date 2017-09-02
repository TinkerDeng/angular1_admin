angular.module('app').config(function ($urlRouterProvider, routerManagerProvider) {
    $urlRouterProvider.when('/news/content/edit', '/news/content/list/1');
    routerManagerProvider.add('news.content.edit', {
        url: '/edit/{id:[1-9][0-9]*}',
        templateUrl: 'app/module/news/content/create/create.html', //同create页面，直接调用
        controller: 'news.content.editController',
        resolve: {
            initData: ['$q', 'dimmerService', '$stateParams', 'newsService',
                function ($q, dimmerService, $stateParams, newsService) {
                    dimmerService.show();
                    return newsService.getPostById($stateParams.id);
                }
            ]
        },
        title: '修改新闻',
        desc: '修改选中的新闻内容',
        icon: 'edit icon'
    });
});