'use strict';
angular.module('app').directive('pagination',
	function ($rootScope) {
		return {
			templateUrl: 'app/directives/pagination/pagination.html',
			restrict: 'AE',
			replace: true,
			scope: {
				pageTotal: '=',
				pageChange: '=?',
				pageNum: '=?'
			},
			link: function ($scope, element, attr) {
				$scope.pagesLength = 9;
				if ($scope.pageChange) {
					$scope.pageCurrent = $scope.pageNum;
					$scope.$watch('pageNum', function (value) {
						if (value != $scope.pageCurrent) {
							$scope.pageCurrent = value;
						}
					});
				} else {
					$scope.pageCurrent = $rootScope.$stateParams.pageNum * 1;
				}
				$scope.gotoNum = $scope.pageCurrent;

				var goto = function () {
					if ($scope.pageChange) {
						getPageList();
						$scope.pageChange($scope.pageCurrent);
					} else {
						$rootScope.$state.go($rootScope.$state.current.name, {pageNum: $scope.pageCurrent})
					}
				};

				$scope.prevPage = function () {
					if ($scope.pageCurrent > 1) {
						$scope.pageCurrent -= 1;
						goto();
					}
				};

				$scope.nextPage = function () {
					if ($scope.pageCurrent < $scope.pageTotal) {
						$scope.pageCurrent += 1;
						goto();
					}
				};

				$scope.changePage = function (item) {
					if (item == '...') {
						return;
					} else {
						$scope.pageCurrent = item;
					}
					goto();
				};
				var getPageList = function () {
					$scope.pageCurrent *= 1;
					var pageList = [];
					if ($scope.pageTotal <= $scope.pagesLength) {
						for (var i = 1; i <= $scope.pageTotal; i++) {
							pageList.push(i);
						}
					} else {
						var offset = ($scope.pagesLength - 1) / 2;
						if ($scope.pageCurrent <= offset) {
							// 左边没有...
							for (var i = 1; i <= offset + 1; i++) {
								pageList.push(i);
							}
							pageList.push('...');
							pageList.push($scope.pageTotal);
						} else if ($scope.pageCurrent > $scope.pageTotal - offset) {
							// 右边没有...
							pageList.push(1);
							pageList.push('...');
							for (var i = offset + 1; i >= 1; i--) {
								pageList.push($scope.pageTotal - i);
							}
							pageList.push($scope.pageTotal);
						} else {
							// 最后一种情况，两边都有...
							pageList.push(1);
							pageList.push('...');

							for (var i = Math.ceil(offset / 2); i >= 1; i--) {
								pageList.push($scope.pageCurrent - i);
							}
							pageList.push($scope.pageCurrent);
							for (i = 1; i <= offset / 2; i++) {
								pageList.push($scope.pageCurrent + i);
							}

							pageList.push('...');
							pageList.push($scope.pageTotal);
						}
					}
					$scope.pageList = pageList;
				};
				$scope.$watch('pageTotal', function (newValue, oldValue) {
					getPageList();
				})
			}
		};
	}
);
