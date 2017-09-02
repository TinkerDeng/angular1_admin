'use strict';
angular.module('app').service('httpInterceptor',
    function ($q, $rootScope, localStorageService, dimmerService) {
        return {
            'request': function (config) {
                if (localStorageService.get("token")) {
                    //config.headers['Content-Type'] = "application/x-www-form-urlencoded;charset=utf-8";
                    config.headers['Authorization'] = "Bearer " + localStorageService.get("token");
                }
                return config;
            },
            'requestError': function (rejection) {
                console.error('数据发送失败');
                return $q.reject(rejection);
            },
            'response': function (response) {
                return response;
            },
            'responseError': function (rejection) {
                if (rejection.status == 401 || rejection.status == 403) {
                    $rootScope.toastr.error('登录时间过长!', '请重新登录');
                    $rootScope.$state.go('login');
                } else if (rejection.status == 502) {
                    $rootScope.toastr.error('服务器无响应!', '请重新登录');
                    $rootScope.$state.go('login');
                } else if (rejection.status == 0) {
                    $rootScope.toastr.error('跨域状态，请求失败!', '请求失败');
                    $rootScope.$state.go('login');
                }
                dimmerService.hide();
                return $q.reject(rejection);
            }
        };
    }
);

