'use strict';
angular.module('app').service('viewsService',
	function(basicService, util) {
		//文章
		this.getPostList = function(offset, limit, search) {
			var api = '/public/my/article/list/' + offset + '/' + limit + "?articleType=2";
			if(search) {
				api += "&key=" + search
			}
			return basicService.send(api, '', 'GET');
		};
		this.addPost = function(data) {
			var api = '/admin/article/add';
			return basicService.send(api, data);
		};
		this.updatePost = function(data) {
			var api = '/admin/article/update';
			return basicService.send(api, data);
		};
		this.deletePost = function(id) {
			var api = '/admin/article/delete';
			return basicService.send(api, {
				articleId: id
			});
		};
		this.getPostById = function(id) {
			var api = '/public/article/select/' + id;
			return basicService.send(api, '', 'GET');

		}
		//评论
		this.addComment = function(data) {
			var api = '/admin/articleComment/add';
			return basicService.send(api, data);
		};
		this.getCommentById = function(id) {
			var api = '/public/articleComment/select/' + id;
			return basicService.send(api, '', 'GET');

		};
		this.getCommentList = function(id, offset, limit) {
			var api = '/public/articleComment/list/' + offset + '/' + limit + "?articleId=" + id;
			return basicService.send(api, '', 'GET');
		};
		this.updateComment = function(data) {
			var api = '/admin/articleComment/update';
			return basicService.send(api, data);
		};
		this.deleteComment = function(id) {
			var api = '/admin/articleComment/delete';
			return basicService.send(api, {
				articleCommentId: id
			});
		};
	}
);