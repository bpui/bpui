"use strict";

var path = require("path");
var file = require("./fileUtils");
var fs = require('fs');
var febs = require("febs");
var componentEnum = require('../src/componentEnum');

var components = [
  "libs",
  "button"
];

for (const key in componentEnum.ComponentName) {
  if ('navbarView' == componentEnum.ComponentName[key]) {
    components.push('navbar-view');
  }
  else {
    components.push(componentEnum.ComponentName[key]);
  }
}

function done(args, workDir) {
  workDir = workDir || process.cwd();
  var destDir = path.join(workDir, "src", "bpui", "style");

  console.log('Will copy style to :\'' + destDir + '\'');

  var components2 = components.concat();
  for (var i = 0; i < components2.length; i++) {
    components2[i] = '@bpui/' + components2[i] + '@latest';
  }
  
  febs.utils.execCommand("npm", [
    "i",
    ...components2,
    '--save'
    ],
    { cwd: workDir },
    (err, stdout, stderr) => {
      if (!err) {
        stdout && console.log(stdout)
      } else {
        console.error(stdout)
        console.error(stderr)
      }

      if (!stderr && !stdout) {

        var vers = [];
        for (var i = 0; i < components.length; i++) {
          var p = path.join(
            workDir,
            "node_modules",
            "bpui.js",
            "node_modules",
            "@bpui",
            components[i],
            "style"
          );
          if (!file.dirIsExist(p)) {
            p = path.join(workDir, "node_modules", "@bpui", components[i], "style");
          }

          var comm_pkg = require(path.join(workDir, "node_modules", "@bpui", components[i], "package.json"));
          vers.push(comm_pkg.version);

          console.log(`  copy ${components[i] + '@' + comm_pkg.version} style`);

          if (file.dirIsExist(p) && !file.dirIsExist(path.join(destDir, components[i] + '@' + comm_pkg.version))) {
            let comm = components[i] + '@' + comm_pkg.version;
            file.dirCopy(p, path.join(destDir, comm), function () {
              if (file.fileIsExist(path.join(destDir, comm, "unpkg.scss"))) {
                file.fileRemove(path.join(destDir, comm, "unpkg.scss"));
              }
              if (file.fileIsExist(path.join(destDir, comm, "unpkg_class.scss"))) {
                file.fileRemove(path.join(destDir, comm, "unpkg_class.scss"));
              }
            });
          } // if.
        }

        var fcontent = fs.readFileSync(path.join(__dirname, "_index.scss"), { 'encoding': 'utf-8' });
        for (var i = 0; i < components.length; i++) {
          fcontent = febs.string.replace(fcontent, './' + components[i], './' + components[i] + '@' + vers[i]);
        }
        fs.writeFileSync(path.join(destDir, "_index.scss"), fcontent, { flag: 'w', encoding: 'utf8' });

        console.log("");
        console.log("");
        console.log("**************************************************************");
        console.log("> Success: Copy all components styles to `src/bpui/style`     ");
        console.log(">    import 'src/bpui/style'");
        console.log("**************************************************************");
        console.log("");
        console.log("> Can run './node_modules/bpui.js/bin/index.js init' to copy styles again.");
        console.log("");
        console.log("");
      }
    }
  );
}

module.exports = {
  done: done
};
