angular.module('app').config(function($urlRouterProvider, routerManagerProvider) {
	$urlRouterProvider.when('/views/content/detail', '/views/content/detail/1');
	routerManagerProvider.add('views.content.detail', {
		url: '/detail/{id:[1-9][0-9]*}',
		templateUrl: 'app/module/views/content/detail/detail.html', //同create页面，直接调用
		controller: 'views.content.detailController',
		resolve: {
			initData: ['$q', 'dimmerService', '$stateParams', 'viewsService', 'config',
				function($q, dimmerService, $stateParams, viewsService, config) {
					dimmerService.show();
					return viewsService.getPostById($stateParams.id);
				}
			]
		},
		title: '景点详情',
		desc: '查看具体的景点详情',
		icon: 'edit icon'
	});
});