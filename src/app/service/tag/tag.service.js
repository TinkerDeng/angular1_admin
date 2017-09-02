'use strict';
angular.module('app').service('tagService',
	function(basicService, util) {
		this.add = function(data) {
			var api = '/admin/tag/add';
			return basicService.send(api, data);
		};
		this.getList = function(offset, limit) {
			var api = '/public/tag/list/' + offset + '/' + limit;
			return basicService.send(api, '', 'GET');
		}
		this.delete = function(id) {
			var api = '/admin/tag/delete';
			return basicService.send(api, {
				tagId: id
			});
		};
		this.getById = function(id) {
			var api = '/public/tag/select/' + id;
			return basicService.send(api, '', 'GET');
		}
		this.update = function(data) {
			var api = '/admin/tag/update';
			return basicService.send(api, data);
		};
		/*this.addTag = function(data) {
			var api = '/common/tag/add';
			return basicService.send(api, data);
		};
		this.getTagList = function(offset, limit) {
			var api = '/common/tag/list/' + offset + '/' + limit;
			return basicService.send(api, '', 'GET');
		};
		this.deleteTag = function(id) {
			var api = '/common/tag/delete';
			return basicService.send(api, {
				tagId: id
			});
		};*/

	}
);