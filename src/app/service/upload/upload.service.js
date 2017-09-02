'use strict';

var EventDispatcher = function () {
	this.handlers = {};
};
EventDispatcher.prototype.addEventListener = function (type, handler) {
	if (typeof this.handlers[type] == 'undefined') {
		this.handlers[type] = [];
	}
	this.handlers[type].push(handler);
};
EventDispatcher.prototype.dispatchEvent = function (event) {
	if (!event.target) {
		event.target = this;
	}
	if (this.handlers[event.type] instanceof Array) {
		var handlers = this.handlers[event.type];
		for (var i = 0; i < handlers.length; i++) {
			handlers[i](event);
		}
	}
};
EventDispatcher.prototype.removeEventListener = function () {
	if (this.handlers[type] instanceof Array) {
		var handlers = this.handlers[type];
		for (var i = 0; i < handlers.length; i++) {
			if (handlers[i] === handler) {
				break;
			}
		}
		handlers.splice(i, 1);
	}
};

angular.module('app').service('uploadService',
	function (uiUploader, config) {
		var api = config.apiHost + '/public/file/upload';

		var Uploader = function (element) {
			EventDispatcher.call(this);
			this.element = element;
			this.inputId = element.id ? element.id : "upload_" + (Date.now()) + Math.round(Math.random() * 10000);
			this.initDom();
			this.initEvent();
		};
		Uploader.prototype = new EventDispatcher();
		Uploader.prototype.initDom = function () {
			var uploadBtn = '<div ' +
				'style="position:absolute;z-index: 0;overflow: hidden;width: ' + this.element.outerWidth() +
				'px;height: ' + this.element.outerHeight() +
				'px;top: ' + this.element.position().top +
				'px;left: ' + this.element.position().left + 'px">' +
				'<input id="' + this.inputId + '" type="file" style="font-size: 999px;opacity: 0;position: absolute;top: 0;left: 0;width: 100%;height: 100%;"/>' +
				'</div>';
			this.element.after(uploadBtn);
		};
		Uploader.prototype.initEvent = function () {
			var self = this;
			var inputFile = $('#' + this.inputId);
			this.element.on('click', function () {
				inputFile.click();
			});
			inputFile.on('change', function (ev) {
				var files = ev.target.files;
				uiUploader.addFiles(files);
				self.dispatchEvent({
					type: 'fileAdded',
					data: {
						files: files
					}
				});
			});
		};
		Uploader.prototype.remove = function () {
			uiUploader.removeAll();
		};
		Uploader.prototype.upload = function () {
			var self = this;
			uiUploader.startUpload({
				url: api + '?name=' + uiUploader.files[0].name,
				concurrency: 2,
				onProgress: function (file) {
					var percent = (file.loaded / file.size).toFixed(2);
					if (percent > 1) {
						percent = 1
					}
					self.dispatchEvent({
						type: 'progress',
						data: {
							percent: percent
						}
					});
				},
				onCompleted: function (file, response) {
					response = JSON.parse(response);
					uiUploader.removeAll();
					self.dispatchEvent({
						type: 'fileUploaded',
						data: {
							filename: response.result,
							width: response.supplement[0],
							height: response.supplement[1]
						}
					});
				}
			});
		};


		//对外暴露Uploader
		this.Uploader = Uploader;
	}
);



