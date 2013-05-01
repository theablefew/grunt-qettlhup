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
    var browserArray,
        command,
        spawnReturn,
        loadArray,
        qettlhup = this.data,
        json = qettlhup.json;

    command = function(i) {
      return {
        cmd: qettlhup.test.lang,
        args: [qettlhup.test.path, browserArray[i]]
      };
    };

    spawnReturn = function(i){
      console.log(i);
      console.log(browserArray.length);
      if(typeof i === "number") {
        if(i < browserArray.length)
          spawn(src, command(i), i, spawnReturn);
        else
          grunt.log.ok('All Browser Tests Completed');
      } else {
        grunt.log.error(i);
      }
    };

    loadArray = function(source) {
      var array=[];
      for(var os in source) {
        for(var browsers in source[os]) {
          for(var i=0, browser=source[os][browsers]; i<browser.length; i++) {
            var full = os + ' - ' + browsers + ' - ' + browser[i].short_version;
            var ident = (os + '' + browsers + '' + browser[i].short_version).toLowerCase().replace(/ /g, '');

            array.push(ident);
          }
        }
      }
      return array;
    }

    if (!grunt.file.exists(json)) {
      grunt.log.error('Source file "' + json + '" not found.');
    } else {
      var src = grunt.file.readJSON(json)
      browserArray = loadArray(src);
      spawn(src, command(0), 0, spawnReturn);
    }

    this.async();

  });

};
