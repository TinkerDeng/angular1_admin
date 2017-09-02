angular.module('app').config(function($urlRouterProvider, routerManagerProvider) {
	$urlRouterProvider.when('/label/tag/list', '/label/tag/list/1');
	routerManagerProvider.add('label.tag.list', {
		url: '/list/{pageNum:[1-9][0-9]*}',
		templateUrl: 'app/module/label/tag/list/list.html',
		controller: 'label.tag.listController',
		resolve: {
			initData: ['dimmerService', '$stateParams', 'tagService', 'config',
				function(dimmerService, $stateParams, tagService, config) {
					dimmerService.show();
					return tagService.getList(($stateParams.pageNum - 1) * config.limit, config.limit);
				}
			]
		},
		title: '标签列表',
		desc: '标签的增删改查',
		icon: 'columns layout icon'
	});
});