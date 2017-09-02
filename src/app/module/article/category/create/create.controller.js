angular.module('app').controller('article.category.createController',
	function($rootScope, $scope, articleService, toastr) {
		$scope.data = {};
		$scope.data.topicRecommendSort = 1;
		$scope.submit = function() {
			var data = {
				topicTitle: $scope.data.topicTitle
				/*topicDescription: $scope.data.topicDescription,
				topicOtherText: $scope.data.topicOtherText,
				topicRecommendSort: $scope.data.topicRecommendSort*/
			};
			articleService.addTopic(data).then(function(data) {
				$rootScope.$state.go('article.category.list', {
					pageNum: 1
				});
			})
		}
	}
);