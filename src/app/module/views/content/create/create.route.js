angular.module('app').config(function($stateProvider, routerManagerProvider) {
	routerManagerProvider.add('views.content.create', {
		url: '/create',
		templateUrl: 'app/module/views/content/create/create.html',
		controller: 'views.content.createController',
		title: '添加景点',
		desc: '添加新的景点',
		icon: 'plus icon'
	});
});