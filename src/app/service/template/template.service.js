'use strict';

angular.module('app').service('templateService',
    function (basicService) {
        this.add = function (data) {
            var api = '/admin/template/add';
            return basicService.send(api, data);
        };
        this.update = function (data) {
            var api = '/admin/template/update';
            return basicService.send(api, data);
        };
        this.delete = function (templateId) {
            var api = '/admin/template/delete';
            return basicService.send(api, {templateId: templateId});
        };
        this.getList = function (offset, limit, onUse) {
            var api = '/public/template/list/' + offset + '/' + limit;
            if (onUse) {
                api += '?onUse=' + onUse;
            }
            return basicService.send(api, '', 'GET');
        };
        this.getById = function (templateId) {
            var api = '/public/template/select/' + templateId;
            return basicService.send(api, '', 'GET');
        }
    }
);
