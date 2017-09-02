angular.module('app').config(function($urlRouterProvider, routerManagerProvider) {
	$urlRouterProvider.when('/news/content/list', '/news/content/list/1');
	routerManagerProvider.add('news.content.list', {
		url: '/list/{pageNum:[1-9][0-9]*}?search',
		templateUrl: 'app/module/news/content/list/list.html',
		controller: 'news.content.listController',
		resolve: {
			initData: ['dimmerService', '$stateParams', 'newsService', 'config', "util",
				function(dimmerService, $stateParams, newsService, config, util) {
					dimmerService.show();

					return newsService.getPostList(($stateParams.pageNum - 1) * config.limit, config.limit, 1, util.deserialize($stateParams.search).value);
				}
			]
		},
		title: '新闻列表',
		desc: '新闻列表，可查看所有的新闻列表信息',
		icon: 'iconfont icon-article icon layout'
	});
});