angular.module('app').config(function($urlRouterProvider, routerManagerProvider) {
	$urlRouterProvider.when('/news/category', '/news/category/list');
	routerManagerProvider.add('news.category', {
		url: '/category',
		templateUrl: 'app/module/news/category/category.html',
		controller: 'news.categoryController',
		title: '新闻轮播',
		desc: '对新闻的种类进行编辑，设置新闻的分类，方便用户对新闻的管理与查询',
		icon: 'large iconfont icon-sort icon',
		sort: 2
	});
});