'use strict';

var path = require('path');
var shell = require('shelljs');
var yeoman = require('yeoman-generator');

var SassLibraryGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');

    this.name = this.user.git.name();
    this.email = this.user.git.email();

    this.website = shell.exec('git config --get user.website', { silent: true }).output.trim();

    this.user.github.username(function(err, username){
      this.githubUsername = username;
    }.bind(this));
  },

  prompting: {
    askForName: function() {
      var done = this.async();

      var prompts = [{
        name: 'libraryName',
        message: 'What is the name of your Sass library?',
        default: path.basename(process.cwd())
      }, {
        name: 'description',
        message: 'Please provide a short description for the project'
      }];

      this.prompt(prompts, function(props) {
        this.libraryName = props.libraryName;
        this.description = props.description;

        done();
      }.bind(this));
    }
  },

  writing: {
    before: function() {
      if(!this.website){
        this.website = this.githubUsername ? 'https://github.com/' + this.githubUsername : 'https://github.com/';
        this.log('\n\nCouldn\'t find your website in git config under \'user.website\'');
        this.log('Defaulting to Github url: ' + this.website);
      }
    },

    projectfiles: function () {
      this.template('readme.md', 'readme.md');

      this.template('license', 'license');

      this.template('editorconfig', '.editorconfig');
      this.template('gitignore', '.gitignore');
      // this.template('travis.yml', '.travis.yml');
      // this.template('_package.json', 'package.json');
    }
  },

  end: function () {
    this.installDependencies({
      npm: false
    });
  }
});

module.exports = SassLibraryGenerator;
