angular.module('app').controller('label.tag.createController',
	function($rootScope, $scope, tagService, toastr) {
		$scope.data = {};
		$scope.submit = function() {
			var data = {
				tagName: $scope.data.tagName
			};
			tagService.add(data).then(function(data) {
				$rootScope.$state.go('label.tag.list', {
					pageNum: 1
				});
			})
		}
	}
);