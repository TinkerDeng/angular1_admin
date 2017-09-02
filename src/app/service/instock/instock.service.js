'use strict';

angular.module('app').service('instockService',
	function (basicService) {
		this.add = function (data) {
			var api = '/admin/instock/add';
			return basicService.send(api, data);
		};
		this.getList = function (offset, limit) {
			var api = '/admin/instock/list/' + offset + '/' + limit;
			return basicService.send(api, '', 'GET');
		};
		this.getById = function (instockId) {
			var api = '/admin/instock/select/' + instockId;
			return basicService.send(api, data, 'GET');
		};
	}
);
