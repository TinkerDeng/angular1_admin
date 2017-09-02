'use strict';
angular.module('app').service('tokenService',
	function(basicService) {
		this.getToken = function(username, password) {
			var api = '/oauth/token';
			/*var data = {
				'grant_type': 'password',
				'client_id': 'point_client',
				'client_secret': 'e7ax1976',
				'username': username,
				'password': password
			};*/
			var data = {
				'grant_type': 'password',
				'client_id': 'my-trusted-client-with-secret',
				'client_secret': 'somesecret',
				'username': username,
				'password': password
			};
			return basicService.send(api, data)
		};
	}
);