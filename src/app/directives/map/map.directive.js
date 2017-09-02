'use strict';
angular.module('app')
	.directive('map', function(ngDialog, $timeout) {
		return {
			templateUrl: 'app/directives/map/map.html',
			restrict: 'AE',
			replace: true,
			scope: {},
			require: '?ngModel',
			link: function($scope, $element, $attr, $ctrl) {
				$ctrl && ($ctrl.$render = function() {
					if($ctrl.$viewValue) {
						$scope.lonLat = $ctrl.$viewValue || {};
						if($scope.lonLat.bd) {
							$scope.isUpdate = true;
							$scope.show = true;
						} else {
							$scope.isUpdate = false;
						}

					}
				});
				$scope.addMap = function(item) {
					ngDialog.open({
						template: 'app/directives/map/dialog.html',
						appendClassName: 'addChild',
						controller: ['$scope', function(scope) {
							scope.input = {};
							scope.input.value = "";
							// 百度地图API功能
							$timeout(function() {
								scope.map = new BMap.Map("myMap");
								var geoc = new BMap.Geocoder();
								if(item) {
									scope.map.centerAndZoom(new BMap.Point(item.lng, item.lat), 16);
									var point = new BMap.Point(item.lng, item.lat);
									var marker = new BMap.Marker(point);
									scope.map.addOverlay(marker);
									marker.disableDragging();
								} else {
									scope.map.centerAndZoom("天津", 16);
								}

								function showInfo(e) {
									//百度经纬度坐标转国测局坐标
									var bd09togcj02 = coordtransform.bd09togcj02(e.point.lng, e.point.lat);

									//国测局坐标转wgs84坐标
									var gcj02towgs84 = coordtransform.gcj02towgs84(bd09togcj02[0], bd09togcj02[1]);
									var data = {
										bd: {
											lng: e.point.lng,
											lat: e.point.lat
										},
										gc: {
											lng: bd09togcj02[0],
											lat: bd09togcj02[1]
										},
										wgs84: {
											lng: gcj02towgs84[0],
											lat: gcj02towgs84[1]
										}
									};
									geoc.getLocation(e.point, function(res) {
										var addComp = res.addressComponents;
										var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
										$scope.lonLat = data;
										$scope.lonLat.address = address;
										$scope.show = true;
										$scope.isUpdate = true;
										$ctrl && $ctrl.$setViewValue($scope.lonLat);
										scope.closeThisDialog();
									});
								};
								scope.map.addEventListener("click", showInfo);
								scope.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
							}, 500);
							scope.search = function() {
								if(!scope.input.value) {
									alert("必须输入有效地址");
									scope.input.value = "";
									return false;
								}
								var myGeo = new BMap.Geocoder();
								myGeo.getPoint(scope.input.value, function(point) {
									if(point) {
										scope.map.centerAndZoom(point, 16);
										scope.map.addOverlay(new BMap.Marker(point));
									} else {
										alert("对不起，没有搜索到结果!");
									}
								}, "天津市");
							}
						}]
					});
				}
			}
		};
	});