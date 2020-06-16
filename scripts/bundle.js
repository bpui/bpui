const path = require('path');
const fs = require('fs');
const febs = require('febs');
const rollup = require('rollup');

const rollupTypescript = require('@rollup/plugin-typescript');
const rollupTypescript2 = require('rollup-plugin-typescript2');
const rollupResolve = require('@rollup/plugin-node-resolve');
const rollupCommonjs = require('@rollup/plugin-commonjs');
// const rollupMinify = require('rollup-plugin-babel-minify');
const rollupMinify = require('rollup-plugin-terser');
const rollupVue = require('rollup-plugin-vue');
const rollupSass = require('rollup-plugin-sass');
const rollupSassBundle = require('rollup-plugin-bundle-scss');
const rollupBabel = require('rollup-plugin-babel');
const version = require(process.cwd()+'/package.json').version;

var cwd = process.cwd();
cwd = cwd.split(path.sep);
cwd = cwd[cwd.length-1];

let external = [
      'febs-browser',
      'febs',
      'vue',
      'vue-property-decorator',
      'vuex-class',
      '@bpui/libs',
      '@bpui/checkbox',
      '@bpui/dialog',
      '@bpui/input',
      '@bpui/navbar-view',
      '@bpui/picker',
      '@bpui/radio',
      '@bpui/select',
      '@bpui/switch',
      '@bpui/actionsheet',
      '@bpui/popover',
      '@types/hammerjs',
    ]
let globals = {
  'febs-browser': "febs",
  'febs': "febs",
  'vue': 'Vue',
  'vue-property-decorator': 'VuePropertyDecorator',
  'vuex-class': 'VuexClass',
  '@bpui/libs': 'bpLibs',
  '@bpui/checkbox': 'bpCheckbox',
  '@bpui/dialog': 'bpDialog',
  '@bpui/input': 'bpInput',
  '@bpui/navbar-view': 'bpNavbarView',
  '@bpui/picker': 'bpPicker',
  '@bpui/radio': 'bpRadio',
  '@bpui/select': 'bpSelect',
  '@bpui/switch': 'bpSwitch',
  '@bpui/actionsheet': 'bpActionsheet',
  '@bpui/popover': 'bpPopover',
}

const banner =(name)=>
  '/*!\n' +
  ` * bpui ${name} v${version}\n` +
  ` * Copyright (c) ${new Date().getFullYear()} Copyright bpoint.lee@live.com All Rights Reserved.\n` +
  ' * Released under the MIT License.\n' +
  ' */\n'

function build(pkg) {

  if (['style', 'navbar-view'].indexOf(pkg) >= 0)
    return new Promise((resolve, reject)=>resolve());

  let libName = getLibName(pkg);
  let inputMain = getInputMain(pkg);
  
  let babelPlugin = rollupBabel({
            babelrc: false,
            // exclude: /node_modules\/.*/,
            extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
            exclude: /node_modules\/core-js.*/,
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  spec: true,
                  forceAllTransforms: true,
                  targets: {
                    "chrome": "50",
                    "ie": "10",
                    "firefox": "40",
                    "safari": "11",
                  },
                  corejs: 3,
                  useBuiltIns: 'usage'
                }
              ]
            ]
        });

  let plugins = [
        rollupResolve({
          extensions: ['.vue', '.js', '.ts', '.scss', '.css'],
          preferBuiltins: false,
          browser: true,
        }),
        rollupCommonjs({
        }),
        rollupVue({
          // defaultLang: 'ts',
        }),
      ];

  if (febs.file.fileIsExist(path.join(__dirname, '..', `@bpui/${pkg}/tsconfig.json`))) {
    plugins.splice(1, 0, rollupTypescript2({
          tsconfig: path.join(__dirname, '..', `@bpui/${pkg}/tsconfig.json`),
        }));
  }

  let buildScss;
  if (febs.file.fileIsExist(path.join(__dirname, '..', `@bpui/${pkg}/style/unpkg.scss`))) {
    buildScss = ()=>rollup.rollup({
        input: path.join(__dirname, '..', `@bpui/${pkg}/style/unpkg.scss`),
        plugins: plugins.concat(
          rollupSassBundle(),
        ),
        external
      })
  }
  let buildCss;
  if (febs.file.fileIsExist(path.join(__dirname, '..', `@bpui/${pkg}/style/unpkg.scss`))) {
    buildCss = ()=>rollup.rollup({
        input: path.join(__dirname, '..', `@bpui/${pkg}/style/unpkg.scss`),
        plugins: plugins.concat(
          rollupSass({
            output: true
          }),
        ),
        external
      })
  }

  let build = ()=>rollup.rollup({
      input: inputMain,
      plugins: plugins.concat(
        babelPlugin
      ),
      external
    })
  
  let buildMin = ()=>rollup.rollup({
      input: inputMain,
      plugins: plugins.concat(
        rollupMinify.terser({
          sourcemap: false,
        }),
        babelPlugin,
      ),
      external
    })

  let bundleUmd = (bundle, min, style)=>{bundle.write({
        globals: globals,
        file: path.join(__dirname, '..', `@bpui/${pkg}/dist/${style?'style':'index'}.${min?'min.':''}js`),
        format: 'umd',
        name: libName,
        sourcemap: !min,
        banner: banner(pkg),
        comments: min?false:'all',
      });
      return bundle;
  }
  let bundleCjs = (bundle, min, style)=>{bundle.write({
        globals,
        file: path.join(__dirname, '..', `@bpui/${pkg}/dist/${style?'style':'index'}.common.${min?'min.':''}js`),
        format: 'cjs',
        name: libName,
        sourcemap: !min,
        banner: banner(pkg),
        comments: min?false:'all',
      });
      return bundle;
  }
  let bundleEsm = (bundle, min, style)=>{bundle.write({
        globals,
        file: path.join(__dirname, '..', `@bpui/${pkg}/dist/${style?'style':'index'}.esm.${min?'min.':''}js`),
        format: 'esm',
        name: libName,
        sourcemap: !min,
        banner: banner(pkg),
        comments: min?false:'all',
      });
      return bundle;
  }

  let p = [];
    
  if (buildScss) {
    p.push(buildScss().then(bundle => bundleUmd(bundle, false, true)));
  }
  if (buildCss) {
    p.push(buildCss().then(bundle => bundleUmd(bundle, false, true)));
  }

  if (febs.file.fileIsExist(inputMain)) {
    // umd minify
    p.push(buildMin().then(bundle => bundleUmd(bundle, true))
              .then(bundle => bundleCjs(bundle, true))
              .then(bundle => bundleEsm(bundle, true)));
    
    // umd (iife)
    p.push(build().then(bundle => bundleUmd(bundle, false))
            .then(bundle => bundleCjs(bundle, false))
            .then(bundle => bundleEsm(bundle, false)));
  }

  
  return Promise.all(
      p
    );
}

function getLibName(pkg) {
  let libName = pkg;
  let pos = 0;
  while (pos < libName.length) {
    if (pos != 0) {
      libName = libName.slice(0, pos) + libName.slice(pos+1, pos+2).toUpperCase() + libName.slice(pos+2);
    }
    pos = libName.indexOf('-');
    if (pos <= 0) {
      break;
    }
  }

  libName = libName.substr(0, 1).toUpperCase() + libName.substr(1);
  libName = 'bp' + libName;
  console.log(libName);

  return libName;
}

function getInputMain(pkg) {
  if (!fs.existsSync(path.join(__dirname, '..', `@bpui/${pkg}/dist`))) {
    fs.mkdirSync(path.join(__dirname, '..', `@bpui/${pkg}/dist`))
  }

  let inputMain = path.join(__dirname, '..', `@bpui/${pkg}/src/index.ts`);
  if (!febs.file.fileIsExist(inputMain)) {
    inputMain = path.join(__dirname, '..', `@bpui/${pkg}/src/index.js`);
  }
  return inputMain;
}

build(cwd).then(res=>{}).catch(e=>{console.error(e)})