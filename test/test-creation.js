'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('sass library generator', function () {
  beforeEach(function (done) {
    helpers.run(path.join( __dirname, '../app'))
      .inDir(path.join( __dirname, './tmp'))
      .withOptions({ 'skip-install': true })
      .withPrompts({ sache: false, sassdoc: false })
      .on('end', done);
  });

  it('creates expected default files', function () {
    var expected = [
      '.gitignore',
      '.editorconfig',
      'package.json',
      'bower.json',
      'readme.md',
      'license',

      '_main.scss'
    ];

    helpers.assertFiles(expected);

    helpers.assertNoFile('sache.json');
    helpers.assertNoFile('docs/index.html');
  });
});
