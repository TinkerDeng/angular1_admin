'use strict';

angular.module('app').service('relationService',
    function (basicService) {
        this.getList = function (id, offset, limit) {
            var api = '/public/articleRelation/listViArticleRelation/' + offset + '/' + limit + "?articleId=" + id;
            return basicService.send(api, '', 'GET');
        };
        this.addRelation = function (data) {
            var api = '/admin/articleRelation/add';
            return basicService.send(api, data);
        };
        this.deleteRelation = function (id) {
            var api = '/admin/articleRelation/delete';
            return basicService.send(api, {
                articleRelationId: id
            });
        };
        this.updateRelation = function (data) {
            var api = '/admin/articleRelation/update';
            return basicService.send(api, data);
        };
    }
);