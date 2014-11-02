'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('sass library generator', function () {
  beforeEach(function (done) {
    helpers.run(path.join( __dirname, '../app'))
      .inDir(path.join( __dirname, './tmp'))
      .withOptions({ 'skip-install': true })
      .withPrompt({ sache: true })
      .on('end', done);
  });

  it('should create sache.json', function () {
    helpers.assertFile('sache.json');
  });
});
