#!/usr/bin/env node

'use strict';

var path = require('path');
var init = require('./init');

var commands = {
  'init': [init, 'Copy the components style variable file'],
}

/**
 * Parses the command line and runs a command of the CLI.
 */
function run() {
  var args = process.argv.slice(2);
  if (args.length === 0) {
    printUsage();
  }

  var command = commands[args[0]];
  if (!command) {
    console.error('Command `%s` unrecognized', args[0]);
    printUsage();
    return;
  }

  command[0].done(args);
}

function printUsage() {
  console.log([
    'Usage: bpui <command>',
    '',
    'Commands:'
  ].concat(Object.keys(commands).map(function(name) {
    return '  - ' + name + ': ' + commands[name][1];
  })).join('\n'));
  process.exit(1);
}

if (require.main === module) {
  run();
}

module.exports = {
  run: run,
};
