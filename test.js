'use strict';

const {join} = require('path');

const test = require('tape');
const vfileGlob = require('.');
const vfile = require('vfile');

test('readGlob()', async t => {
	await vfileGlob('.*itignore').forEach(file => {
		t.ok(file instanceof vfile, 'should emit VFile instances.');

		t.equal(
			file.cwd,
			process.cwd(),
			'should set `cwd` property to the results.'
		);

		t.equal(
			file.path,
			'.gitignore',
			'should set `path` property to the results.'
		);

		t.ok(
			file.contents.equals(Buffer.from('.nyc_output\ncoverage\nnode_modules\n')),
			'should set `contents` property to the results.'
		);

		t.deepEqual(
			file.data,
			{},
			'should set no data to the results by default.'
		);
	});

	await vfileGlob('../test.j*', {
		absolute: true,
		cwd: join(__dirname, 'node_modules'),
		encoding: 'base64',
		stat: true
	}).forEach(({cwd, contents, path, data}) => {
		t.equal(
			cwd,
			join(__dirname, 'node_modules'),
			'should support glob options.'
		);

		t.equal(
			path,
			__filename.replace(/\\/g, '/'),
			'should reflect glob option settings to the result.'
		);

		t.ok(
			contents.startsWith(Buffer.from('\'use strict\'').toString('base64')),
			'should support fs.readFile options.'
		);

		t.ok(
			data.stat.isFile(),
			'should set `stat` property to the `data` when `stat` option is enabled.'
		);
	});

	t.end();
});
