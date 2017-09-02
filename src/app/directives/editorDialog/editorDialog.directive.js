'use strict';
angular.module('app')
	.directive('editorDialog', function($state, $timeout, routerManager, ngDialog, layerService, toastr, config) {
		return {
			templateUrl: 'app/directives/editorDialog/editorDialog.html',
			restrict: 'AEMC',
			replace: true,
			scope: {
				recommandToHome: "="
			},
			require: '?ngModel',
			transclude: true,
			controller: function($scope, $element) {
				//text
				this.addText = function(item, index) {
					ngDialog.open({
						template: 'app/directives/editorDialog/html/text.html',
						appendClassName: 'addChild',
						controller: ['$scope', function(scope) {
							scope.data = item ? $.extend(true, {}, item) : {};
							scope.submit = function() {
								var data = {
									info: scope.data.info,
									autoresize: true,
									type: 1,
									w: 0,
									h: 0,
									c: 0,
									m_left: 0,
									m_top: 0
								};
								if(item) {
									$scope.upDateList(scope, data, index);
								} else {
									$scope.addList(scope, data);
								}
							}
						}]
					});
				};
				//img
				this.addImage = function(item, index) {
					ngDialog.open({
						template: 'app/directives/editorDialog/html/image.html',
						appendClassName: 'addChild',
						controller: ['$scope', function(scope) {
							scope.data = item ? $.extend(true, {}, item) : {};
							scope.data.autoresize = false;
							scope.submit = function() {
								var data = {
									image: scope.data.image,
									info: scope.data.info,
									type: 2,
									w: scope.data.w || 0,
									h: scope.data.h || 0,
									c: 0,
									m_left: 0,
									m_top: 0,
									autoresize: scope.data.autoresize,
									hotspot: scope.data.hotspot || []
								};
								if(item) {
									$scope.upDateList(scope, data, index);
								} else {
									$scope.addList(scope, data);
								}
								scope.closeThisDialog();
							}
						}]
					});
				};
				//vedio
				this.addVideo = function(item, index) {
					ngDialog.open({
						template: 'app/directives/editorDialog/html/vedio.html',
						appendClassName: 'addChild',
						controller: ['$scope', function(scope) {
							scope.data = item ? $.extend(true, {}, item) : {};
							scope.otherData = {};
							scope.otherData.type = 0;
							scope.submit = function() {
								var data = {
									"image": scope.data.image,
									"info": scope.data.info,
									"type": 3,
									w: 0,
									h: 0,
									c: 0,
									m_left: 0,
									m_top: 0,
									autoresize: true
								}
								if(item) {
									$scope.upDateList(scope, data, index);
								} else {
									$scope.addList(scope, data);
								}
								scope.closeThisDialog();
							}
						}]
					});
				};
				//audio
				this.addAudio = function(item, index) {
					ngDialog.open({
						template: 'app/directives/editorDialog/html/audio.html',
						appendClassName: 'addChild',
						controller: ['$scope', function(scope) {
							scope.data = {};
							scope.otherData = {};
							scope.otherData.type = 0;
							if(item) {
								scope.data.title = item.info.title;
								scope.data.info = item.info.info;
								scope.data.image = item.image;
							}
							scope.submit = function() {
								var audio = {
									title: scope.data.title,
									info: scope.data.info
								}
								var data = {
									"image": scope.data.image,
									"info": audio,
									"type": 4,
									w: 0,
									h: 0,
									c: 0,
									m_left: 0,
									m_top: 0,
									autoresize: true
								}
								if(item) {
									$scope.upDateList(scope, data, index);
								} else {
									$scope.addList(scope, data);
								}
								scope.closeThisDialog();
							}
						}]
					});
				};
			},
			controllerAs: "main",
			link: function($scope, $element, $attr, $ctrl) {
				$ctrl && ($ctrl.$render = function() {
					if($ctrl.$viewValue) {
						$scope.jsonList = $ctrl.$viewValue || {};
						$scope.jsonList.content.push({
							autoresize: true,
							isTextarea: true,
							isMove: true,
							info: "",
							m_left: 0,
							m_top: 0,
							type: 1,
							w: 0,
							h: 0,
							c: 0
						});
					}
				});
				$scope.addTextarea = function() {
					var data = {
						isTextarea: true,
						isMove: true,
						autoresize: true,
						type: 1,
						info: "",
						w: 0,
						h: 0,
						c: 0,
						m_left: 0,
						m_top: 0
					};
					$scope.jsonList.content.push(data);
					$timeout(function() {
						var textArea = $element.find(".textArea");
						textArea.on("input", function(ev) {
							$timeout(function() {
								moveFn(ev);
							});
						});
					}, 200);
				};
				$scope.upDateList = function(scope, data, index) {
					$scope.jsonList.content.splice(index, 1, data);
					$ctrl && $ctrl.$setViewValue($scope.jsonList);
					scope.closeThisDialog();
				};
				$scope.addList = function(scope, data) {
					var textVal = $element.find(".textArea").val();
					var total = $scope.jsonList.content.length - 1;
					if(textVal) {
						var item = {
							type: 1,
							info: textVal,
							w: 0,
							h: 0,
							c: 0,
							m_left: 0,
							m_top: 0,
							autoresize: true
						};
						$scope.jsonList.content[total] = item;
						$scope.jsonList.content.push(data);
						$ctrl && $ctrl.$setViewValue($scope.jsonList);
						$scope.addTextarea();
					} else {
						$scope.jsonList.content.splice(total, 0, data);
					}
					scope.closeThisDialog();
				};
				$scope.delete = function(index) {
					layerService.confirm('警告', '确认要删除该内容吗？').then(function() {
						$scope.jsonList.content.splice(index, 1);
						toastr.success('删除成功!');
					})
				};
			}
		};
	});