angular.module('app').config(function($stateProvider, routerManagerProvider) {
	routerManagerProvider.add('label.tag.create', {
		url: '/create',
		templateUrl: 'app/module/label/tag/create/create.html',
		controller: 'label.tag.createController',
		title: '添加标签',
		desc: '为文章添加标签',
		icon: 'plus icon'
	});
});