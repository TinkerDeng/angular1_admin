'use strict';
angular.module('app').directive('upload',
    function (config, $timeout) {
        return {
            templateUrl: function (element, attr) {
                if ((attr.max && attr.max > 1) || attr.multiple != undefined) {
                    return 'app/directives/upload/multiple/multiple.html';
                } else {
                    return 'app/directives/upload/single/single.html';
                }
            },
            restrict: 'AE',
            replace: true,
            transclude: true,
            scope: {
                width: '@?',
                height: '@?',
                type: '@?',
                size: '@?',
                max: '@?',
                maxWidth: "=?",
                maxHeight: "=?"
            },
            require: '?ngModel',
            link: function ($scope, element, attr, ctrl) {
                /*
                 * 注：若出现拖动排序时错位问题，
                 * 注销掉bower_components/jquery-ui/jquery-ui.js
                 * po.top += this.scrollParent.scrollTop(); //16304行
                 *
                 * */

                //错误提示内容
                $scope.errorInfo = '';
                //图片数组
                $scope.imgs = [];
                //上传标识
                $scope.uploading = false;
                //当前上传进度
                $scope.uploadProgress = 0;
                //默认'jpg', 'png', 'jpeg'格式
                $scope.typeList = ($scope.type && $scope.type.split(',')) || ['JPG', 'PNG', 'JPEG', 'GIF'];
                //默认允许上传1张
                $scope.max = $scope.max || 1;
                //默认1M
                $scope.size = $scope.size || 1;
                //默认显示图片大小 X*100
                $scope.sizeStyle = {
                    width: (function () {
                        if ($scope.width && $scope.height) {
                            return ($scope.width * 100 / $scope.height).toFixed(0)
                        }
                        return 100;
                    })(),
                    height: 100,
                };

                ctrl && (ctrl.$render = function () {
                    if (ctrl.$viewValue) {
                        if (ctrl.$viewValue instanceof Array) {
                            $scope.imgs = ctrl.$viewValue;
                        } else if (ctrl.$viewValue.constructor == String) {
                            if (ctrl.$viewValue != "undefined") {
                                $scope.imgs = ctrl.$viewValue.split(',');
                            }
                        }
                    } else {
                        ctrl.$setViewValue('');
                    }
                });

                $scope.delImg = function ($index) {
                    $scope.imgs.splice($index, 1);
                    ctrl && ctrl.$setViewValue($scope.imgs.join(','));
                };

                var button = element.find('.uploadBtn')[0];

                button.id = button.id ? button.id : "qiniu_" + (Date.now()) + Math.round(Math.random() * 10000);

                var uploader = Qiniu.uploader({
                    runtimes: 'html5,flash,html4',
                    browse_button: button.id,
                    uptoken: config.qiniuToken,
                    unique_names: true,
                    domain: config.qiniuDomain,
                    max_file_size: '100mb',
                    flash_swf_url: 'plupload/Moxie.swf',
                    max_retries: 3,
                    dragdrop: false,
                    drop_element: 'container',
                    chunk_size: '4mb',
                    auto_start: true,
                    multi_selection: $scope.multi || false,
                    init: {
                        'FilesAdded': function (up, files) {
                            $timeout(function () {
                                $scope.errorInfo = '';
                            })

                            for (var i = 0; i < files.length; i++) {
                                var file = files[i],
                                    type = file.name.substring(file.name.lastIndexOf('.') + 1);
                                //判断图片类型
                                if ($scope.typeList && $scope.typeList.indexOf(type.toUpperCase()) == -1) {
                                    up.removeFile(file);
                                    $timeout(function () {
                                        $scope.errorInfo = '选择文件格式错误，请上传' + $scope.typeList.join(',') + '格式文件';
                                    })
                                    up.stop();
                                    return false;
                                }
                                //判断图片大小
                                var size = file.size / 1024 / 1024;
                                if (size > $scope.size) {
                                    up.removeFile(file);
                                    $timeout(function () {
                                        $scope.errorInfo = '您上传的大小为' + size.toFixed(2) + 'M，不符合要求';
                                    })
                                    return;
                                }
                            }
                        },
                        'BeforeUpload': function (up, file) {
                        },
                        'UploadProgress': function (up, file) {
                            $timeout(function () {
                                $scope.uploading = true;
                                $scope.uploadProgress = file.percent;
                            })
                        },
                        'FileUploaded': function (up, file, info) {
                            var info = JSON.parse(info);
                            $timeout(function () {
                                $scope.uploading = false;
                                $scope.uploadProgress = 0;
                                //判断图片尺寸
                                if ($scope.width && info.w != $scope.width) {
                                    $scope.errorInfo = '您上传的尺寸为' + info.w + '×' + info.h + '，不符合要求';
                                    return;
                                }
                                if ($scope.height && info.h != $scope.height) {
                                    $scope.errorInfo = '您上传的尺寸为' + info.w + '×' + info.h + '，不符合要求';
                                    return;
                                }
                                $scope.maxWidth = info.w;
                                $scope.maxHeight = info.h;
                                if ($scope.max === 1) {
                                    $scope.imgs = [config.qiniuDomain + info.key];
                                } else {
                                    $scope.imgs.push(config.qiniuDomain + info.key);
                                }
                                ctrl && ctrl.$setViewValue($scope.imgs.join(','));
                            })
                        },
                        'Error': function (up, err, errTip) {
                        },
                        'UploadComplete': function () {
                        },
                        'Key': function (up, file) {
                            var key = "";
                            return key
                        }
                    }
                });
            }
        };
    }
);