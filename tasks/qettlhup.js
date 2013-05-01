/*
 * grunt-qettlhup
 * https://github.com/theablefew/qettlhup
 *
 * Copyright (c) 2013 Kyle Knight
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  function spawn(src, task, i, callback) {
    var quD = grunt.util.spawn(task,
      function(error, result, code) {
        i++;
        if (error)
          callback(error);
        else
          callback(i);
    });

    quD.stdin.write(new Buffer(src));
    quD.stdin.end();
    quD.stdout.pipe(process.stdout);
    quD.stderr.pipe(process.stderr);
  }


  grunt.registerMultiTask('qettlhup', 'Test Browsers in Sauce Labs', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options();
    var browserArray = [];
    var qettlhup = this;

    // Iterate over all specified file groups.
    grunt.util.async.forEachSeries(this.files, function(f, next) {

      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        var source = grunt.file.readJSON(filepath);

        for(var os in source) {
          for(var browsers in source[os]) {
            for(var i=0, browser=source[os][browsers]; i<browser.length; i++) {
              var full = os + ' - ' + browsers + ' - ' + browser[i].short_version;
              var ident = (os + '' + browsers + '' + browser[i].short_version).toLowerCase().replace(/ /g, '');

              browserArray.push(ident);
            }
          }
        }

        return source;
      });

      var command = function(i) {
        return {
          cmd: options.test.lang,
          args: [options.test.path, browserArray[i]]
        };
      }

      var spawnReturn = function(i){
        if(typeof i === "number") {
          if(i < browserArray.length)
            spawn(src, command(i), i, spawnReturn);
          else
            grunt.log.ok('All Browser Tests Completed');
        } else {
          grunt.log.error(i);
        }
      }

      spawn(src, command(0), 0, spawnReturn)

    }, this.async());
  });

};
