# vfile-glob

[![npm version](https://img.shields.io/npm/v/vfile-glob.svg)](https://www.npmjs.com/package/vfile-glob)
[![Build Status](https://travis-ci.org/shinnn/vfile-glob.svg?branch=master)](https://travis-ci.org/shinnn/vfile-glob)
[![Build status](https://ci.appveyor.com/api/projects/status/8jwxugh978gw12it/branch/master?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/vfile-glob/branch/master)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/vfile-glob.svg)](https://coveralls.io/github/shinnn/vfile-glob)

Search files with [glob](https://github.com/isaacs/node-glob#glob-primer) pattern and create [VFile](https://github.com/vfile/vfile) objects from them

```javascript
const vfileGlob = require('vfile-glob');

vfileGlob('index.*').subscribe({
  start() {
    console.log('Glob started.');
  },
  next(file) {
    file;
    /*=> VFile {
      data: {},
      messages: [],
      history: ['index.js'],
      cwd: '/Users/shinnn/github/vfile-glob',
      contents: <Buffer ... >
    } */
  },
  complete() {
    console.log('Glob completed.');
  }
});
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install vfile-glob
```

## API

```javascript
const vfileGlob = require('vfile-glob');
```

### vfileGlob(*pattern* [, *options*])

*pattern*: `string` (glob pattern)  
*options*: `Object` ([`read-glob`](https://github.com/shinnn/node-read-glob) options) or `string` (encoding)  
Return: [`Observable`](https://github.com/tc39/proposal-observable#observable) ([zenparsing's implementation](https://github.com/zenparsing/zen-observable))

When the `Observable` is [subscribe](https://tc39.github.io/proposal-observable/#observable-prototype-subscribe)d, it starts searching files matching the given glob pattern, create [`VFile`](https://github.com/vfile/vfile#vfileoptions)s from matched files and successively sends them to its [`Observer`](https://github.com/tc39/proposal-observable#observer).

```javascript
vfileGlob('hi.txt').subscribe(file => {
  file.cwd; //=> '/Users/example'
  file.path; //=> 'hi.txt',
  file.contents; //=> <Buffer 48 69>
});

vfileGlob('exmaple/hi.txt', {
  cwd: '..',
  encoding: 'utf8'
}).subscribe(file => {
  file.cwd; //=> '/Users'
  file.path; //=> 'example/hi.txt'
  file.contents; //=> 'Hi'
});
```

## License

[ISC License](./LICENSE) © 2018 Shinnosuke Watanabe
