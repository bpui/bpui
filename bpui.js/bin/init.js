'use strict';

var path = require('path');
var file = require('./fileUtils');

var components = [
  'libs',
  'button',
  'navbar-view',
  'checkbox',
  'radio',
  'switch',
  'input',
  'dialog',
  'picker',
  'actionsheet',
  'popover'
];


function done(args, workDir) {
  workDir = workDir||process.cwd();
  var destDir = path.join(workDir, 'src', 'bpui', 'var');

  console.log(destDir)

  for (var i = 0; i < components.length; i++) {
    var p = path.join(workDir, 'node_modules', 'bpui.js', 'node_modules', '@bpui', components[i], 'style', '_variable.scss');
    if (!file.fileIsExist(p)) {
      p = path.join(workDir, 'node_modules', '@bpui', components[i], 'style', '_variable.scss');
    } 

    if (file.fileIsExist(p)) {
      file.dirAssure(destDir);
      file.fileCopy(p, path.join(destDir, '_' + components[i] + '.scss'));
    } // if.
  }

  file.fileCopy(path.join(__dirname, '_index.scss'), path.join(destDir, '_index.scss'));

  console.log('');
  console.log('');
  console.log('Success: Copy all components _variable.scss to `src/bpui/var`');
  console.log(' import \'src/bpui/var\'');
  console.log('');
}


module.exports = {
  done: done,
};