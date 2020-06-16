const febs = require('febs');
const path = require('path');

var libs = febs.file.dirExplorer('@bpui').dirs;

function installPkg(index) {
  if (index < libs.length) {
    const element = libs[index];
    let cwd = path.join(__dirname, '..', '@bpui', element);

    console.log(element);
    febs.utils.execCommand((process.platform === "win32" ? "npm.cmd" : "npm"), ['i'], {cwd})
      .then(res=>{
        console.log(res.stdout);
        if (index == libs.length-1) {
          console.log('bpui.js');
          febs.utils.execCommand((process.platform === "win32" ? "npm.cmd" : "npm"), ['i'], {cwd:path.join(__dirname, '..', 'bpui.js')})
          .then(res=>{
            console.log('finish')
          });
        }
        else {
          installPkg(index+1);
        }
      })
      .catch(e=>{
        console.error(e);
      })
  }
}

installPkg(0);