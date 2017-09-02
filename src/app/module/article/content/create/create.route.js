angular.module('app').config(function($stateProvider, routerManagerProvider) {
	routerManagerProvider.add('article.content.create', {
		url: '/create',
		templateUrl: 'app/module/article/content/create/create.html',
		controller: 'article.content.createController',
		title: '添加活动',
		desc: '添加新的活动',
		icon: 'plus icon'
	});
});