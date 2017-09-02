angular.module('app').config(function($stateProvider, routerManagerProvider) {
	routerManagerProvider.add('article.category.create', {
		url: '/create',
		templateUrl: 'app/module/article/category/create/create.html',
		controller: 'article.category.createController',
		title: '添加分类',
		desc: '为活动添加分类',
		icon: 'plus icon'
	});
});