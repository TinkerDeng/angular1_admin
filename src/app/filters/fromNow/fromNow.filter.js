/**
 * Created by lxp on 2016/7/19.
 */
'use strict';

angular.module('app').filter('fromNow',
    function () {
        return function (input) {
            var str = moment(input).fromNow();
            if (str.substring(str.length - 1, str.length) == '前') {
                return '已开始';
            } else {
                return str.substring(0, str.length - 1);
            }
        };
    }
);
