angular.module('app').config(function ($urlRouterProvider, routerManagerProvider) {
    $urlRouterProvider.when('/article/content/edit', '/article/content/list/1');
    routerManagerProvider.add('article.content.edit', {
        url: '/edit/{id:[1-9][0-9]*}',
        templateUrl: 'app/module/article/content/create/create.html', //同create页面，直接调用
        controller: 'article.content.editController',
        resolve: {
            initData: ['$q', 'dimmerService', '$stateParams', 'articleService',
                function ($q, dimmerService, $stateParams, articleService) {
                    dimmerService.show();
                    return $q.all([articleService.getPostById($stateParams.id), articleService.getTopicList(0, 100)]);
                }
            ]
        },
        title: '修改活动',
        desc: '修改选中的活动内容',
        icon: 'edit icon'
    });
});