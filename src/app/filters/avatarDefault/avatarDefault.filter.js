/**
 * Created by lxp on 2016/7/19.
 */
'use strict';

angular.module('app')
  .filter('defaultAvatar', function () {
    return function (input) {
      return input || 'assets/images/avatar-default.png';
    };
  });
