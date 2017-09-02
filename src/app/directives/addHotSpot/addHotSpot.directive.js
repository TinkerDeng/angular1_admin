'use strict';
angular.module('app')
	.directive('addHotSpot', function($rootScope, ngDialog, $timeout, layerService, toastr, config) {
		return {
			templateUrl: 'app/directives/addHotSpot/addHotSpot.html',
			restrict: 'AE',
			replace: true,
			scope: {
				hotType: "@?",
				isPicId: "@?"
			},
			require: '?ngModel',
			transclude: true,
			link: function($scope, $element, $attr, $ctrl) {
				
				$scope.data = {};
				$ctrl && ($ctrl.$render = function() {
					if($ctrl.$viewValue) {
						var data = $ctrl.$viewValue;
						if((data.hotspot) && (typeof data.hotspot == "string")) {
							var hotJSON = JSON.parse(data.hotspot);
							$scope.data = data;
							$scope.data.hotspot = hotJSON;
						} else {
							$scope.data = data;
						}
					} else {
						$scope.data = {};
						$scope.data.hotspot = [];
					}
				});

				/*
				 * 编辑热点
				 * */
				$scope.editHotSpotModal = function() {
					ngDialog.open({
						template: 'app/directives/addHotSpot/hot.html',
						appendClassName: 'addChild',
						controller: ['$scope', function(scope) {
							//初始化数据
							var offset = 150;
							var showSpotElement = $(".showSpot");
							scope.data = $scope.data || {};
							scope.hotSpotData = {};
							scope.hotspot = $.extend(true, [], $scope.data.hotspot) || [];
							scope.config = {
								/*
								 * showInerLink:true      显示内链
								 * showOutLink:false      显示外链
								 * showId:true			  显示ID输入框
								 * showUrl:true			  显示URL输入框
								 */
								linkType: [{
									title: "内链",
									value: 1,
									showId: true
								}, {
									title: "外链",
									value: 2,
									showUrl: true
								}],
								type: [{
										title: "新闻",
										value: 1,
										linkTypes: [1, 2]
									}, {
										title: "景点",
										value: 2,
										linkTypes: [1, 2]
									}, {
										title: "活动",
										value: 3,
										linkTypes: [1, 2]
									}
									/*, {
									                                    title: "搜索",
									                                    value: 4
									                                }*/
								]
							};

							scope.currentType = scope.config.type[0];
							scope.currentLinkType = scope.config.linkType[0];
							scope.change = function(item) {
								scope.currentType = item;
								scope.currentLinkType = scope.config.linkType[0];
								scope.hotSpotData.targetValue = ''
							};
							scope.choice = function(item) {
								scope.currentLinkType = item;
								scope.hotSpotData.targetValue = '';
							};

							/*
							 * 当前showHotEditModal显示的原因
							 *  add 添加 edit 修改
							 * */
							var currentActive = 'add';
							/*
							 * 显示标记点编辑Modal
							 * @param ev 如果ev.value存在则为一个obj对象，反之则为event对象
							 * */

							scope.showHotEditModal = function(ev) {
								showSpotElement = $(".showSpot");
								if(ev.value) {
									currentActive = 'edit';
									scope.hotSpotData = ev;
									//初始化currentType、currentLinkType
									for(var i = 0; i < scope.config.type.length; i++) {
										if(scope.config.type[i].value == scope.hotSpotData.targetType) {
											scope.currentType = scope.config.type[i];
											break;
										}
									}
									for(i = 0; i < scope.config.linkType.length; i++) {
										if(scope.config.linkType[i].value == scope.hotSpotData.targetLinkType) {
											scope.currentLinkType = scope.config.linkType[i];
											break;
										}
									}
								} else {
									currentActive = 'add';
									ev.preventDefault();
									//计算left top persentX persentY
									var target = $(ev.target);
									var targetWidth = parseInt(target.width());
									var targetHeight = parseInt(target.height());
									var inputWidth = parseInt(showSpotElement.outerWidth());
									var inputHeight = parseInt(showSpotElement.outerHeight());
									scope.hotSpotData = {
										direction: 1,
										left: ev.offsetX,
										top: ev.offsetY,
										persentX: ((ev.offsetX / targetWidth) * 100).toFixed(2),
										persentY: ((ev.offsetY / targetHeight) * 100).toFixed(2)
									};
								}

								var left = scope.hotSpotData.left;
								var top = scope.hotSpotData.top;
								if(left >= (targetWidth - inputWidth)) {
									left = targetWidth - inputWidth;
								}
								if(top >= targetHeight - inputHeight) {
									top = targetHeight - inputHeight;
								}
								showSpotElement.css({
									display: "block",
									left: left,
									top: top
								});
							};

							/*
							 * 隐藏标记点编辑窗口
							 * */
							scope.hiddenHotEditModal = function() {
								scope.data.value = "";
								scope.data.targetValue = "";
								showSpotElement.css({
									"display": "none"
								});
							};

							/*
							 * 修改标记点
							 * @param item 当前标记点数据
							 * @param index 当前标记点索引值
							 * */
							scope.updateHot = function(item) {
								scope.showHotEditModal(item)
							};

							/*
							 * 删除标记点
							 * */
							scope.delHot = function(item, index) {
								scope.hotspot.splice(index, 1);
							};

							/*
							 * 完成对标记点的添加或者修改
							 * */
							scope.finish = function() {
								scope.hotSpotData.targetType = scope.currentType.value;
								scope.hotSpotData.targetLinkType = scope.currentLinkType.value;
								if(currentActive == 'add') {
									scope.hotspot.push(scope.hotSpotData);
								}
								showSpotElement.css({
									display: "none"
								});
							};

							/*
							 * 标记点鼠标事件
							 * @description 显示添加或删除层
							 * */
							scope.myMouseover = function(ev) {
								ev.stopPropagation();
								var target = $(ev.target);
								target.find(".tipArea").css({
									"display": "block"
								});
								return false;
							};
							scope.myMouseout = function(ev) {
								var target = $(ev.target);
								var targetClass = target.attr("class") || "";
								if(targetClass.indexOf("position") != -1) {
									target.find(".tipArea").css({
										"display": "none"
									});
								} else {
									target.parents(".tipArea").css({
										"display": "none"
									});
								}
								return false;
							};

							/*
							 * 提交热点编辑结果
							 * */
							scope.submit = function() {
								$scope.data.hotspot = scope.hotspot;
								$ctrl && $ctrl.$setViewValue($scope.data);
								scope.closeThisDialog();
							};
						}]
					});
				};
			}
		};
	});