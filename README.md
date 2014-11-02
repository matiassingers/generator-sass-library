# generator-sass-library [![Build Status](http://img.shields.io/travis/matiassingers/generator-sass-library.svg?style=flat-square)](https://travis-ci.org/matiassingers/generator-sass-library) [![Dependency Status](http://img.shields.io/gemnasium/matiassingers/generator-sass-library.svg?style=flat-square)](https://gemnasium.com/matiassingers/generator-sass-library) [![Gitter](http://img.shields.io/badge/gitter-join%20chat%20%E2%86%92-brightgreen.svg?style=flat-square)](https://gitter.im/matiassingers/generator-sass-library?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
> start a simple Sass library

## Features

- [Sache](http://sache.in/)
   - Creates initial sache.json file
- [SassDoc](http://sassdoc.com/)
   - Create handy script in package.json, so you can simply run `npm run sassdoc` to update docs

## Install

```sh
$ npm install --global generator-sass-library
```


## Usage

```sh
$ yo sass-library
[?] What is the name of your Sass library? hello-world
[?] Please provide a short description for the project: says hello to the entire world
[?] Please add some keywords: greeting message nice
[?] Do you want to add this library to Sache (http://www.sache.in/)? Yes
[?] Do you want to add SassDoc (http://sassdoc.com/annotations)? Yes

Initial sache.json file will be created, please manually submit it at: http://www.sache.in/

Initial SassDoc index.html is generated at ./docs/
To generate new docs simply run `npm run sassdoc`

   create _main.scss
   create readme.md
   create license
   create .editorconfig
   create .gitignore
   create bower.json
   create sache.json
   create package.json
```

## todo
- tests


## License

MIT © [Matias Singers](http://mts.io)
