"use strict";

var path = require("path");
var file = require("./fileUtils");
var febs = require("febs");
var componentEnum = require('../src/componentEnum');

var components = [
  "libs",
  "button",
  ...componentEnum.ComponentName
];

function done(args, workDir) {
  workDir = workDir || process.cwd();
  var destDir = path.join(workDir, "src", "bpui", "style");

  console.log(destDir);

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
        console.log(stdout)
      } else {
        console.error(stdout)
        console.error(stderr)
      }

      if (!stderr && !stdout) {

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

          if (file.dirIsExist(p) && !file.dirIsExist(path.join(destDir, components[i]))) {
            let comm = components[i];
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

        file.fileCopy(path.join(__dirname, "_index.scss"), path.join(destDir, "_index.scss"));

        console.log("");
        console.log("");
        console.log("**************************************************************");
        console.log("> Success: Copy all components styles to `src/bpui/style`     ");
        console.log(">    import 'src/bpui/style'");
        console.log("**************************************************************");
        console.log("");
        console.log("> Can run './node_modules/bpui.js/bin/index.js init' to copy styles agent.");
        console.log("");
        console.log("");
      }
    }
  );
}

module.exports = {
  done: done
};
