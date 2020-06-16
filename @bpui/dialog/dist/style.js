/*!
 * bpui dialog v0.1.18
 * Copyright (c) 2020 Copyright bpoint.lee@live.com All Rights Reserved.
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.bpDialog = factory());
}(this, (function () { 'use strict';

	var unpkg = "@import \"../node_modules/@bpui/libs/style/index\";\n@import '../node_modules/@bpui/libs/style/unpkg_class.scss';\n\n@import \"./variable\";\n@import \"./mask\";\n@import \"./dialog\";\n@import \"./loading\";\n@import \"./toast\";";

	return unpkg;

})));
//# sourceMappingURL=style.js.map
