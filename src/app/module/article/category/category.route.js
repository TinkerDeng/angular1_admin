angular.module('app').config(function($urlRouterProvider, routerManagerProvider) {
	$urlRouterProvider.when('/article/category', '/article/category/list');
	routerManagerProvider.add('article.category', {
		url: '/category',
		templateUrl: 'app/module/article/category/category.html',
		controller: 'article.categoryController',
		title: '活动分类',
		desc: '对活动的种类进行编辑，设置活动的分类，方便用户对活动的管理与查询',
		icon: 'large iconfont icon-sort icon',
		sort: 2
	});
});