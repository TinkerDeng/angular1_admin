angular.module('app').config(function($stateProvider, routerManagerProvider) {
	routerManagerProvider.add('home', {
		url: '/home',
		templateUrl: 'app/module/home/home.html',
		controller: 'homeController',
		resolve: {
			initData: ['dimmerService', '$q',
				function(dimmerService, $q) {
					dimmerService.show();
					return {};
					/*var now = new moment();
					 var today = now.clone().format('YYYY-MM-DD');
					 var yesterday = now.clone().subtract(1, 'days').format('YYYY-MM-DD');
					 var monday = now.clone().subtract(now.format('d') - 1, 'days').format('YYYY-MM-DD');

					 return $q.all([
					 productService.statistics(),
					 orderService.statistics(),
					 orderService.getAmount(today + ' 00:00:00', today + ' 23:59:59'),
					 orderService.getAmount(yesterday + ' 00:00:00', yesterday + ' 23:59:59'),
					 orderService.getAmount(monday + ' 00:00:00', today + ' 23:59:59'),
					 orderService.getAmount(now.format('YYYY-MM') + '-01 00:00:00', today + ' 23:59:59')
					 ])*/
				}
			]
		},
		title: '系统首页',
		desc: '系统首页',
		icon: 'large adjust icon'
	});
});