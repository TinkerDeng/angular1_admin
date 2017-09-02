angular.module('app').config(function($urlRouterProvider, routerManagerProvider) {
	$urlRouterProvider.when('/news/category/edit', '/news/category/list/1');
	routerManagerProvider.add('news.category.edit', {
		url: '/edit/{id:[1-9][0-9]*}',
		templateUrl: 'app/module/news/category/create/create.html', //同create页面，直接调用
		controller: 'news.category.editController',
		resolve: {
			initData: ['$q', 'dimmerService', '$stateParams', 'newsService',
				function($q, dimmerService, $stateParams, newsService) {
					dimmerService.show();
					return newsService.getPostById($stateParams.id);
				}
			]
		},
		title: '修改轮播',
		desc: '修改选中的新闻轮播图',
		icon: 'edit icon'

	});
});