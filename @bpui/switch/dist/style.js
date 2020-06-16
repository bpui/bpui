/*!
 * bpui switch v0.1.8
 * Copyright (c) 2020 Copyright bpoint.lee@live.com All Rights Reserved.
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.bpSwitch = factory());
}(this, (function () { 'use strict';

	var unpkg = "@import \"../node_modules/@bpui/libs/dist/style.scss\";\n@import \"./variable\";\n@import \"./switch\";\n";

	return unpkg;

})));
//# sourceMappingURL=style.js.map
