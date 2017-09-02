/**
 * Created by lxp on 2016/7/19.
 */
'use strict';

angular.module('app').filter('img',
	function (config) {
		return function (input, value) {
			if (!input) {
				if (!value) {
					value = 'noImg2.jpg';
				}
				return 'assets/images/' + value;
			}
			if (input.indexOf('http://') != -1) {
				return input;
			}
			return config.imgHost + input;
		};
	}
);
