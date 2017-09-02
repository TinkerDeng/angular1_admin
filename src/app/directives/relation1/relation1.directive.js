'use strict';
angular.module('app').directive('relation1', function($rootScope,$q, ngDialog) {
	return {
		templateUrl: 'app/directives/relation1/relation1.html',
		restrict: 'AE',
		replace: true,
		transclude: true,
		scope: {
			itemTitle: "@",
			itemId: "@",
			conf: "=",
			max: "=",
			isNews: "="
		},
		link: function($scope, $element, $attr) {
			var max = $scope.max || 7;
			var conf = $scope.conf;
			var itemId = $scope.itemId;
			$scope.showRelation = function(id, isNews) {
				ngDialog.open({
					templateUrl: 'app/directives/relation1/relationDialog1.html',
					appendClassName: 'relation',
					controller: ["$scope", function($scope) {
						$scope.pagenum = 1;
						$scope.isNews = isNews ? true : false;
						$scope.conf = conf;
						$q.all([$scope.conf.bindListPromise.getList(itemId, 0, 1000), $scope.conf.allListPromise.getList(($scope.pagenum - 1), max)]).then(function(data) {
							//已绑定
							$scope.bindList = data[0].result;
							//待绑定
							$scope.allList = data[1].result;
							$scope.totalPage = data[1].totalPage;
							checkRelation($scope.allList);
						});
						$scope.change = function(pagenum) {
							$scope.conf.allListPromise.getList((pagenum - 1) * max, max).then(function(data) {
								$scope.allList = data.result;
								checkRelation($scope.allList);
							});
						};
						var checkRelation = function(data) {
							for(var i = 0; i < data.length; i++) {
								data[i].relationed = false;
								for(var j = 0; j < $scope.bindList.length; j++) {
									if($scope.bindList[j][$scope.conf.idName] == data[i][$scope.conf.idName]) {
										data[i].relationed = true;
										break;
									}
								}
							}
						};
						$scope.cancelRelation = function(index, data) {
							$scope.conf.submitPromise.deleteRelation(data.relationId).then(function(data) {
								$scope.bindList.splice(index, 1);
								checkRelation($scope.allList);
							});
						}
						$scope.relation = function(data) {
							var data1 = {
								tagId: data.tagId,
								articleId: itemId
							};
							$scope.conf.submitPromise.addRelation(data1).then(function(item) {
								var item = {
									relationId: item.returnId,
									tagId: data.tagId,
									articleId: itemId,
									tagName: data.tagName
								}
								$scope.bindList.push(item);
								checkRelation($scope.allList);
							});
						}
						$scope.submit = function() {
							$scope.closeThisDialog();
						}
						$scope.find = function(item) {
							$scope.closeThisDialog();
							$rootScope.$state.go('article.content.list', {
								pageNum: 1,
								tagId:item.tagId
							});
						}
					}]
				});
			}
		}
	};
});