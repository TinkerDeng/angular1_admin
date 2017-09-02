'use strict';
angular.module('app').directive('tabs',
    function () {
        return {
            templateUrl: 'app/directives/tabs/tabs.html',
            restrict: 'AE',
            transclude: true,
            controllerAs: 'tabsCtrl',
            controller: ['$scope', function ($scope) {
                var self = this;
                this.tabs = [];
                this.addTab = function (item) {
                    this.tabs.push(item);
                };
                this.select = function (selectedTab) {
                    for (var i = 0; i < self.tabs.length; i++) {
                        self.tabs[i].active = false;
                    }
                    selectedTab.active = true;
                }
            }],
            link: function ($scope) {
            }
        };
    }
);
