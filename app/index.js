'use strict';

var util = require('util');
var path = require('path');
var shell = require('shelljs');
var yeoman = require('yeoman-generator');
var sassdoc = require('sassdoc');

var SassLibraryGenerator = module.exports = function SassLibraryGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install'],
      bower: false
    });
  });

  this.pkg = require('../package.json');

  this.name = this.user.git.name;
  this.email = this.user.git.email;

  this.website = shell.exec('git config --get user.website', { silent: true }).output.trim();

  this.githubUsername = void 0;
  this.user.github.username(function(err, username){
    this.githubUsername = username;
  }.bind(this));
};

util.inherits(SassLibraryGenerator, yeoman.generators.Base);

SassLibraryGenerator.prototype.prompting = function prompting() {
  var done = this.async();

  var prompts = [{
    name: 'github',
    message: 'What is your GitHub username?',
    when: function(){
      return this.githubUsername;
    }
  }, {
    name: 'libraryName',
    message: 'What is the name of your Sass library?',
    default: path.basename(process.cwd())
  }, {
    name: 'description',
    message: 'Please provide a short description for the project'
  }, {
    name: 'keywords',
    message: 'Please add some keywords',
    filter: function(input){
      return input.split(' ');
    }
  }, {
    name: 'sache',
    message: 'Do you want to add this library to Sache (http://www.sache.in/)?',
    type: 'confirm',
    default: true
  }, {
    name: 'sassdoc',
    message: 'Do you want to add SassDoc (http://sassdoc.com/annotations)?',
    type: 'confirm',
    default: true
  }];

  this.prompt(prompts, function(props) {
    this.githubUsername = props.github || this.githubUsername;

    this.libraryName = props.libraryName;
    this.description = props.description;

    this.sache = props.sache;
    this.keywords = JSON.stringify(props.keywords);

    this.sassdoc = props.sassdoc;

    done();
  }.bind(this));
};

SassLibraryGenerator.prototype.info = function info(){
  if(this.sache){
    this.log('\nInitial sache.json file will be created, please manually submit it at: http://www.sache.in/');
  }

  if(this.sassdoc){
    this.log('\nInitial SassDoc index.html is generated at ./docs/');
    this.log('To generate new docs simply run `npm run sassdoc`\n');
  }

  if(!this.website){
    this.website = this.githubUsername ? 'https://github.com/' + this.githubUsername : 'https://github.com/';
    this.log('\n\nCouldn\'t find your website in git config under \'user.website\'');
    this.log('Defaulting to Github url: ' + this.website);
  }
};

SassLibraryGenerator.prototype.dotfiles = function dotfiles(){
  this.template('readme.md', 'readme.md');
  this.template('license', 'license');

  this.template('editorconfig', '.editorconfig');
  this.template('gitignore', '.gitignore');

  this.template('_bower.json', 'bower.json');
  if(this.sache) {
    this.template('_sache.json', 'sache.json');
  }

  this.template('_package.json', 'package.json');
  // this.template('travis.yml', '.travis.yml');
};

SassLibraryGenerator.prototype.app = function app(){
  this.template('_main.scss', '_main.scss');
};

SassLibraryGenerator.prototype.documentation = function documentation(){
  if(this.sassdoc){
    var dir = this.destinationRoot();
    sassdoc.documentize(dir, path.join(dir, '/docs/'), {'no-prompt': true});
  }
};
