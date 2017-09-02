angular.module('app').config(function ($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/module/login/login.html',
            controller: 'loginController'
        });
});

