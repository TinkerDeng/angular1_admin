'use strict';
angular.module('app')
	.service('dimmerService', function($q, $rootScope) {
		this.active = false;
		this.show = function() {
			this.active = true;
			$rootScope.$broadcast('dimmerService.show');
		};
		this.hide = function() {
			this.active = false;
			$rootScope.$broadcast('dimmerService.hide');
		}
	});