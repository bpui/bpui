/*!
 * bpui libs v0.2.8
 * Copyright (c) 2020 Copyright bpoint.lee@live.com All Rights Reserved.
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.bpLibs = factory());
}(this, (function () { 'use strict';

	var unpkg = "\n\n@import \"./variable\";\n@import \"./border\";\n@import \"./device\";\n@import \"./text\";\n@import \"./unpkg_class.scss\";";

	return unpkg;

})));
//# sourceMappingURL=style.js.map
