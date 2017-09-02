'use strict';

angular.module('app').service('homeService',
	function (basicService) {

		this.refreshHomePage = function () {
			var api = '/admin/product/homepage/refresh';
			return basicService.send(api, '', 'GET')
		};

		this.getHomePage = function () {
			var api = '/public/product/homepage/select';
			return basicService.send(api, '', 'GET')
		};

		this.setBanner = function (productList) {
			var api = '/admin/product/sector/update';
			var data = [];
			for (var i = 0; i < productList.length; i++) {
				data.push({
					productId: productList[i].productId,
					sectorId: 1,
					productSort: i
				})
			}
			if (data.length == 0) {
				data = [{
					sectorId: 1
				}]
			}
			return basicService.send(api, data, 'POST', true)
		};

		this.getBanner = function () {
			var api = '/public/productSectorRelation/list/0/10?sectorId=1';
			return basicService.send(api, '', 'GET')
		};


		this.setCategory = function (categoryList) {
			var api = '/admin/category/top/update';
			var data = [];
			for (var i = 0; i < categoryList.length; i++) {
				data.push({
					categoryId: categoryList[i].categoryId,
					onTop: true,
					categorySort: i
				})
			}
			return basicService.send(api, data, 'POST', true)
		};
		this.getCategory = function () {
			var api = '/public/category/list/0/10000?onTop=1';
			return basicService.send(api, '', 'GET')
		};


		this.setShowcase = function (showcase) {
			var api = '/admin/product/sector/update';
			var data = [];

			for (var key in showcase) {
				if (!showcase[key].productId)continue;
				data.push({
					productId: showcase[key].productId,
					productTitle: showcase[key].productTitle,
					relationAvatar: showcase[key].relationAvatar,
					sectorId: 3
				});
			}
			if (data.length == 0) {
				data = [{
					sectorId: 3
				}]
			}
			return basicService.send(api, data, 'POST', true)
		};
		this.getShowcase = function () {
			var api = '/public/productSectorRelation/list/0/10?sectorId=3';
			return basicService.send(api, '', 'GET');
		};


		this.setItems = function (productList) {
			var api = '/admin/product/sector/update';
			var data = [];
			for (var i = 0; i < productList.length; i++) {
				data.push({
					productId: productList[i].productId,
					sectorId: 4,
					productSort: i
				})
			}
			if (data.length == 0) {
				data = [{
					sectorId: 4
				}]
			}
			return basicService.send(api, data, 'POST', true);
		};
		this.getItems = function () {
			var api = '/public/productSectorRelation/list/0/10?sectorId=4';
			return basicService.send(api, '', 'GET');
		};
	}
);
