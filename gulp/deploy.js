'use strict';

var gulp = require('gulp');
var config = require('../config.json');
var $ = require('gulp-load-plugins')();
var gulpSSH = new $.ssh({
	ignoreErrors: false,
	sshConfig: config.ssh
});


gulp.task('upload', function () {
	return gulp
		.src('./dist/**')
		.pipe(gulpSSH.dest(config.ssh.remotePath))
});



gulp.task('deploy', function (cb) {
	$.sequence('build', 'upload')(cb);
});
