/**
 * Created by lxp on 2016/7/22.
 */
'use strict';
angular.module('app').provider('util',
	function() {
		var serialize = function(obj) {
			var arr = [];
			for(var key in obj) {
				if(obj[key] === '' || obj[key] === undefined) continue;
				arr.push(encodeURI(key) + '=' + encodeURI(obj[key]));
			}
			return arr.join('&');
		};
		var deserialize = function(str) {
			if(!str || typeof str != 'string') return {};
			var obj = {};
			var arr = str.split('&');
			for(var i = 0, j = arr.length; i < j; i++) {
				var item = arr[i].split('=');
				obj[decodeURI(item[0])] = decodeURI(item[1]);
			}
			return obj;
		};

		this.serialize = serialize;
		this.deserialize = deserialize;

		this.$get = function() {
			var server = {};
			server.getObjectValueToArray = function(obj) {
				var arr = [];
				for(var key in obj) {
					arr.push(obj[key]);
				}
				return arr;
			};
			server.deserialize = deserialize;
			server.serialize = serialize;

			return server;
		};
	}
);