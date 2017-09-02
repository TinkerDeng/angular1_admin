'use strict';
angular.module('app').service('newsService',
	function(basicService, util) {
		this.add = function(data) {
			var api = '/admin/article/add';
			return basicService.send(api, data);
		};
		this.getList = function(offset, limit) {
			var api = '/public/article/list/' + offset + '/' + limit;
			return basicService.send(api, '', 'GET');
		};
		this.delete = function(articleId) {
			var api = '/admin/article/delete';
			return basicService.send(api, {
				articleId: articleId
			});
		};
		//话题
		this.getTopicList = function(offset, limit) {
			var api = '/public/articleTopic/list/' + offset + '/' + limit;
			return basicService.send(api, '', 'GET');
		};
		this.addTopic = function(data) {
			var api = '/admin/articleTopic/add';
			return basicService.send(api, data);
		};
		this.updateTopic = function(data) {
			var api = '/admin/articleTopic/update';
			return basicService.send(api, data);
		};
		this.deleteTopic = function(id) {
			var api = '/admin/articleTopic/delete';
			return basicService.send(api, {
				articleTopicId: id
			});
		};
		this.getTopicById = function(id) {
			var api = '/public/articleTopic/select/' + id;
			return basicService.send(api, '', 'GET');

		}
		//文章
		this.getPostList = function(offset, limit, articleType,search) {
			var articleType = articleType || 1;
			var api = '/public/my/article/list/' + offset + '/' + limit + "?articleType=" + articleType;
			if(search){
				api+="&key="+search
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
		/*//标签
		 this.addTag = function(data) {
		 var api = '/common/tag/add';
		 return basicService.send(api, data);
		 };
		 this.getTagById = function(id) {
		 var api = '/common/tag/select/' + id;
		 return basicService.send(api, '', 'GET');

		 }
		 this.getTagList = function(offset, limit) {
		 var api = '/common/tag/list/' + offset + '/' + limit;
		 return basicService.send(api, '', 'GET');
		 };
		 this.updateTag = function(data) {
		 var api = '/common/tag/update';
		 return basicService.send(api, data);
		 };
		 this.deleteTag = function(id) {
		 var api = '/common/tag/delete';
		 return basicService.send(api, {
		 tagId: id
		 });
		 };*/

	}
);