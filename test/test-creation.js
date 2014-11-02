'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('sass library generator', function () {
  beforeEach(function (done) {
    helpers.run(path.join( __dirname, '../app'))
      .inDir(path.join( __dirname, './tmp'))  // Clear the directory and set it as the CWD
      .withOptions({ 'skip-install': true })            // Mock options passed in
      .withPrompt({ })          // Mock the prompt answers
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
      'sache.json',
      'docs/index.html',

      '_main.scss'
    ];

    helpers.assertFiles(expected);
  });
});
