/**
 * Created by lxp on 2016/7/21.
 */
angular.module('app').provider("routerManager", function ($stateProvider) {
  var routes = {};

  this.add = function (name, option) {
    $stateProvider.state(name, option);
    option.sort = option.sort || 0;
    var routesName = name.split('.');
    routes[name] = $.extend(routes[name], option);

    var childName = routesName.pop();
    if (routesName.length > 0) {
      var parent = routesName.join('.');
      routes[parent] = routes[parent] || {};
      routes[parent].children = routes[parent].children || {};
      routes[parent].children[childName] = routes[name];
      routes[name].parent = routes[parent];
    }

  };
  this.$get = function () {
    var server = {};

    server.getRoutes = function () {
      var routers = $.extend({}, routes);
      for (var key in routers) {
        if (key.split('.').length > 1) {
          delete routers[key];
        }
      }
      return routers;
    };

    server.getRouteByName = function (name) {
      return routes[name] || {};
    };

    server.setAttribute = function (name, key, value) {
      routes[name][key] = value;
    };

    return server;
  }
});
