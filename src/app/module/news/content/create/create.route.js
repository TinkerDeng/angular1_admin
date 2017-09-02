angular.module('app').config(function($stateProvider, routerManagerProvider) {
	routerManagerProvider.add('news.content.create', {
		url: '/create',
		templateUrl: 'app/module/news/content/create/create.html',
		controller: 'news.content.createController',
		title: '添加新闻',
		desc: '添加新的新闻',
		icon: 'plus icon'
	});
});