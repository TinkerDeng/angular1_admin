angular.module('app').config(function($urlRouterProvider, routerManagerProvider) {
	$urlRouterProvider.when('/label/tag/edit', '/label/tag/list/1');
	routerManagerProvider.add('label.tag.edit', {
		url: '/edit/{id:[1-9][0-9]*}',
		templateUrl: 'app/module/label/tag/create/create.html', //同create页面，直接调用
		controller: 'label.tag.editController',
		resolve: {
			initData: ['$q', 'dimmerService', '$stateParams', 'tagService',
				function($q, dimmerService, $stateParams, tagService) {
					dimmerService.show();
					return tagService.getById($stateParams.id);
				}
			]
		},
		title: '修改标签',
		desc: '修改选中的标签名称',
		icon: 'edit icon'
	});
});