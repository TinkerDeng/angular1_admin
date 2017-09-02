angular.module('app').config(function($urlRouterProvider, routerManagerProvider) {
	$urlRouterProvider.when('/article/category/edit', '/article/category/list/1');
	routerManagerProvider.add('article.category.edit', {
		url: '/edit/{id:[1-9][0-9]*}',
		templateUrl: 'app/module/article/category/create/create.html', //同create页面，直接调用
		controller: 'article.category.editController',
		resolve: {
			initData: ['$q', 'dimmerService', '$stateParams', 'articleService',
				function($q, dimmerService, $stateParams, articleService) {
					dimmerService.show();
					return articleService.getTopicById($stateParams.id);
				}
			]
		},
		title: '修改分类',
		desc: '修改选中的活动分类内容',
		icon: 'edit icon'

	});
});