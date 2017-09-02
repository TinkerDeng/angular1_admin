/**
 * Created by lxp on 2016/7/19.
 */
'use strict';

angular.module('app').filter('notImageFilePreview',
	function(config) {
		return function(input, value) {
			if(!input) {
				if(!value) {
					value = 'noImg2.jpg';
				}
				return 'assets/images/' + value;
			}
			var reg = /.mp[3|4]$/;
			if(reg.test(input)) {
				return 'assets/images/noPreview.png';
			}
			if(input.indexOf('http://') != -1) {
				return input;
			}
			return config.imgHost + input;
		};
	}
);