angular.module('app').config(function ($stateProvider) {
  $stateProvider
    .state('noMatch', {
      url: '/404',
      templateUrl: 'app/module/noMatch/noMatch.html'
    });
});

