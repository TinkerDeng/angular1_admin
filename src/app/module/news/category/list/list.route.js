angular.module('app').config(function($urlRouterProvider, routerManagerProvider) {
	$urlRouterProvider.when('/news/category/list', '/news/category/list/1');
	routerManagerProvider.add('news.category.list', {
		url: '/list/{pageNum:[1-9][0-9]*}',
		templateUrl: 'app/module/news/category/list/list.html',
		controller: 'news.category.listController',
		resolve: {
			initData: ['dimmerService', '$stateParams', 'newsService', 'config',
				function(dimmerService, $stateParams, newsService, config) {
					dimmerService.show();
					return newsService.getPostList(($stateParams.pageNum - 1) * config.limit, config.limit,4);
				}
			]
		},
		title: '新闻轮播图列表',
		desc: '新闻轮播图列表,最好传3-5个轮播图',
		icon: 'list layout icon'
	});
});