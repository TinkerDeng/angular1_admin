'use strict';

/*
 采用了贤心的layer组件，感觉挺好
 layer.open({
 title: '编辑内容',
 content: '修改后会影响相关试内容，你确定要修改吗？',
 btn: ['按钮一', '按钮二', '按钮三'],
 closeBtn: 0,
 skin: 'layer-my',
 yes: function (index, layero) {
 console.log(1);
 },
 cancel: function () {
 console.log(2);
 return false;
 },
 btn3: function (index, layero) {
 console.log(3);
 }
 });
 */


angular.module('app')
    .service('layerService', function ($q) {

        this.editQuestion = function () {
            return this.confirm('编辑内容', '修改后会影响相关试内容，你确定要修改吗？');
        };

        this.confirm = function (title, content, theme) {
            var defer = $q.defer();
            layer.open({
                title: title,
                content: content,
                btn: ['确定', '取消'],
                closeBtn: 0,
                skin: theme || 'red',
                yes: function (index, layero) {
                    layer.closeAll();
                    defer.resolve();
                },
                cancel: function () {
                    defer.reject();
                    //return false;
                }
            });
            return defer.promise;
        };

    });
