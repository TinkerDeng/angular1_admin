'use strict';
angular.module('app').service('basicService',
    function ($http, config, $q, $timeout) {
        this.send = function (api, data, method, noParam) {
            var defer = $q.defer();
            $http({
                method: method || 'POST',
                url: config.apiHost + api,
                data: noParam ? data : $.param(data),
                headers: noParam ? {'Content-Type': 'application/json;charset=utf-8'} : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
            }).success(function (data) {
                defer.resolve(data);
            }).error(function (data) {
                defer.reject(data)
            });
            return defer.promise;
        };
    }
);
