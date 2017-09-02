angular.module('app').config(function($stateProvider, routerManagerProvider) {
	routerManagerProvider.add('news.category.create', {
		url: '/create',
		templateUrl: 'app/module/news/category/create/create.html',
		controller: 'news.category.createController',
		title: '添加新闻轮播',
		desc: '新闻轮播',
		icon: 'plus icon'
	});
});