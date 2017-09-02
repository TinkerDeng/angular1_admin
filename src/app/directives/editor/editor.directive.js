'use strict';
angular.module('app')
	.directive('editor', function(uploadService, ngDialog, $timeout, config) {
		return {
			templateUrl: 'app/directives/editor/editor.html',
			restrict: 'AE',
			replace: true,
			require: '?ngModel',
			link: function($scope, $element, $attr, $ctrl) {
				var editor = new Simditor({
					textarea: $element.find('.editor'),
					allowedAttributes: {
						a: []
					},
					toolbar: [
							'title',
							'bold',
							'italic',
							'underline',
							'strikethrough',
							'fontScale',
							'color',
							'|',
							'ol',
							'ul',
							'blockquote',
							'code',
							'table',
							'|',
							//'link',
							'image',
							'hr',
							'|',
							'indent',
							'outdent',
							'alignment'
						]
						//upload: true
				});
				setTimeout(function() {
					var element = $element.find('.toolbar-item-image');
					var uploadBtn = $(element[0].outerHTML);
					element.after(uploadBtn);
					element.css({
						pointerEvents: 'none',
						visibility: 'hidden'
					});
					uploadBtn.css({
						position: 'absolute',
						top: 0,
						left: 0
					});
					uploadBtn.on('click', function() {
						$timeout(function() {
							ngDialog.open({
								template: 'editorUploaderTemplate',
								appendClassName: 'editorUploaderTemplate',
								controller: ['$scope', function($scope) {
									$scope.data = {};
									$scope.submit = function() {
										ngDialog.closeAll();
										editor.focus();
										var imgs = $scope.data.imgsUrl.split(',');
										for(var i = 0, length = imgs.length; i < length; i++) {
											editor.selection.insertNode("<p style='text-align: center'><img src='" + config.imgHost + imgs[i] + "' style='max-width: 100%'/> </p>");
										}
									}
								}]
							})
						})
					});
				}, 100);

				$ctrl && ($ctrl.$render = function() {
					if($ctrl.$viewValue) {
						editor.setValue($ctrl.$viewValue);
					}
				});
				editor.on('valuechanged', function(event) {
					$ctrl && $ctrl.$setViewValue(event.currentTarget.getValue());
				});
				$scope.$on('$destroy', function() {
					editor.destroy();
				})

			}
		};
	});