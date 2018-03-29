'use strict';

const readGlob = require('read-glob');
const vfile = require('vfile');

function globResultToVfile({contents, cwd, path, stat}) {
	return vfile({
		contents,
		cwd,
		path,
		data: stat ? {stat} : {}
	});
}

module.exports = function vfileGlob(...args) {
	return readGlob(...args).map(globResultToVfile);
};
