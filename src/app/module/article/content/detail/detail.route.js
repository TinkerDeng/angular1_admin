angular.module('app').config(function ($urlRouterProvider, routerManagerProvider) {
    $urlRouterProvider.when('/article/content/detail', '/article/content/detail/1');
    routerManagerProvider.add('article.content.detail', {
        url: '/detail/{id:[1-9][0-9]*}',
        templateUrl: 'app/module/article/content/detail/detail.html', //同create页面，直接调用
        controller: 'article.content.detailController',
        resolve: {
            initData: ['$q', 'dimmerService', '$stateParams', 'articleService', 'config',
                function ($q, dimmerService, $stateParams, articleService, config) {
                    dimmerService.show();
                    return $q.all([articleService.getPostById($stateParams.id), articleService.getCommentList($stateParams.id, 0, config.limit)]);
                }
            ]
        },
        title: '活动详情',
        desc: '查看具体的活动详情',
        icon: 'edit icon'
    });
});