'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('sass library generator', function () {
  beforeEach(function (done) {
    helpers.run(path.join( __dirname, '../app'))
      .inDir(path.join( __dirname, './tmp'))  // Clear the directory and set it as the CWD
      .withOptions({ 'skip-install': true })            // Mock options passed in
      .withPrompt({ sassdoc: false })          // Mock the prompt answers
      .on('end', done);
  });

  it('shouldn\'t run SassDoc on directory', function () {
    helpers.assertNoFile('docs/index.html');
  });
});
