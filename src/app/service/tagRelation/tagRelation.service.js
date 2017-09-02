'use strict';

angular.module('app').service('tagRelationService',
	function(basicService, util) {
		this.getList = function(id, offset, limit) {
			var api = '/public/articleTagRelation/list/' + offset + '/' + limit + "?articleId=" + id;
			return basicService.send(api, '', 'GET');
		};
		this.selete = function(id) {
			var api = '/public/articleTagRelation/select/' + id;
			return basicService.send(api, '', 'GET');
		};
		this.addRelation = function(data) {
			var api = '/admin/articleTagRelation/add';
			return basicService.send(api, data);
		};
		this.deleteRelation = function(id) {
			var api = '/admin/articleTagRelation/delete';
			return basicService.send(api, {
				articleTagRelationId: id
			});
		};
	}
);