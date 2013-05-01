# grunt-qettlhup

> An easy way to run automated browser tests in Sauce Labs from a JSON object

## Getting Started
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
  options: {
    username: '',
    access_key: '',
    test: {
      lang: '',
      path: ''
    }
  },
  files: ''
}
```

You can download the JSON template with all currently available [Sauce Labs Browsers](https://github.com/idpro/SauceLabsBrowserList)  
_qettlhup is expecting the JSON format to follow this nesting & naming_

### Options

#### options.username
Type: `String`  
Default value: `''`

The username for your Sauce Labs account

#### options.punctuation
Type: `String`  
Default value: `''`

The provided access code to your Sauce Labs account

#### options.test.lang
Type: `String`  
Default value: `''`

The processor for your Selenium tests

#### options.test.path
Type: `String`  
Default value: `''`

The path to your main test file

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
qettlhup: {
  options: {
    username: 'qettlhup',
    access_key: '123-abc-098-zyx',
    test: {
      lang: 'ruby',
      path: 'spec/tests.rb'
    }
  },
  files: 'spec/assets/BrowserList.json'
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## TODO
 * Add proper tests
 * Add ability to run different JSON files against different tests

## Release History
 * __2013/04/30__ - _0.1.0_ - Initial functional release 
