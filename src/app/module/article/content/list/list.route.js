angular.module('app').config(function($urlRouterProvider, routerManagerProvider) {
	$urlRouterProvider.when('/article/content/list', '/article/content/list/1/0');
	routerManagerProvider.add('article.content.list', {
		url: '/list/{pageNum:[1-9][0-9]*}/{tagId:[0-9]*}?search',
		templateUrl: 'app/module/article/content/list/list.html',
		controller: 'article.content.listController',
		resolve: {
			initData: ['dimmerService', '$stateParams', 'articleService', 'config', "util",
				function(dimmerService, $stateParams, articleService, config, util) {

					dimmerService.show();

					return articleService.getPostList(($stateParams.pageNum - 1) * config.limit, config.limit, util.deserialize($stateParams.search).value);

				}
			]
		},
		title: '活动列表',
		desc: '活动列表，可查看所有的活动列表信息',
		icon: 'list layout icon'
	});
});