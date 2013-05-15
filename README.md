# grunt-qettlhup

> An easy way to run automated browser tests in Sauce Labs from a JSON object

## What does 'qettlhup' mean?

qettlhup is [Klingon](http://klingonska.org/dict/?q=sauce) for "Sauce".

## Getting Started
This really isn't for the faint of heart, but if you're needing to test 20-30 browsers at a time and don't want to manually pass in each one indivdually, after a bit of setup, this will make those tests a breeze!

This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-qettlhup --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-qettlhup');
```

## The "qettlhup" task

### Overview
In your project's Gruntfile, add a section named `qettlhup` to the data object passed into `grunt.initConfig()`.

```js
qettlhup: {
  dist: {
    test: {
      lang: '',
      path: ''
    },
    json: ''
  }
}
```

You can download the JSON template with all currently available [Sauce Labs Browsers](https://github.com/idpro/SauceLabsBrowserList)  
_qettlhup is expecting the JSON format to follow this nesting & naming_

### Options

#### test.lang
Type: `String`  
Default value: `''`

The processor for your Selenium tests

#### test.path
Type: `String`  
Default value: `''`

The path to your main test file

### Usage Examples

#### Default Options
This will pass a codename of each browser to your test. In your test, you can grab that argument variable in order to link to the proper OS and browser. You can find an example of how I handled this in Ruby in the examples directory. I'm sure the same concept is repeatable in other languages using Selenium. 

You can also pass multiple objects to qettlhup for different tests, different JSON files, whatever.

```js
qettlhup: {
  modern: {
    test: {
      lang: 'ruby',
      path: 'examples/tests.rb'
    },
    json: 'test/fixtures/browsers-modern.json'
  },
  all: {
    test: {
      lang: 'ruby',
      path: 'examples/tests.rb'
    },
    json: 'test/fixtures/browsers.json'
  }
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## TODO
 * Add proper tests

## Release History
 * __2013/05/01__ - _0.2.0_ - Adding support for multiple JSON files, rebuilding code architecture, adding example test script 
 * __2013/04/30__ - _0.1.0_ - Initial functional release 

----
The Able Few - [St. Louis NodeJS & Ruby on Rails development](http://theablefew.com/?utm_source=GitHub&utm_medium=link&utm_campaign=qettlhup)
