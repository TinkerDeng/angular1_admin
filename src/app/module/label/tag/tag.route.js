angular.module('app').config(function($urlRouterProvider, routerManagerProvider) {
	$urlRouterProvider.when('/label/tag', '/label/tag/list');
	routerManagerProvider.add('label.tag', {
		url: '/tag',
		templateUrl: 'app/module/label/tag/tag.html',
		controller: 'label.tagController',
		title: '标签 ',
		desc: '特定的标签',
		icon: 'large iconfont icon-tag icon',
		sort: 1
	});
});