angular.module('app').config(function($urlRouterProvider, routerManagerProvider) {
	$urlRouterProvider.when('/article/category/list', '/article/category/list/1');
	routerManagerProvider.add('article.category.list', {
		url: '/list/{pageNum:[1-9][0-9]*}',
		templateUrl: 'app/module/article/category/list/list.html',
		controller: 'article.category.listController',
		resolve: {
			initData: ['dimmerService', '$stateParams', 'articleService', 'config',
				function(dimmerService, $stateParams, articleService, config) {
					dimmerService.show();
					return articleService.getTopicList(($stateParams.pageNum - 1) * config.limit, config.limit);
				}
			]
		},
		title: '分类列表',
		desc: '活动分类列表，可对活动分类进行增删改查操作',
		icon: 'list layout icon'
	});
});