(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 146);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = __webpack_require__(12);

/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _option = __webpack_require__(35);

var _option2 = _interopRequireDefault(_option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_option2.default.install = function (Vue) {
  Vue.component(_option2.default.name, _option2.default);
};

exports.default = _option2.default;

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = __webpack_require__(13);

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_option_vue__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_option_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_option_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5ed77bae_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_option_vue__ = __webpack_require__(37);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_option_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5ed77bae_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_option_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _emitter = __webpack_require__(1);

var _emitter2 = _interopRequireDefault(_emitter);

var _util = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_emitter2.default],

  name: 'ElOption',

  componentName: 'ElOption',

  inject: ['select'],

  props: {
    value: {
      required: true
    },
    label: [String, Number],
    created: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data: function data() {
    return {
      index: -1,
      groupDisabled: false,
      visible: true,
      hitState: false,
      hover: false
    };
  },


  computed: {
    isObject: function isObject() {
      return Object.prototype.toString.call(this.value).toLowerCase() === '[object object]';
    },
    currentLabel: function currentLabel() {
      return this.label || (this.isObject ? '' : this.value);
    },
    currentValue: function currentValue() {
      return this.value || this.label || '';
    },
    itemSelected: function itemSelected() {
      if (!this.select.multiple) {
        return this.isEqual(this.value, this.select.value);
      } else {
        return this.contains(this.select.value, this.value);
      }
    },
    limitReached: function limitReached() {
      if (this.select.multiple) {
        return !this.itemSelected && (this.select.value || []).length >= this.select.multipleLimit && this.select.multipleLimit > 0;
      } else {
        return false;
      }
    }
  },

  watch: {
    currentLabel: function currentLabel() {
      if (!this.created && !this.select.remote) this.dispatch('ElSelect', 'setSelected');
    },
    value: function value() {
      if (!this.created && !this.select.remote) this.dispatch('ElSelect', 'setSelected');
    }
  },

  methods: {
    isEqual: function isEqual(a, b) {
      if (!this.isObject) {
        return a === b;
      } else {
        var valueKey = this.select.valueKey;
        return (0, _util.getValueByPath)(a, valueKey) === (0, _util.getValueByPath)(b, valueKey);
      }
    },
    contains: function contains() {
      var _this = this;

      var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var target = arguments[1];

      if (!this.isObject) {
        return arr.indexOf(target) > -1;
      } else {
        var _ret = function () {
          var valueKey = _this.select.valueKey;
          return {
            v: arr.some(function (item) {
              return (0, _util.getValueByPath)(item, valueKey) === (0, _util.getValueByPath)(target, valueKey);
            })
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    },
    handleGroupDisabled: function handleGroupDisabled(val) {
      this.groupDisabled = val;
    },
    hoverItem: function hoverItem() {
      if (!this.disabled && !this.groupDisabled) {
        this.select.hoverIndex = this.select.options.indexOf(this);
      }
    },
    selectOptionClick: function selectOptionClick() {
      if (this.disabled !== true && this.groupDisabled !== true) {
        this.dispatch('ElSelect', 'handleOptionClick', [this, true]);
      }
    },
    queryChange: function queryChange(query) {
      // query 里如果有正则中的特殊字符，需要先将这些字符转义
      var parsedQuery = String(query).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
      this.visible = new RegExp(parsedQuery, 'i').test(this.currentLabel) || this.created;
      if (!this.visible) {
        this.select.filteredOptionsCount--;
      }
    }
  },

  created: function created() {
    this.select.options.push(this);
    this.select.cachedOptions.push(this);
    this.select.optionsCount++;
    this.select.filteredOptionsCount++;

    this.$on('queryChange', this.queryChange);
    this.$on('handleGroupDisabled', this.handleGroupDisabled);
  },
  beforeDestroy: function beforeDestroy() {
    this.select.onOptionDestroy(this.select.options.indexOf(this));
  }
};

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],staticClass:"el-select-dropdown__item",class:{
    'selected': _vm.itemSelected,
    'is-disabled': _vm.disabled || _vm.groupDisabled || _vm.limitReached,
    'hover': _vm.hover
  },on:{"mouseenter":_vm.hoverItem,"click":function($event){$event.stopPropagation();_vm.selectOptionClick($event)}}},[_vm._t("default",[_c('span',[_vm._v(_vm._s(_vm.currentLabel))])])],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

/******/ });

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function _broadcast(componentName, eventName, params) {
  this.$children.forEach(function (child) {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
exports.default = {
  methods: {
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    }
  }
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.noop = noop;
exports.hasOwn = hasOwn;
exports.toObject = toObject;
exports.getPropByPath = getPropByPath;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function noop() {};

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};

function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
};

function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
};

var getValueByPath = exports.getValueByPath = function getValueByPath(object, prop) {
  prop = prop || '';
  var paths = prop.split('.');
  var current = object;
  var result = null;
  for (var i = 0, j = paths.length; i < j; i++) {
    var path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};

function getPropByPath(obj, path, strict) {
  var tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  var keyArr = path.split('.');
  var i = 0;
  for (var len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    var key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};

var generateId = exports.generateId = function generateId() {
  return Math.floor(Math.random() * 10000);
};

var valueEquals = exports.valueEquals = function valueEquals(a, b) {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (var i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 138);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = __webpack_require__(12);

/***/ }),

/***/ 10:
/***/ (function(module, exports) {

module.exports = __webpack_require__(17);

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

module.exports = __webpack_require__(24);

/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _select = __webpack_require__(139);

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_select2.default.install = function (Vue) {
  Vue.component(_select2.default.name, _select2.default);
};

exports.default = _select2.default;

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_select_vue__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_select_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_select_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ab76e696_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_select_vue__ = __webpack_require__(145);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_select_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ab76e696_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_select_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = __webpack_require__(28);

/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _emitter = __webpack_require__(1);

var _emitter2 = _interopRequireDefault(_emitter);

var _focus = __webpack_require__(19);

var _focus2 = _interopRequireDefault(_focus);

var _locale = __webpack_require__(5);

var _locale2 = _interopRequireDefault(_locale);

var _input = __webpack_require__(6);

var _input2 = _interopRequireDefault(_input);

var _selectDropdown = __webpack_require__(141);

var _selectDropdown2 = _interopRequireDefault(_selectDropdown);

var _option = __webpack_require__(35);

var _option2 = _interopRequireDefault(_option);

var _tag = __webpack_require__(25);

var _tag2 = _interopRequireDefault(_tag);

var _scrollbar = __webpack_require__(17);

var _scrollbar2 = _interopRequireDefault(_scrollbar);

var _debounce = __webpack_require__(14);

var _debounce2 = _interopRequireDefault(_debounce);

var _clickoutside = __webpack_require__(10);

var _clickoutside2 = _interopRequireDefault(_clickoutside);

var _dom = __webpack_require__(2);

var _resizeEvent = __webpack_require__(18);

var _locale3 = __webpack_require__(12);

var _scrollIntoView = __webpack_require__(26);

var _scrollIntoView2 = _interopRequireDefault(_scrollIntoView);

var _util = __webpack_require__(3);

var _navigationMixin = __webpack_require__(144);

var _navigationMixin2 = _interopRequireDefault(_navigationMixin);

var _shared = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sizeMap = {
  'medium': 36,
  'small': 32,
  'mini': 28
};

exports.default = {
  mixins: [_emitter2.default, _locale2.default, (0, _focus2.default)('reference'), _navigationMixin2.default],

  name: 'ElSelect',

  componentName: 'ElSelect',

  inject: {
    elForm: {
      default: ''
    },

    elFormItem: {
      default: ''
    }
  },

  provide: function provide() {
    return {
      'select': this
    };
  },


  computed: {
    _elFormItemSize: function _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    readonly: function readonly() {
      // trade-off for IE input readonly problem: https://github.com/ElemeFE/element/issues/10403
      var isIE = !this.$isServer && !isNaN(Number(document.documentMode));
      return !this.filterable || this.multiple || !isIE && !this.visible;
    },
    iconClass: function iconClass() {
      var criteria = this.clearable && !this.selectDisabled && this.inputHovering && !this.multiple && this.value !== undefined && this.value !== null && this.value !== '';
      return criteria ? 'circle-close is-show-close' : this.remote && this.filterable ? '' : 'arrow-up';
    },
    debounce: function debounce() {
      return this.remote ? 300 : 0;
    },
    emptyText: function emptyText() {
      if (this.loading) {
        return this.loadingText || this.t('el.select.loading');
      } else {
        if (this.remote && this.query === '' && this.options.length === 0) return false;
        if (this.filterable && this.query && this.options.length > 0 && this.filteredOptionsCount === 0) {
          return this.noMatchText || this.t('el.select.noMatch');
        }
        if (this.options.length === 0) {
          return this.noDataText || this.t('el.select.noData');
        }
      }
      return null;
    },
    showNewOption: function showNewOption() {
      var _this = this;

      var hasExistingOption = this.options.filter(function (option) {
        return !option.created;
      }).some(function (option) {
        return option.currentLabel === _this.query;
      });
      return this.filterable && this.allowCreate && this.query !== '' && !hasExistingOption;
    },
    selectSize: function selectSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    selectDisabled: function selectDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    collapseTagSize: function collapseTagSize() {
      return ['small', 'mini'].indexOf(this.selectSize) > -1 ? 'mini' : 'small';
    }
  },

  components: {
    ElInput: _input2.default,
    ElSelectMenu: _selectDropdown2.default,
    ElOption: _option2.default,
    ElTag: _tag2.default,
    ElScrollbar: _scrollbar2.default
  },

  directives: { Clickoutside: _clickoutside2.default },

  props: {
    name: String,
    id: String,
    value: {
      required: true
    },
    autoComplete: {
      type: String,
      default: 'off'
    },
    automaticDropdown: Boolean,
    size: String,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: String,
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: function _default() {
        return (0, _locale3.t)('el.select.placeholder');
      }
    },
    defaultFirstOption: Boolean,
    reserveKeyword: Boolean,
    valueKey: {
      type: String,
      default: 'value'
    },
    collapseTags: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    }
  },

  data: function data() {
    return {
      options: [],
      cachedOptions: [],
      createdLabel: null,
      createdSelected: false,
      selected: this.multiple ? [] : {},
      inputLength: 20,
      inputWidth: 0,
      cachedPlaceHolder: '',
      optionsCount: 0,
      filteredOptionsCount: 0,
      visible: false,
      softFocus: false,
      selectedLabel: '',
      hoverIndex: -1,
      query: '',
      previousQuery: null,
      inputHovering: false,
      currentPlaceholder: '',
      menuVisibleOnFocus: false,
      isOnComposition: false,
      isSilentBlur: false
    };
  },


  watch: {
    selectDisabled: function selectDisabled() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.resetInputHeight();
      });
    },
    placeholder: function placeholder(val) {
      this.cachedPlaceHolder = this.currentPlaceholder = val;
    },
    value: function value(val) {
      if (this.multiple) {
        this.resetInputHeight();
        if (val.length > 0 || this.$refs.input && this.query !== '') {
          this.currentPlaceholder = '';
        } else {
          this.currentPlaceholder = this.cachedPlaceHolder;
        }
        if (this.filterable && !this.reserveKeyword) {
          this.query = '';
          this.handleQueryChange(this.query);
        }
      }
      this.setSelected();
      if (this.filterable && !this.multiple) {
        this.inputLength = 20;
      }
    },
    visible: function visible(val) {
      var _this3 = this;

      if (!val) {
        this.handleIconHide();
        this.broadcast('ElSelectDropdown', 'destroyPopper');
        if (this.$refs.input) {
          this.$refs.input.blur();
        }
        this.query = '';
        this.previousQuery = null;
        this.selectedLabel = '';
        this.inputLength = 20;
        this.resetHoverIndex();
        this.$nextTick(function () {
          if (_this3.$refs.input && _this3.$refs.input.value === '' && _this3.selected.length === 0) {
            _this3.currentPlaceholder = _this3.cachedPlaceHolder;
          }
        });
        if (!this.multiple) {
          if (this.selected) {
            if (this.filterable && this.allowCreate && this.createdSelected && this.createdLabel) {
              this.selectedLabel = this.createdLabel;
            } else {
              this.selectedLabel = this.selected.currentLabel;
            }
            if (this.filterable) this.query = this.selectedLabel;
          }
        }
      } else {
        this.handleIconShow();
        this.broadcast('ElSelectDropdown', 'updatePopper');
        if (this.filterable) {
          this.query = this.remote ? '' : this.selectedLabel;
          this.handleQueryChange(this.query);
          if (this.multiple) {
            this.$refs.input.focus();
          } else {
            if (!this.remote) {
              this.broadcast('ElOption', 'queryChange', '');
              this.broadcast('ElOptionGroup', 'queryChange');
            }
            this.broadcast('ElInput', 'inputSelect');
          }
        }
      }
      this.$emit('visible-change', val);
    },
    options: function options() {
      var _this4 = this;

      if (this.$isServer) return;
      this.$nextTick(function () {
        _this4.broadcast('ElSelectDropdown', 'updatePopper');
      });
      if (this.multiple) {
        this.resetInputHeight();
      }
      var inputs = this.$el.querySelectorAll('input');
      if ([].indexOf.call(inputs, document.activeElement) === -1) {
        this.setSelected();
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption();
      }
    }
  },

  methods: {
    handleComposition: function handleComposition(event) {
      var text = event.target.value;
      if (event.type === 'compositionend') {
        this.isOnComposition = false;
        this.handleQueryChange(text);
      } else {
        var lastCharacter = text[text.length - 1] || '';
        this.isOnComposition = !(0, _shared.isKorean)(lastCharacter);
      }
    },
    handleQueryChange: function handleQueryChange(val) {
      var _this5 = this;

      if (this.previousQuery === val || this.isOnComposition) return;
      if (this.previousQuery === null && (typeof this.filterMethod === 'function' || typeof this.remoteMethod === 'function')) {
        this.previousQuery = val;
        return;
      }
      this.previousQuery = val;
      this.$nextTick(function () {
        if (_this5.visible) _this5.broadcast('ElSelectDropdown', 'updatePopper');
      });
      this.hoverIndex = -1;
      if (this.multiple && this.filterable) {
        var length = this.$refs.input.value.length * 15 + 20;
        this.inputLength = this.collapseTags ? Math.min(50, length) : length;
        this.managePlaceholder();
        this.resetInputHeight();
      }
      if (this.remote && typeof this.remoteMethod === 'function') {
        this.hoverIndex = -1;
        this.remoteMethod(val);
      } else if (typeof this.filterMethod === 'function') {
        this.filterMethod(val);
        this.broadcast('ElOptionGroup', 'queryChange');
      } else {
        this.filteredOptionsCount = this.optionsCount;
        this.broadcast('ElOption', 'queryChange', val);
        this.broadcast('ElOptionGroup', 'queryChange');
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption();
      }
    },
    handleIconHide: function handleIconHide() {
      var icon = this.$el.querySelector('.el-input__icon');
      if (icon) {
        (0, _dom.removeClass)(icon, 'is-reverse');
      }
    },
    handleIconShow: function handleIconShow() {
      var icon = this.$el.querySelector('.el-input__icon');
      if (icon && !(0, _dom.hasClass)(icon, 'el-icon-circle-close')) {
        (0, _dom.addClass)(icon, 'is-reverse');
      }
    },
    scrollToOption: function scrollToOption(option) {
      var target = Array.isArray(option) && option[0] ? option[0].$el : option.$el;
      if (this.$refs.popper && target) {
        var menu = this.$refs.popper.$el.querySelector('.el-select-dropdown__wrap');
        (0, _scrollIntoView2.default)(menu, target);
      }
      this.$refs.scrollbar && this.$refs.scrollbar.handleScroll();
    },
    handleMenuEnter: function handleMenuEnter() {
      var _this6 = this;

      this.$nextTick(function () {
        return _this6.scrollToOption(_this6.selected);
      });
    },
    emitChange: function emitChange(val) {
      if (!(0, _util.valueEquals)(this.value, val)) {
        this.$emit('change', val);
        this.dispatch('ElFormItem', 'el.form.change', val);
      }
    },
    getOption: function getOption(value) {
      var option = void 0;
      var isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';
      for (var i = this.cachedOptions.length - 1; i >= 0; i--) {
        var cachedOption = this.cachedOptions[i];
        var isEqual = isObject ? (0, _util.getValueByPath)(cachedOption.value, this.valueKey) === (0, _util.getValueByPath)(value, this.valueKey) : cachedOption.value === value;
        if (isEqual) {
          option = cachedOption;
          break;
        }
      }
      if (option) return option;
      var label = !isObject ? value : '';
      var newOption = {
        value: value,
        currentLabel: label
      };
      if (this.multiple) {
        newOption.hitState = false;
      }
      return newOption;
    },
    setSelected: function setSelected() {
      var _this7 = this;

      if (!this.multiple) {
        var option = this.getOption(this.value);
        if (option.created) {
          this.createdLabel = option.currentLabel;
          this.createdSelected = true;
        } else {
          this.createdSelected = false;
        }
        this.selectedLabel = option.currentLabel;
        this.selected = option;
        if (this.filterable) this.query = this.selectedLabel;
        return;
      }
      var result = [];
      if (Array.isArray(this.value)) {
        this.value.forEach(function (value) {
          result.push(_this7.getOption(value));
        });
      }
      this.selected = result;
      this.$nextTick(function () {
        _this7.resetInputHeight();
      });
    },
    handleFocus: function handleFocus(event) {
      if (!this.softFocus) {
        if (this.automaticDropdown || this.filterable) {
          this.visible = true;
          this.menuVisibleOnFocus = true;
        }
        this.$emit('focus', event);
      } else {
        this.softFocus = false;
      }
    },
    blur: function blur() {
      this.visible = false;
      this.$refs.reference.blur();
    },
    handleBlur: function handleBlur(event) {
      var _this8 = this;

      setTimeout(function () {
        if (_this8.isSilentBlur) {
          _this8.isSilentBlur = false;
        } else {
          _this8.$emit('blur', event);
        }
      }, 50);
      this.softFocus = false;
    },
    handleIconClick: function handleIconClick(event) {
      if (this.iconClass.indexOf('circle-close') > -1) {
        this.deleteSelected(event);
      }
    },
    doDestroy: function doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy();
    },
    handleClose: function handleClose() {
      this.visible = false;
    },
    toggleLastOptionHitState: function toggleLastOptionHitState(hit) {
      if (!Array.isArray(this.selected)) return;
      var option = this.selected[this.selected.length - 1];
      if (!option) return;

      if (hit === true || hit === false) {
        option.hitState = hit;
        return hit;
      }

      option.hitState = !option.hitState;
      return option.hitState;
    },
    deletePrevTag: function deletePrevTag(e) {
      if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
        var value = this.value.slice();
        value.pop();
        this.$emit('input', value);
        this.emitChange(value);
      }
    },
    managePlaceholder: function managePlaceholder() {
      if (this.currentPlaceholder !== '') {
        this.currentPlaceholder = this.$refs.input.value ? '' : this.cachedPlaceHolder;
      }
    },
    resetInputState: function resetInputState(e) {
      if (e.keyCode !== 8) this.toggleLastOptionHitState(false);
      this.inputLength = this.$refs.input.value.length * 15 + 20;
      this.resetInputHeight();
    },
    resetInputHeight: function resetInputHeight() {
      var _this9 = this;

      if (this.collapseTags && !this.filterable) return;
      this.$nextTick(function () {
        if (!_this9.$refs.reference) return;
        var inputChildNodes = _this9.$refs.reference.$el.childNodes;
        var input = [].filter.call(inputChildNodes, function (item) {
          return item.tagName === 'INPUT';
        })[0];
        var tags = _this9.$refs.tags;
        var sizeInMap = sizeMap[_this9.selectSize] || 40;
        input.style.height = _this9.selected.length === 0 ? sizeInMap + 'px' : Math.max(tags ? tags.clientHeight + (tags.clientHeight > sizeInMap ? 6 : 0) : 0, sizeInMap) + 'px';
        if (_this9.visible && _this9.emptyText !== false) {
          _this9.broadcast('ElSelectDropdown', 'updatePopper');
        }
      });
    },
    resetHoverIndex: function resetHoverIndex() {
      var _this10 = this;

      setTimeout(function () {
        if (!_this10.multiple) {
          _this10.hoverIndex = _this10.options.indexOf(_this10.selected);
        } else {
          if (_this10.selected.length > 0) {
            _this10.hoverIndex = Math.min.apply(null, _this10.selected.map(function (item) {
              return _this10.options.indexOf(item);
            }));
          } else {
            _this10.hoverIndex = -1;
          }
        }
      }, 300);
    },
    handleOptionSelect: function handleOptionSelect(option, byClick) {
      var _this11 = this;

      if (this.multiple) {
        var value = this.value.slice();
        var optionIndex = this.getValueIndex(value, option.value);
        if (optionIndex > -1) {
          value.splice(optionIndex, 1);
        } else if (this.multipleLimit <= 0 || value.length < this.multipleLimit) {
          value.push(option.value);
        }
        this.$emit('input', value);
        this.emitChange(value);
        if (option.created) {
          this.query = '';
          this.handleQueryChange('');
          this.inputLength = 20;
        }
        if (this.filterable) this.$refs.input.focus();
      } else {
        this.$emit('input', option.value);
        this.emitChange(option.value);
        this.visible = false;
      }
      this.isSilentBlur = byClick;
      this.setSoftFocus();
      if (this.visible) return;
      this.$nextTick(function () {
        _this11.scrollToOption(option);
      });
    },
    setSoftFocus: function setSoftFocus() {
      this.softFocus = true;
      var input = this.$refs.input || this.$refs.reference;
      if (input) {
        input.focus();
      }
    },
    getValueIndex: function getValueIndex() {
      var _this12 = this;

      var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var value = arguments[1];

      var isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';
      if (!isObject) {
        return arr.indexOf(value);
      } else {
        var _ret = function () {
          var valueKey = _this12.valueKey;
          var index = -1;
          arr.some(function (item, i) {
            if ((0, _util.getValueByPath)(item, valueKey) === (0, _util.getValueByPath)(value, valueKey)) {
              index = i;
              return true;
            }
            return false;
          });
          return {
            v: index
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    },
    toggleMenu: function toggleMenu() {
      if (!this.selectDisabled) {
        if (this.menuVisibleOnFocus) {
          this.menuVisibleOnFocus = false;
        } else {
          this.visible = !this.visible;
        }
        if (this.visible) {
          (this.$refs.input || this.$refs.reference).focus();
        }
      }
    },
    selectOption: function selectOption() {
      if (!this.visible) {
        this.toggleMenu();
      } else {
        if (this.options[this.hoverIndex]) {
          this.handleOptionSelect(this.options[this.hoverIndex]);
        }
      }
    },
    deleteSelected: function deleteSelected(event) {
      event.stopPropagation();
      this.$emit('input', '');
      this.emitChange('');
      this.visible = false;
      this.$emit('clear');
    },
    deleteTag: function deleteTag(event, tag) {
      var index = this.selected.indexOf(tag);
      if (index > -1 && !this.selectDisabled) {
        var value = this.value.slice();
        value.splice(index, 1);
        this.$emit('input', value);
        this.emitChange(value);
        this.$emit('remove-tag', tag.value);
      }
      event.stopPropagation();
    },
    onInputChange: function onInputChange() {
      if (this.filterable && this.query !== this.selectedLabel) {
        this.query = this.selectedLabel;
        this.handleQueryChange(this.query);
      }
    },
    onOptionDestroy: function onOptionDestroy(index) {
      if (index > -1) {
        this.optionsCount--;
        this.filteredOptionsCount--;
        this.options.splice(index, 1);
      }
    },
    resetInputWidth: function resetInputWidth() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
    },
    handleResize: function handleResize() {
      this.resetInputWidth();
      if (this.multiple) this.resetInputHeight();
    },
    checkDefaultFirstOption: function checkDefaultFirstOption() {
      this.hoverIndex = -1;
      // highlight the created option
      var hasCreated = false;
      for (var i = this.options.length - 1; i >= 0; i--) {
        if (this.options[i].created) {
          hasCreated = true;
          this.hoverIndex = i;
          break;
        }
      }
      if (hasCreated) return;
      for (var _i = 0; _i !== this.options.length; ++_i) {
        var option = this.options[_i];
        if (this.query) {
          // highlight first options that passes the filter
          if (!option.disabled && !option.groupDisabled && option.visible) {
            this.hoverIndex = _i;
            break;
          }
        } else {
          // highlight currently selected option
          if (option.itemSelected) {
            this.hoverIndex = _i;
            break;
          }
        }
      }
    },
    getValueKey: function getValueKey(item) {
      if (Object.prototype.toString.call(item.value).toLowerCase() !== '[object object]') {
        return item.value;
      } else {
        return (0, _util.getValueByPath)(item.value, this.valueKey);
      }
    }
  },

  created: function created() {
    var _this13 = this;

    this.cachedPlaceHolder = this.currentPlaceholder = this.placeholder;
    if (this.multiple && !Array.isArray(this.value)) {
      this.$emit('input', []);
    }
    if (!this.multiple && Array.isArray(this.value)) {
      this.$emit('input', '');
    }

    this.debouncedOnInputChange = (0, _debounce2.default)(this.debounce, function () {
      _this13.onInputChange();
    });

    this.$on('handleOptionClick', this.handleOptionSelect);
    this.$on('setSelected', this.setSelected);
    this.$on('fieldReset', function () {
      _this13.dispatch('ElFormItem', 'el.form.change');
    });
  },
  mounted: function mounted() {
    var _this14 = this;

    if (this.multiple && Array.isArray(this.value) && this.value.length > 0) {
      this.currentPlaceholder = '';
    }
    (0, _resizeEvent.addResizeListener)(this.$el, this.handleResize);
    if (this.remote && this.multiple) {
      this.resetInputHeight();
    }
    this.$nextTick(function () {
      if (_this14.$refs.reference && _this14.$refs.reference.$el) {
        _this14.inputWidth = _this14.$refs.reference.$el.getBoundingClientRect().width;
      }
    });
    this.setSelected();
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$el && this.handleResize) (0, _resizeEvent.removeResizeListener)(this.$el, this.handleResize);
  }
};

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_select_dropdown_vue__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_select_dropdown_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_select_dropdown_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0a24e159_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_select_dropdown_vue__ = __webpack_require__(143);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_select_dropdown_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0a24e159_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_select_dropdown_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _vuePopper = __webpack_require__(7);

var _vuePopper2 = _interopRequireDefault(_vuePopper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'ElSelectDropdown',

  componentName: 'ElSelectDropdown',

  mixins: [_vuePopper2.default],

  props: {
    placement: {
      default: 'bottom-start'
    },

    boundariesPadding: {
      default: 0
    },

    popperOptions: {
      default: function _default() {
        return {
          gpuAcceleration: false
        };
      }
    },

    visibleArrow: {
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: true
    }
  },

  data: function data() {
    return {
      minWidth: ''
    };
  },


  computed: {
    popperClass: function popperClass() {
      return this.$parent.popperClass;
    }
  },

  watch: {
    '$parent.inputWidth': function $parentInputWidth() {
      this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px';
    }
  },

  mounted: function mounted() {
    var _this = this;

    this.referenceElm = this.$parent.$refs.reference.$el;
    this.$parent.popperElm = this.popperElm = this.$el;
    this.$on('updatePopper', function () {
      if (_this.$parent.visible) _this.updatePopper();
    });
    this.$on('destroyPopper', this.destroyPopper);
  }
}; //
//
//
//
//
//
//
//
//

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"el-select-dropdown el-popper",class:[{ 'is-multiple': _vm.$parent.multiple }, _vm.popperClass],style:({ minWidth: _vm.minWidth })},[_vm._t("default")],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = {
  data: function data() {
    return {
      hoverOption: -1
    };
  },


  computed: {
    optionsAllDisabled: function optionsAllDisabled() {
      return this.options.filter(function (option) {
        return option.visible;
      }).every(function (option) {
        return option.disabled;
      });
    }
  },

  watch: {
    hoverIndex: function hoverIndex(val) {
      var _this = this;

      if (typeof val === 'number' && val > -1) {
        this.hoverOption = this.options[val] || {};
      }
      this.options.forEach(function (option) {
        option.hover = _this.hoverOption === option;
      });
    }
  },

  methods: {
    navigateOptions: function navigateOptions(direction) {
      var _this2 = this;

      if (!this.visible) {
        this.visible = true;
        return;
      }
      if (this.options.length === 0 || this.filteredOptionsCount === 0) return;
      if (!this.optionsAllDisabled) {
        if (direction === 'next') {
          this.hoverIndex++;
          if (this.hoverIndex === this.options.length) {
            this.hoverIndex = 0;
          }
        } else if (direction === 'prev') {
          this.hoverIndex--;
          if (this.hoverIndex < 0) {
            this.hoverIndex = this.options.length - 1;
          }
        }
        var option = this.options[this.hoverIndex];
        if (option.disabled === true || option.groupDisabled === true || !option.visible) {
          this.navigateOptions(direction);
        }
        this.$nextTick(function () {
          return _this2.scrollToOption(_this2.hoverOption);
        });
      }
    }
  }
};

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:(_vm.handleClose),expression:"handleClose"}],staticClass:"el-select",class:[_vm.selectSize ? 'el-select--' + _vm.selectSize : ''],on:{"click":function($event){$event.stopPropagation();_vm.toggleMenu($event)}}},[(_vm.multiple)?_c('div',{ref:"tags",staticClass:"el-select__tags",style:({ 'max-width': _vm.inputWidth - 32 + 'px' })},[(_vm.collapseTags && _vm.selected.length)?_c('span',[_c('el-tag',{attrs:{"closable":!_vm.selectDisabled,"size":_vm.collapseTagSize,"hit":_vm.selected[0].hitState,"type":"info","disable-transitions":""},on:{"close":function($event){_vm.deleteTag($event, _vm.selected[0])}}},[_c('span',{staticClass:"el-select__tags-text"},[_vm._v(_vm._s(_vm.selected[0].currentLabel))])]),(_vm.selected.length > 1)?_c('el-tag',{attrs:{"closable":false,"size":_vm.collapseTagSize,"type":"info","disable-transitions":""}},[_c('span',{staticClass:"el-select__tags-text"},[_vm._v("+ "+_vm._s(_vm.selected.length - 1))])]):_vm._e()],1):_vm._e(),(!_vm.collapseTags)?_c('transition-group',{on:{"after-leave":_vm.resetInputHeight}},_vm._l((_vm.selected),function(item){return _c('el-tag',{key:_vm.getValueKey(item),attrs:{"closable":!_vm.selectDisabled,"size":_vm.collapseTagSize,"hit":item.hitState,"type":"info","disable-transitions":""},on:{"close":function($event){_vm.deleteTag($event, item)}}},[_c('span',{staticClass:"el-select__tags-text"},[_vm._v(_vm._s(item.currentLabel))])])})):_vm._e(),(_vm.filterable)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.query),expression:"query"}],ref:"input",staticClass:"el-select__input",class:[_vm.selectSize ? ("is-" + _vm.selectSize) : ''],style:({ width: _vm.inputLength + 'px', 'max-width': _vm.inputWidth - 42 + 'px' }),attrs:{"type":"text","disabled":_vm.selectDisabled,"autocomplete":_vm.autoComplete,"debounce":_vm.remote ? 300 : 0},domProps:{"value":(_vm.query)},on:{"focus":_vm.handleFocus,"blur":function($event){_vm.softFocus = false},"click":function($event){$event.stopPropagation();},"keyup":_vm.managePlaceholder,"keydown":[_vm.resetInputState,function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"down",40,$event.key)){ return null; }$event.preventDefault();_vm.navigateOptions('next')},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"up",38,$event.key)){ return null; }$event.preventDefault();_vm.navigateOptions('prev')},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key)){ return null; }$event.preventDefault();_vm.selectOption($event)},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"esc",27,$event.key)){ return null; }$event.stopPropagation();$event.preventDefault();_vm.visible = false},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"delete",[8,46],$event.key)){ return null; }_vm.deletePrevTag($event)}],"compositionstart":_vm.handleComposition,"compositionupdate":_vm.handleComposition,"compositionend":_vm.handleComposition,"input":[function($event){if($event.target.composing){ return; }_vm.query=$event.target.value},function (e) { return _vm.handleQueryChange(e.target.value); }]}}):_vm._e()],1):_vm._e(),_c('el-input',{ref:"reference",class:{ 'is-focus': _vm.visible },attrs:{"type":"text","placeholder":_vm.currentPlaceholder,"name":_vm.name,"id":_vm.id,"auto-complete":_vm.autoComplete,"size":_vm.selectSize,"disabled":_vm.selectDisabled,"readonly":_vm.readonly,"validate-event":false},on:{"focus":_vm.handleFocus,"blur":_vm.handleBlur},nativeOn:{"keyup":function($event){_vm.debouncedOnInputChange($event)},"keydown":[function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"down",40,$event.key)){ return null; }$event.stopPropagation();$event.preventDefault();_vm.navigateOptions('next')},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"up",38,$event.key)){ return null; }$event.stopPropagation();$event.preventDefault();_vm.navigateOptions('prev')},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key)){ return null; }$event.preventDefault();_vm.selectOption($event)},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"esc",27,$event.key)){ return null; }$event.stopPropagation();$event.preventDefault();_vm.visible = false},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"tab",9,$event.key)){ return null; }_vm.visible = false}],"paste":function($event){_vm.debouncedOnInputChange($event)},"mouseenter":function($event){_vm.inputHovering = true},"mouseleave":function($event){_vm.inputHovering = false}},model:{value:(_vm.selectedLabel),callback:function ($$v) {_vm.selectedLabel=$$v},expression:"selectedLabel"}},[(_vm.$slots.prefix)?_c('template',{attrs:{"slot":"prefix"},slot:"prefix"},[_vm._t("prefix")],2):_vm._e(),_c('i',{class:['el-select__caret', 'el-input__icon', 'el-icon-' + _vm.iconClass],attrs:{"slot":"suffix"},on:{"click":_vm.handleIconClick},slot:"suffix"})],2),_c('transition',{attrs:{"name":"el-zoom-in-top"},on:{"before-enter":_vm.handleMenuEnter,"after-leave":_vm.doDestroy}},[_c('el-select-menu',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible && _vm.emptyText !== false),expression:"visible && emptyText !== false"}],ref:"popper",attrs:{"append-to-body":_vm.popperAppendToBody}},[_c('el-scrollbar',{directives:[{name:"show",rawName:"v-show",value:(_vm.options.length > 0 && !_vm.loading),expression:"options.length > 0 && !loading"}],ref:"scrollbar",class:{ 'is-empty': !_vm.allowCreate && _vm.query && _vm.filteredOptionsCount === 0 },attrs:{"tag":"ul","wrap-class":"el-select-dropdown__wrap","view-class":"el-select-dropdown__list"}},[(_vm.showNewOption)?_c('el-option',{attrs:{"value":_vm.query,"created":""}}):_vm._e(),_vm._t("default")],2),(_vm.emptyText &&
          (!_vm.allowCreate || _vm.loading || (_vm.allowCreate && _vm.options.length === 0 )))?_c('p',{staticClass:"el-select-dropdown__empty"},[_vm._v("\n        "+_vm._s(_vm.emptyText)+"\n      ")]):_vm._e()],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

module.exports = __webpack_require__(30);

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

module.exports = __webpack_require__(31);

/***/ }),

/***/ 19:
/***/ (function(module, exports) {

module.exports = __webpack_require__(34);

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = __webpack_require__(23);

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

module.exports = __webpack_require__(35);

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

module.exports = __webpack_require__(36);

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

module.exports = __webpack_require__(37);

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = __webpack_require__(13);

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_option_vue__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_option_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_option_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5ed77bae_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_option_vue__ = __webpack_require__(37);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_option_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5ed77bae_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_option_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _emitter = __webpack_require__(1);

var _emitter2 = _interopRequireDefault(_emitter);

var _util = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_emitter2.default],

  name: 'ElOption',

  componentName: 'ElOption',

  inject: ['select'],

  props: {
    value: {
      required: true
    },
    label: [String, Number],
    created: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data: function data() {
    return {
      index: -1,
      groupDisabled: false,
      visible: true,
      hitState: false,
      hover: false
    };
  },


  computed: {
    isObject: function isObject() {
      return Object.prototype.toString.call(this.value).toLowerCase() === '[object object]';
    },
    currentLabel: function currentLabel() {
      return this.label || (this.isObject ? '' : this.value);
    },
    currentValue: function currentValue() {
      return this.value || this.label || '';
    },
    itemSelected: function itemSelected() {
      if (!this.select.multiple) {
        return this.isEqual(this.value, this.select.value);
      } else {
        return this.contains(this.select.value, this.value);
      }
    },
    limitReached: function limitReached() {
      if (this.select.multiple) {
        return !this.itemSelected && (this.select.value || []).length >= this.select.multipleLimit && this.select.multipleLimit > 0;
      } else {
        return false;
      }
    }
  },

  watch: {
    currentLabel: function currentLabel() {
      if (!this.created && !this.select.remote) this.dispatch('ElSelect', 'setSelected');
    },
    value: function value() {
      if (!this.created && !this.select.remote) this.dispatch('ElSelect', 'setSelected');
    }
  },

  methods: {
    isEqual: function isEqual(a, b) {
      if (!this.isObject) {
        return a === b;
      } else {
        var valueKey = this.select.valueKey;
        return (0, _util.getValueByPath)(a, valueKey) === (0, _util.getValueByPath)(b, valueKey);
      }
    },
    contains: function contains() {
      var _this = this;

      var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var target = arguments[1];

      if (!this.isObject) {
        return arr.indexOf(target) > -1;
      } else {
        var _ret = function () {
          var valueKey = _this.select.valueKey;
          return {
            v: arr.some(function (item) {
              return (0, _util.getValueByPath)(item, valueKey) === (0, _util.getValueByPath)(target, valueKey);
            })
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    },
    handleGroupDisabled: function handleGroupDisabled(val) {
      this.groupDisabled = val;
    },
    hoverItem: function hoverItem() {
      if (!this.disabled && !this.groupDisabled) {
        this.select.hoverIndex = this.select.options.indexOf(this);
      }
    },
    selectOptionClick: function selectOptionClick() {
      if (this.disabled !== true && this.groupDisabled !== true) {
        this.dispatch('ElSelect', 'handleOptionClick', [this, true]);
      }
    },
    queryChange: function queryChange(query) {
      // query 里如果有正则中的特殊字符，需要先将这些字符转义
      var parsedQuery = String(query).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
      this.visible = new RegExp(parsedQuery, 'i').test(this.currentLabel) || this.created;
      if (!this.visible) {
        this.select.filteredOptionsCount--;
      }
    }
  },

  created: function created() {
    this.select.options.push(this);
    this.select.cachedOptions.push(this);
    this.select.optionsCount++;
    this.select.filteredOptionsCount++;

    this.$on('queryChange', this.queryChange);
    this.$on('handleGroupDisabled', this.handleGroupDisabled);
  },
  beforeDestroy: function beforeDestroy() {
    this.select.onOptionDestroy(this.select.options.indexOf(this));
  }
};

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],staticClass:"el-select-dropdown__item",class:{
    'selected': _vm.itemSelected,
    'is-disabled': _vm.disabled || _vm.groupDisabled || _vm.limitReached,
    'hover': _vm.hover
  },on:{"mouseenter":_vm.hoverItem,"click":function($event){$event.stopPropagation();_vm.selectOptionClick($event)}}},[_vm._t("default",[_c('span',[_vm._v(_vm._s(_vm.currentLabel))])])],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = __webpack_require__(38);

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = __webpack_require__(39);

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = __webpack_require__(42);

/***/ })

/******/ });

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _vue = __webpack_require__(18);

var _vue2 = _interopRequireDefault(_vue);

var _dom = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodeList = [];
var ctx = '@@clickoutsideContext';

var startClick = void 0;
var seed = 0;

!_vue2.default.prototype.$isServer && (0, _dom.on)(document, 'mousedown', function (e) {
  return startClick = e;
});

!_vue2.default.prototype.$isServer && (0, _dom.on)(document, 'mouseup', function (e) {
  nodeList.forEach(function (node) {
    return node[ctx].documentHandler(e, startClick);
  });
});

function createDocumentHandler(el, binding, vnode) {
  return function () {
    var mouseup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var mousedown = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!vnode || !vnode.context || !mouseup.target || !mousedown.target || el.contains(mouseup.target) || el.contains(mousedown.target) || el === mouseup.target || vnode.context.popperElm && (vnode.context.popperElm.contains(mouseup.target) || vnode.context.popperElm.contains(mousedown.target))) return;

    if (binding.expression && el[ctx].methodName && vnode.context[el[ctx].methodName]) {
      vnode.context[el[ctx].methodName]();
    } else {
      el[ctx].bindingFn && el[ctx].bindingFn();
    }
  };
}

/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
exports.default = {
  bind: function bind(el, binding, vnode) {
    nodeList.push(el);
    var id = seed++;
    el[ctx] = {
      id: id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression,
      bindingFn: binding.value
    };
  },
  update: function update(el, binding, vnode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
    el[ctx].methodName = binding.expression;
    el[ctx].bindingFn = binding.value;
  },
  unbind: function unbind(el) {
    var len = nodeList.length;

    for (var i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
    delete el[ctx];
  }
};

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.5.16
 * (c) 2014-2018 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it... e.g.
 * PhantomJS 1.x. Technically we don't need this anymore since native bind is
 * now more performant in most browsers, but removing it would be breaking for
 * code that was able to run in PhantomJS 1.x, so this must be kept for
 * backwards compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "none" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "none" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
})

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  if (!getter && arguments.length === 2) {
    val = obj[key];
  }
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("none" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ("none" !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "none" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ("none" !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "none" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "none" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    "none" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "none" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("none" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("none" !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      "none" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "none" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("none" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("none" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$1 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$1; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "none" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "none" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      "none" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ("none" !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if ("none" !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ("none" !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if ("none" !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "none" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "none" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    hooks[key] = componentVNodeHooks[key];
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "none" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ("none" !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    // reset _rendered flag on slots for duplicate slot check
    if (true) {
      for (var key in vm.$slots) {
        // $flow-disable-line
        vm.$slots[key]._rendered = false;
      }
    }

    if (_parentVnode) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (true) {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {}
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("none" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("none" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("none" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue (options) {
  if ("none" !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ("none" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ("none" !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
}

var builtInComponents = {
  KeepAlive: KeepAlive
}

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.5.16';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "none" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
}

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (true) {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("none" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (true) {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (true) {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (true) {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("none" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("none" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (true) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
}

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
]

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
}

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
}

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
  el.plain = false;
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  el.plain = false;
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    "none" !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = {
    value: value.trim()
  };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (true) {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (true) {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  if (true) {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally'
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
}

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
}

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("none" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("none" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {}

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
]

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "none" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
}

var platformDirectives = {
  model: directive,
  show: show
}

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("none" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("none" !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
}

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (true) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
}

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
}

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        "none" !== 'production' &&
        "none" !== 'test' &&
        isChrome
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if ("none" !== 'production' &&
      "none" !== 'test' &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("none" !== 'production' && staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
}

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (true) {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
}

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
}

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being pased as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("none" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("none" !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /([^]*?)\s+(?:in|of)\s+([^]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function closeElement (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "none" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        if (true) {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (true) {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      closeElement(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (true) {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var res;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("none" !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else if (true) {
      warn$2(
        ("Invalid v-for expression: " + exp)
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '');
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (true) {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("none" !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("none" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if ("none" !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if ("none" !== 'production' && el.attrsMap['v-for']) {
        warn$2(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          true
        );
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("none" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (true) {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      "none" !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$2 = {
  preTransformNode: preTransformNode
}

var modules$1 = [
  klass$1,
  style$1,
  model$2
]

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
}

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  esc: 'Escape',
  tab: 'Tab',
  enter: 'Enter',
  space: ' ',
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  'delete': ['Backspace', 'Delete']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    /* istanbul ignore if */
    return ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : handler.value;
    /* istanbul ignore if */
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if ("none" !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
}

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "none" !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if ("none" !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if ("none" !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    /* istanbul ignore if */
    {
      res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
    }
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (
  ident,
  type,
  text,
  errors
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
    }
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (true) {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (true) {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (true) {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      if (true) {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "none" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("none" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (true) {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if ("none" !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("none" !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(19), __webpack_require__(20).setImmediate))

/***/ }),
/* 19 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(21);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(19)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(19), __webpack_require__(22)))

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getStyle = exports.once = exports.off = exports.on = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* istanbul ignore next */

exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.setStyle = setStyle;

var _vue = __webpack_require__(18);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isServer = _vue2.default.prototype.$isServer;
var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
var MOZ_HACK_REGEXP = /^moz([A-Z])/;
var ieVersion = isServer ? 0 : Number(document.documentMode);

/* istanbul ignore next */
var trim = function trim(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
/* istanbul ignore next */
var camelCase = function camelCase(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

/* istanbul ignore next */
var on = exports.on = function () {
  if (!isServer && document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
}();

/* istanbul ignore next */
var off = exports.off = function () {
  if (!isServer && document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
}();

/* istanbul ignore next */
var once = exports.once = function once(el, event, fn) {
  var listener = function listener() {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};

/* istanbul ignore next */
function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
};

/* istanbul ignore next */
function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};

/* istanbul ignore next */
function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
};

/* istanbul ignore next */
var getStyle = exports.getStyle = ieVersion < 9 ? function (element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'styleFloat';
  }
  try {
    switch (styleName) {
      case 'opacity':
        try {
          return element.filters.item('alpha').opacity / 100;
        } catch (e) {
          return 1.0;
        }
      default:
        return element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null;
    }
  } catch (e) {
    return element.style[styleName];
  }
} : function (element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};

/* istanbul ignore next */
function setStyle(element, styleName, value) {
  if (!element || !styleName) return;

  if ((typeof styleName === 'undefined' ? 'undefined' : _typeof(styleName)) === 'object') {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    } else {
      element.style[styleName] = value;
    }
  }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.i18n = exports.use = exports.t = undefined;

var _zhCN = __webpack_require__(25);

var _zhCN2 = _interopRequireDefault(_zhCN);

var _vue = __webpack_require__(18);

var _vue2 = _interopRequireDefault(_vue);

var _deepmerge = __webpack_require__(26);

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _format = __webpack_require__(27);

var _format2 = _interopRequireDefault(_format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var format = (0, _format2.default)(_vue2.default);
var lang = _zhCN2.default;
var merged = false;
var i18nHandler = function i18nHandler() {
  var vuei18n = Object.getPrototypeOf(this || _vue2.default).$t;
  if (typeof vuei18n === 'function' && !!_vue2.default.locale) {
    if (!merged) {
      merged = true;
      _vue2.default.locale(_vue2.default.config.lang, (0, _deepmerge2.default)(lang, _vue2.default.locale(_vue2.default.config.lang) || {}, { clone: true }));
    }
    return vuei18n.apply(this, arguments);
  }
};

var t = exports.t = function t(path, options) {
  var value = i18nHandler.apply(this, arguments);
  if (value !== null && value !== undefined) return value;

  var array = path.split('.');
  var current = lang;

  for (var i = 0, j = array.length; i < j; i++) {
    var property = array[i];
    value = current[property];
    if (i === j - 1) return format(value, options);
    if (!value) return '';
    current = value;
  }
  return '';
};

var use = exports.use = function use(l) {
  lang = l || lang;
};

var i18n = exports.i18n = function i18n(fn) {
  i18nHandler = fn || i18nHandler;
};

exports.default = { use: use, t: t, i18n: i18n };

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = {
  el: {
    colorpicker: {
      confirm: '确定',
      clear: '清空'
    },
    datepicker: {
      now: '此刻',
      today: '今天',
      cancel: '取消',
      clear: '清空',
      confirm: '确定',
      selectDate: '选择日期',
      selectTime: '选择时间',
      startDate: '开始日期',
      startTime: '开始时间',
      endDate: '结束日期',
      endTime: '结束时间',
      prevYear: '前一年',
      nextYear: '后一年',
      prevMonth: '上个月',
      nextMonth: '下个月',
      year: '年',
      month1: '1 月',
      month2: '2 月',
      month3: '3 月',
      month4: '4 月',
      month5: '5 月',
      month6: '6 月',
      month7: '7 月',
      month8: '8 月',
      month9: '9 月',
      month10: '10 月',
      month11: '11 月',
      month12: '12 月',
      // week: '周次',
      weeks: {
        sun: '日',
        mon: '一',
        tue: '二',
        wed: '三',
        thu: '四',
        fri: '五',
        sat: '六'
      },
      months: {
        jan: '一月',
        feb: '二月',
        mar: '三月',
        apr: '四月',
        may: '五月',
        jun: '六月',
        jul: '七月',
        aug: '八月',
        sep: '九月',
        oct: '十月',
        nov: '十一月',
        dec: '十二月'
      }
    },
    select: {
      loading: '加载中',
      noMatch: '无匹配数据',
      noData: '无数据',
      placeholder: '请选择'
    },
    cascader: {
      noMatch: '无匹配数据',
      loading: '加载中',
      placeholder: '请选择'
    },
    pagination: {
      goto: '前往',
      pagesize: '条/页',
      total: '共 {total} 条',
      pageClassifier: '页'
    },
    messagebox: {
      title: '提示',
      confirm: '确定',
      cancel: '取消',
      error: '输入的数据不合法!'
    },
    upload: {
      deleteTip: '按 delete 键可删除',
      delete: '删除',
      preview: '查看图片',
      continue: '继续上传'
    },
    table: {
      emptyText: '暂无数据',
      confirmFilter: '筛选',
      resetFilter: '重置',
      clearFilter: '全部',
      sumText: '合计'
    },
    tree: {
      emptyText: '暂无数据'
    },
    transfer: {
      noMatch: '无匹配数据',
      noData: '无数据',
      titles: ['列表 1', '列表 2'],
      filterPlaceholder: '请输入搜索内容',
      noCheckedFormat: '共 {total} 项',
      hasCheckedFormat: '已选 {checked}/{total} 项'
    }
  }
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function(key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function(key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

    if (!sourceAndTargetTypesMatch) {
        return cloneIfNecessary(source, optionsArgument)
    } else if (sourceIsArray) {
        var arrayMerge = options.arrayMerge || defaultArrayMerge;
        return arrayMerge(target, source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (Vue) {

  /**
   * template
   *
   * @param {String} string
   * @param {Array} ...args
   * @return {String}
   */

  function template(string) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (args.length === 1 && _typeof(args[0]) === 'object') {
      args = args[0];
    }

    if (!args || !args.hasOwnProperty) {
      args = {};
    }

    return string.replace(RE_NARGS, function (match, prefix, i, index) {
      var result = void 0;

      if (string[index - 1] === '{' && string[index + match.length] === '}') {
        return i;
      } else {
        result = (0, _util.hasOwn)(args, i) ? args[i] : null;
        if (result === null || result === undefined) {
          return '';
        }

        return result;
      }
    });
  }

  return template;
};

var _util = __webpack_require__(13);

var RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;
/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-undefined */

var throttle = __webpack_require__(29);

/**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param  {Number}   delay         A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}  [atBegin]     Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
 *                                  after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
 *                                  (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
 * @param  {Function} callback      A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                  to `callback` when the debounced-function is executed.
 *
 * @return {Function} A new, debounced function.
 */
module.exports = function ( delay, atBegin, callback ) {
	return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  {Number}    delay          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}   [noTrailing]   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
 *                                    the internal counter is reset)
 * @param  {Function}  callback       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param  {Boolean}   [debounceMode] If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
 *                                    schedule `callback` to execute after `delay` ms.
 *
 * @return {Function}  A new, throttled, function.
 */
module.exports = function ( delay, noTrailing, callback, debounceMode ) {

	// After wrapper has stopped being called, this timeout ensures that
	// `callback` is executed at the proper times in `throttle` and `end`
	// debounce modes.
	var timeoutID;

	// Keep track of the last time `callback` was executed.
	var lastExec = 0;

	// `noTrailing` defaults to falsy.
	if ( typeof noTrailing !== 'boolean' ) {
		debounceMode = callback;
		callback = noTrailing;
		noTrailing = undefined;
	}

	// The `wrapper` function encapsulates all of the throttling / debouncing
	// functionality and when executed will limit the rate at which `callback`
	// is executed.
	function wrapper () {

		var self = this;
		var elapsed = Number(new Date()) - lastExec;
		var args = arguments;

		// Execute `callback` and update the `lastExec` timestamp.
		function exec () {
			lastExec = Number(new Date());
			callback.apply(self, args);
		}

		// If `debounceMode` is true (at begin) this is used to clear the flag
		// to allow future `callback` executions.
		function clear () {
			timeoutID = undefined;
		}

		if ( debounceMode && !timeoutID ) {
			// Since `wrapper` is being called for the first time and
			// `debounceMode` is true (at begin), execute `callback`.
			exec();
		}

		// Clear any existing timeout.
		if ( timeoutID ) {
			clearTimeout(timeoutID);
		}

		if ( debounceMode === undefined && elapsed > delay ) {
			// In throttle mode, if `delay` time has been exceeded, execute
			// `callback`.
			exec();

		} else if ( noTrailing !== true ) {
			// In trailing throttle mode, since `delay` time has not been
			// exceeded, schedule `callback` to execute `delay` ms after most
			// recent execution.
			//
			// If `debounceMode` is true (at begin), schedule `clear` to execute
			// after `delay` ms.
			//
			// If `debounceMode` is false (at end), schedule `callback` to
			// execute after `delay` ms.
			timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
		}

	}

	// Return the wrapper function.
	return wrapper;

};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 337);
/******/ })
/************************************************************************/
/******/ ({

/***/ 18:
/***/ (function(module, exports) {

module.exports = __webpack_require__(31);

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = __webpack_require__(23);

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = __webpack_require__(13);

/***/ }),

/***/ 337:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _main = __webpack_require__(338);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_main2.default.install = function (Vue) {
  Vue.component(_main2.default.name, _main2.default);
};

exports.default = _main2.default;

/***/ }),

/***/ 338:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _resizeEvent = __webpack_require__(18);

var _scrollbarWidth = __webpack_require__(38);

var _scrollbarWidth2 = _interopRequireDefault(_scrollbarWidth);

var _util = __webpack_require__(3);

var _bar = __webpack_require__(339);

var _bar2 = _interopRequireDefault(_bar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
// reference https://github.com/noeldelgado/gemini-scrollbar/blob/master/index.js

exports.default = {
  name: 'ElScrollbar',

  components: { Bar: _bar2.default },

  props: {
    native: Boolean,
    wrapStyle: {},
    wrapClass: {},
    viewClass: {},
    viewStyle: {},
    noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: {
      type: String,
      default: 'div'
    }
  },

  data: function data() {
    return {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0
    };
  },


  computed: {
    wrap: function wrap() {
      return this.$refs.wrap;
    }
  },

  render: function render(h) {
    var gutter = (0, _scrollbarWidth2.default)();
    var style = this.wrapStyle;

    if (gutter) {
      var gutterWith = '-' + gutter + 'px';
      var gutterStyle = 'margin-bottom: ' + gutterWith + '; margin-right: ' + gutterWith + ';';

      if (Array.isArray(this.wrapStyle)) {
        style = (0, _util.toObject)(this.wrapStyle);
        style.marginRight = style.marginBottom = gutterWith;
      } else if (typeof this.wrapStyle === 'string') {
        style += gutterStyle;
      } else {
        style = gutterStyle;
      }
    }
    var view = h(this.tag, {
      class: ['el-scrollbar__view', this.viewClass],
      style: this.viewStyle,
      ref: 'resize'
    }, this.$slots.default);
    var wrap = h(
      'div',
      {
        ref: 'wrap',
        style: style,
        on: {
          'scroll': this.handleScroll
        },

        'class': [this.wrapClass, 'el-scrollbar__wrap', gutter ? '' : 'el-scrollbar__wrap--hidden-default'] },
      [[view]]
    );
    var nodes = void 0;

    if (!this.native) {
      nodes = [wrap, h(
        _bar2.default,
        {
          attrs: {
            move: this.moveX,
            size: this.sizeWidth }
        },
        []
      ), h(
        _bar2.default,
        {
          attrs: {
            vertical: true,
            move: this.moveY,
            size: this.sizeHeight }
        },
        []
      )];
    } else {
      nodes = [h(
        'div',
        {
          ref: 'wrap',
          'class': [this.wrapClass, 'el-scrollbar__wrap'],
          style: style },
        [[view]]
      )];
    }
    return h('div', { class: 'el-scrollbar' }, nodes);
  },


  methods: {
    handleScroll: function handleScroll() {
      var wrap = this.wrap;

      this.moveY = wrap.scrollTop * 100 / wrap.clientHeight;
      this.moveX = wrap.scrollLeft * 100 / wrap.clientWidth;
    },
    update: function update() {
      var heightPercentage = void 0,
          widthPercentage = void 0;
      var wrap = this.wrap;
      if (!wrap) return;

      heightPercentage = wrap.clientHeight * 100 / wrap.scrollHeight;
      widthPercentage = wrap.clientWidth * 100 / wrap.scrollWidth;

      this.sizeHeight = heightPercentage < 100 ? heightPercentage + '%' : '';
      this.sizeWidth = widthPercentage < 100 ? widthPercentage + '%' : '';
    }
  },

  mounted: function mounted() {
    if (this.native) return;
    this.$nextTick(this.update);
    !this.noresize && (0, _resizeEvent.addResizeListener)(this.$refs.resize, this.update);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.native) return;
    !this.noresize && (0, _resizeEvent.removeResizeListener)(this.$refs.resize, this.update);
  }
};

/***/ }),

/***/ 339:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _dom = __webpack_require__(2);

var _util = __webpack_require__(340);

/* istanbul ignore next */
exports.default = {
  name: 'Bar',

  props: {
    vertical: Boolean,
    size: String,
    move: Number
  },

  computed: {
    bar: function bar() {
      return _util.BAR_MAP[this.vertical ? 'vertical' : 'horizontal'];
    },
    wrap: function wrap() {
      return this.$parent.wrap;
    }
  },

  render: function render(h) {
    var size = this.size,
        move = this.move,
        bar = this.bar;


    return h(
      'div',
      {
        'class': ['el-scrollbar__bar', 'is-' + bar.key],
        on: {
          'mousedown': this.clickTrackHandler
        }
      },
      [h(
        'div',
        {
          ref: 'thumb',
          'class': 'el-scrollbar__thumb',
          on: {
            'mousedown': this.clickThumbHandler
          },

          style: (0, _util.renderThumbStyle)({ size: size, move: move, bar: bar }) },
        []
      )]
    );
  },


  methods: {
    clickThumbHandler: function clickThumbHandler(e) {
      this.startDrag(e);
      this[this.bar.axis] = e.currentTarget[this.bar.offset] - (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction]);
    },
    clickTrackHandler: function clickTrackHandler(e) {
      var offset = Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]);
      var thumbHalf = this.$refs.thumb[this.bar.offset] / 2;
      var thumbPositionPercentage = (offset - thumbHalf) * 100 / this.$el[this.bar.offset];

      this.wrap[this.bar.scroll] = thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100;
    },
    startDrag: function startDrag(e) {
      e.stopImmediatePropagation();
      this.cursorDown = true;

      (0, _dom.on)(document, 'mousemove', this.mouseMoveDocumentHandler);
      (0, _dom.on)(document, 'mouseup', this.mouseUpDocumentHandler);
      document.onselectstart = function () {
        return false;
      };
    },
    mouseMoveDocumentHandler: function mouseMoveDocumentHandler(e) {
      if (this.cursorDown === false) return;
      var prevPage = this[this.bar.axis];

      if (!prevPage) return;

      var offset = (this.$el.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]) * -1;
      var thumbClickPosition = this.$refs.thumb[this.bar.offset] - prevPage;
      var thumbPositionPercentage = (offset - thumbClickPosition) * 100 / this.$el[this.bar.offset];

      this.wrap[this.bar.scroll] = thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100;
    },
    mouseUpDocumentHandler: function mouseUpDocumentHandler(e) {
      this.cursorDown = false;
      this[this.bar.axis] = 0;
      (0, _dom.off)(document, 'mousemove', this.mouseMoveDocumentHandler);
      document.onselectstart = null;
    }
  },

  destroyed: function destroyed() {
    (0, _dom.off)(document, 'mouseup', this.mouseUpDocumentHandler);
  }
};

/***/ }),

/***/ 340:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.renderThumbStyle = renderThumbStyle;
var BAR_MAP = exports.BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
};

function renderThumbStyle(_ref) {
  var move = _ref.move,
      size = _ref.size,
      bar = _ref.bar;

  var style = {};
  var translate = 'translate' + bar.axis + '(' + move + '%)';

  style[bar.size] = size;
  style.transform = translate;
  style.msTransform = translate;
  style.webkitTransform = translate;

  return style;
};

/***/ }),

/***/ 38:
/***/ (function(module, exports) {

module.exports = __webpack_require__(33);

/***/ })

/******/ });

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.removeResizeListener = exports.addResizeListener = undefined;

var _resizeObserverPolyfill = __webpack_require__(32);

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isServer = typeof window === 'undefined';

/* istanbul ignore next */
var resizeHandler = function resizeHandler(entries) {
  for (var _iterator = entries, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var entry = _ref;

    var listeners = entry.target.__resizeListeners__ || [];
    if (listeners.length) {
      listeners.forEach(function (fn) {
        fn();
      });
    }
  }
};

/* istanbul ignore next */
var addResizeListener = exports.addResizeListener = function addResizeListener(element, fn) {
  if (isServer) return;
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = [];
    element.__ro__ = new _resizeObserverPolyfill2.default(resizeHandler);
    element.__ro__.observe(element);
  }
  element.__resizeListeners__.push(fn);
};

/* istanbul ignore next */
var removeResizeListener = exports.removeResizeListener = function removeResizeListener(element, fn) {
  if (!element || !element.__resizeListeners__) return;
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect();
  }
};

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }

    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;

        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;

                return true;
            }

            return false;
        });

        return result;
    }

    return (function () {
        function anonymous() {
            this.__entries__ = [];
        }

        var prototypeAccessors = { size: { configurable: true } };

        /**
         * @returns {boolean}
         */
        prototypeAccessors.size.get = function () {
            return this.__entries__.length;
        };

        /**
         * @param {*} key
         * @returns {*}
         */
        anonymous.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];

            return entry && entry[1];
        };

        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        anonymous.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);

            if (~index) {
                this.__entries__[index][1] = value;
            } else {
                this.__entries__.push([key, value]);
            }
        };

        /**
         * @param {*} key
         * @returns {void}
         */
        anonymous.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);

            if (~index) {
                entries.splice(index, 1);
            }
        };

        /**
         * @param {*} key
         * @returns {void}
         */
        anonymous.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };

        /**
         * @returns {void}
         */
        anonymous.prototype.clear = function () {
            this.__entries__.splice(0);
        };

        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        anonymous.prototype.forEach = function (callback, ctx) {
            var this$1 = this;
            if ( ctx === void 0 ) ctx = null;

            for (var i = 0, list = this$1.__entries__; i < list.length; i += 1) {
                var entry = list[i];

                callback.call(ctx, entry[1], entry[0]);
            }
        };

        Object.defineProperties( anonymous.prototype, prototypeAccessors );

        return anonymous;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }

    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }

    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }

    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }

    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;

/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
var throttle = function (callback, delay) {
    var leadingCall = false,
        trailingCall = false,
        lastCallTime = 0;

    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;

            callback();
        }

        if (trailingCall) {
            proxy();
        }
    }

    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }

    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();

        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }

            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        } else {
            leadingCall = true;
            trailingCall = false;

            setTimeout(timeoutCallback, delay);
        }

        lastCallTime = timeStamp;
    }

    return proxy;
};

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;

// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];

// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';

/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = function() {
    this.connected_ = false;
    this.mutationEventsAdded_ = false;
    this.mutationsObserver_ = null;
    this.observers_ = [];

    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
    this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
};

/**
 * Adds observer to observers list.
 *
 * @param {ResizeObserverSPI} observer - Observer to be added.
 * @returns {void}
 */


/**
 * Holds reference to the controller's instance.
 *
 * @private {ResizeObserverController}
 */


/**
 * Keeps reference to the instance of MutationObserver.
 *
 * @private {MutationObserver}
 */

/**
 * Indicates whether DOM listeners have been added.
 *
 * @private {boolean}
 */
ResizeObserverController.prototype.addObserver = function (observer) {
    if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
    }

    // Add listeners if they haven't been added yet.
    if (!this.connected_) {
        this.connect_();
    }
};

/**
 * Removes observer from observers list.
 *
 * @param {ResizeObserverSPI} observer - Observer to be removed.
 * @returns {void}
 */
ResizeObserverController.prototype.removeObserver = function (observer) {
    var observers = this.observers_;
    var index = observers.indexOf(observer);

    // Remove observer if it's present in registry.
    if (~index) {
        observers.splice(index, 1);
    }

    // Remove listeners if controller has no connected observers.
    if (!observers.length && this.connected_) {
        this.disconnect_();
    }
};

/**
 * Invokes the update of observers. It will continue running updates insofar
 * it detects changes.
 *
 * @returns {void}
 */
ResizeObserverController.prototype.refresh = function () {
    var changesDetected = this.updateObservers_();

    // Continue running updates if changes have been detected as there might
    // be future ones caused by CSS transitions.
    if (changesDetected) {
        this.refresh();
    }
};

/**
 * Updates every observer from observers list and notifies them of queued
 * entries.
 *
 * @private
 * @returns {boolean} Returns "true" if any observer has detected changes in
 *  dimensions of it's elements.
 */
ResizeObserverController.prototype.updateObservers_ = function () {
    // Collect observers that have active observations.
    var activeObservers = this.observers_.filter(function (observer) {
        return observer.gatherActive(), observer.hasActive();
    });

    // Deliver notifications in a separate cycle in order to avoid any
    // collisions between observers, e.g. when multiple instances of
    // ResizeObserver are tracking the same element and the callback of one
    // of them changes content dimensions of the observed target. Sometimes
    // this may result in notifications being blocked for the rest of observers.
    activeObservers.forEach(function (observer) { return observer.broadcastActive(); });

    return activeObservers.length > 0;
};

/**
 * Initializes DOM listeners.
 *
 * @private
 * @returns {void}
 */
ResizeObserverController.prototype.connect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already added.
    if (!isBrowser || this.connected_) {
        return;
    }

    // Subscription to the "Transitionend" event is used as a workaround for
    // delayed transitions. This way it's possible to capture at least the
    // final state of an element.
    document.addEventListener('transitionend', this.onTransitionEnd_);

    window.addEventListener('resize', this.refresh);

    if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);

        this.mutationsObserver_.observe(document, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        });
    } else {
        document.addEventListener('DOMSubtreeModified', this.refresh);

        this.mutationEventsAdded_ = true;
    }

    this.connected_ = true;
};

/**
 * Removes DOM listeners.
 *
 * @private
 * @returns {void}
 */
ResizeObserverController.prototype.disconnect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already removed.
    if (!isBrowser || !this.connected_) {
        return;
    }

    document.removeEventListener('transitionend', this.onTransitionEnd_);
    window.removeEventListener('resize', this.refresh);

    if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
    }

    if (this.mutationEventsAdded_) {
        document.removeEventListener('DOMSubtreeModified', this.refresh);
    }

    this.mutationsObserver_ = null;
    this.mutationEventsAdded_ = false;
    this.connected_ = false;
};

/**
 * "Transitionend" event handler.
 *
 * @private
 * @param {TransitionEvent} event
 * @returns {void}
 */
ResizeObserverController.prototype.onTransitionEnd_ = function (ref) {
        var propertyName = ref.propertyName; if ( propertyName === void 0 ) propertyName = '';

    // Detect whether transition may affect dimensions of an element.
    var isReflowProperty = transitionKeys.some(function (key) {
        return !!~propertyName.indexOf(key);
    });

    if (isReflowProperty) {
        this.refresh();
    }
};

/**
 * Returns instance of the ResizeObserverController.
 *
 * @returns {ResizeObserverController}
 */
ResizeObserverController.getInstance = function () {
    if (!this.instance_) {
        this.instance_ = new ResizeObserverController();
    }

    return this.instance_;
};

ResizeObserverController.instance_ = null;

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var i = 0, list = Object.keys(props); i < list.length; i += 1) {
        var key = list[i];

        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }

    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;

    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);

/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}

/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [], len = arguments.length - 1;
    while ( len-- > 0 ) positions[ len ] = arguments[ len + 1 ];

    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];

        return size + toFloat(value);
    }, 0);
}

/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};

    for (var i = 0, list = positions; i < list.length; i += 1) {
        var position = list[i];

        var value = styles['padding-' + position];

        paddings[position] = toFloat(value);
    }

    return paddings;
}

/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();

    return createRectInit(0, 0, bbox.width, bbox.height);
}

/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth;
    var clientHeight = target.clientHeight;

    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }

    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;

    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width),
        height = toFloat(styles.height);

    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }

        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }

    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;

        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }

        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }

    return createRectInit(paddings.left, paddings.top, width, height);
}

/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }

    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === 'function'; };
})();

/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}

/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }

    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }

    return getHTMLElementContentRect(target);
}

/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(ref) {
    var x = ref.x;
    var y = ref.y;
    var width = ref.width;
    var height = ref.height;

    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);

    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });

    return rect;
}

/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = function(target) {
    this.broadcastWidth = 0;
    this.broadcastHeight = 0;
    this.contentRect_ = createRectInit(0, 0, 0, 0);

    this.target = target;
};

/**
 * Updates content rectangle and tells whether it's width or height properties
 * have changed since the last broadcast.
 *
 * @returns {boolean}
 */


/**
 * Reference to the last observed content rectangle.
 *
 * @private {DOMRectInit}
 */


/**
 * Broadcasted width of content rectangle.
 *
 * @type {number}
 */
ResizeObservation.prototype.isActive = function () {
    var rect = getContentRect(this.target);

    this.contentRect_ = rect;

    return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
};

/**
 * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
 * from the corresponding properties of the last observed content rectangle.
 *
 * @returns {DOMRectInit} Last observed content rectangle.
 */
ResizeObservation.prototype.broadcastRect = function () {
    var rect = this.contentRect_;

    this.broadcastWidth = rect.width;
    this.broadcastHeight = rect.height;

    return rect;
};

var ResizeObserverEntry = function(target, rectInit) {
    var contentRect = createReadOnlyRect(rectInit);

    // According to the specification following properties are not writable
    // and are also not enumerable in the native implementation.
    //
    // Property accessors are not being used as they'd require to define a
    // private WeakMap storage which may cause memory leaks in browsers that
    // don't support this type of collections.
    defineConfigurable(this, { target: target, contentRect: contentRect });
};

var ResizeObserverSPI = function(callback, controller, callbackCtx) {
    this.activeObservations_ = [];
    this.observations_ = new MapShim();

    if (typeof callback !== 'function') {
        throw new TypeError('The callback provided as parameter 1 is not a function.');
    }

    this.callback_ = callback;
    this.controller_ = controller;
    this.callbackCtx_ = callbackCtx;
};

/**
 * Starts observing provided element.
 *
 * @param {Element} target - Element to be observed.
 * @returns {void}
 */


/**
 * Registry of the ResizeObservation instances.
 *
 * @private {Map<Element, ResizeObservation>}
 */


/**
 * Public ResizeObserver instance which will be passed to the callback
 * function and used as a value of it's "this" binding.
 *
 * @private {ResizeObserver}
 */

/**
 * Collection of resize observations that have detected changes in dimensions
 * of elements.
 *
 * @private {Array<ResizeObservation>}
 */
ResizeObserverSPI.prototype.observe = function (target) {
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_;

    // Do nothing if element is already being observed.
    if (observations.has(target)) {
        return;
    }

    observations.set(target, new ResizeObservation(target));

    this.controller_.addObserver(this);

    // Force the update of observations.
    this.controller_.refresh();
};

/**
 * Stops observing provided element.
 *
 * @param {Element} target - Element to stop observing.
 * @returns {void}
 */
ResizeObserverSPI.prototype.unobserve = function (target) {
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_;

    // Do nothing if element is not being observed.
    if (!observations.has(target)) {
        return;
    }

    observations.delete(target);

    if (!observations.size) {
        this.controller_.removeObserver(this);
    }
};

/**
 * Stops observing all elements.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.disconnect = function () {
    this.clearActive();
    this.observations_.clear();
    this.controller_.removeObserver(this);
};

/**
 * Collects observation instances the associated element of which has changed
 * it's content rectangle.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.gatherActive = function () {
        var this$1 = this;

    this.clearActive();

    this.observations_.forEach(function (observation) {
        if (observation.isActive()) {
            this$1.activeObservations_.push(observation);
        }
    });
};

/**
 * Invokes initial callback function with a list of ResizeObserverEntry
 * instances collected from active resize observations.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.broadcastActive = function () {
    // Do nothing if observer doesn't have active observations.
    if (!this.hasActive()) {
        return;
    }

    var ctx = this.callbackCtx_;

    // Create ResizeObserverEntry instance for every active observation.
    var entries = this.activeObservations_.map(function (observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
    });

    this.callback_.call(ctx, entries, ctx);
    this.clearActive();
};

/**
 * Clears the collection of active observations.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.clearActive = function () {
    this.activeObservations_.splice(0);
};

/**
 * Tells whether observer has active observations.
 *
 * @returns {boolean}
 */
ResizeObserverSPI.prototype.hasActive = function () {
    return this.activeObservations_.length > 0;
};

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();

/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = function(callback) {
    if (!(this instanceof ResizeObserver)) {
        throw new TypeError('Cannot call a class as a function.');
    }
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    var controller = ResizeObserverController.getInstance();
    var observer = new ResizeObserverSPI(callback, controller, this);

    observers.set(this, observer);
};

// Expose public methods of ResizeObserver.
['observe', 'unobserve', 'disconnect'].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        return (ref = observers.get(this))[method].apply(ref, arguments);
        var ref;
    };
});

var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }

    return ResizeObserver;
})();

/* harmony default export */ __webpack_exports__["default"] = (index);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(19)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function () {
  if (_vue2.default.prototype.$isServer) return 0;
  if (scrollBarWidth !== undefined) return scrollBarWidth;

  var outer = document.createElement('div');
  outer.className = 'el-scrollbar__wrap';
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  var widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  var inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  var widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
};

var _vue = __webpack_require__(18);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scrollBarWidth = void 0;

;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (ref) {
  return {
    methods: {
      focus: function focus() {
        this.$refs[ref].focus();
      }
    }
  };
};

;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isDef = isDef;
exports.isKorean = isKorean;
function isDef(val) {
  return val !== undefined && val !== null;
}
function isKorean(text) {
  var reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi;
  return reg.test(text);
}

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 244);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _tag = __webpack_require__(245);

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_tag2.default.install = function (Vue) {
  Vue.component(_tag2.default.name, _tag2.default);
};

exports.default = _tag2.default;

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_tag_vue__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_tag_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_tag_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_466877f5_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_tag_vue__ = __webpack_require__(247);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_tag_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_466877f5_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_tag_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'ElTag',
  props: {
    text: String,
    closable: Boolean,
    type: String,
    hit: Boolean,
    disableTransitions: Boolean,
    color: String,
    size: String
  },
  methods: {
    handleClose: function handleClose(event) {
      this.$emit('close', event);
    }
  },
  computed: {
    tagSize: function tagSize() {
      return this.size || (this.$ELEMENT || {}).size;
    }
  }
};

/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.disableTransitions ? '' : 'el-zoom-in-center'}},[_c('span',{staticClass:"el-tag",class:[
      _vm.type ? 'el-tag--' + _vm.type : '',
      _vm.tagSize && ("el-tag--" + _vm.tagSize),
      {'is-hit': _vm.hit}
    ],style:({backgroundColor: _vm.color})},[_vm._t("default"),(_vm.closable)?_c('i',{staticClass:"el-tag__close el-icon-close",on:{"click":function($event){$event.stopPropagation();_vm.handleClose($event)}}}):_vm._e()],2)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

/******/ });

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = scrollIntoView;

var _vue = __webpack_require__(18);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scrollIntoView(container, selected) {
  if (_vue2.default.prototype.$isServer) return;

  if (!selected) {
    container.scrollTop = 0;
    return;
  }

  var offsetParents = [];
  var pointer = selected.offsetParent;
  while (pointer && container !== pointer && container.contains(pointer)) {
    offsetParents.push(pointer);
    pointer = pointer.offsetParent;
  }
  var top = selected.offsetTop + offsetParents.reduce(function (prev, curr) {
    return prev + curr.offsetTop;
  }, 0);
  var bottom = top + selected.offsetHeight;
  var viewRectTop = container.scrollTop;
  var viewRectBottom = viewRectTop + container.clientHeight;

  if (top < viewRectTop) {
    container.scrollTop = top;
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight;
  }
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _locale = __webpack_require__(24);

exports.default = {
  methods: {
    t: function t() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _locale.t.apply(this, args);
    }
  }
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 101);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = __webpack_require__(12);

/***/ }),

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _input = __webpack_require__(102);

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_input2.default.install = function (Vue) {
  Vue.component(_input2.default.name, _input2.default);
};

exports.default = _input2.default;

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_input_vue__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_input_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_input_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_eddb4a56_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_input_vue__ = __webpack_require__(105);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_input_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_eddb4a56_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_input_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _emitter = __webpack_require__(1);

var _emitter2 = _interopRequireDefault(_emitter);

var _migrating = __webpack_require__(8);

var _migrating2 = _interopRequireDefault(_migrating);

var _calcTextareaHeight = __webpack_require__(104);

var _calcTextareaHeight2 = _interopRequireDefault(_calcTextareaHeight);

var _merge = __webpack_require__(9);

var _merge2 = _interopRequireDefault(_merge);

var _shared = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'ElInput',

  componentName: 'ElInput',

  mixins: [_emitter2.default, _migrating2.default],

  inheritAttrs: false,

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  data: function data() {
    return {
      currentValue: this.value === undefined || this.value === null ? '' : this.value,
      textareaCalcStyle: {},
      prefixOffset: null,
      suffixOffset: null,
      hovering: false,
      focused: false,
      isOnComposition: false,
      valueBeforeComposition: null
    };
  },


  props: {
    value: [String, Number],
    size: String,
    resize: String,
    form: String,
    disabled: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    autoComplete: {
      type: String,
      default: 'off'
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable: {
      type: Boolean,
      default: false
    },
    tabindex: String
  },

  computed: {
    _elFormItemSize: function _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    validateState: function validateState() {
      return this.elFormItem ? this.elFormItem.validateState : '';
    },
    needStatusIcon: function needStatusIcon() {
      return this.elForm ? this.elForm.statusIcon : false;
    },
    validateIcon: function validateIcon() {
      return {
        validating: 'el-icon-loading',
        success: 'el-icon-circle-check',
        error: 'el-icon-circle-close'
      }[this.validateState];
    },
    textareaStyle: function textareaStyle() {
      return (0, _merge2.default)({}, this.textareaCalcStyle, { resize: this.resize });
    },
    inputSize: function inputSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    inputDisabled: function inputDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    isGroup: function isGroup() {
      return this.$slots.prepend || this.$slots.append;
    },
    showClear: function showClear() {
      return this.clearable && !this.disabled && !this.readonly && this.currentValue !== '' && (this.focused || this.hovering);
    }
  },

  watch: {
    'value': function value(val, oldValue) {
      this.setCurrentValue(val);
    }
  },

  methods: {
    focus: function focus() {
      (this.$refs.input || this.$refs.textarea).focus();
    },
    blur: function blur() {
      (this.$refs.input || this.$refs.textarea).blur();
    },
    getMigratingConfig: function getMigratingConfig() {
      return {
        props: {
          'icon': 'icon is removed, use suffix-icon / prefix-icon instead.',
          'on-icon-click': 'on-icon-click is removed.'
        },
        events: {
          'click': 'click is removed.'
        }
      };
    },
    handleBlur: function handleBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.blur', [this.currentValue]);
      }
    },
    select: function select() {
      (this.$refs.input || this.$refs.textarea).select();
    },
    resizeTextarea: function resizeTextarea() {
      if (this.$isServer) return;
      var autosize = this.autosize,
          type = this.type;

      if (type !== 'textarea') return;
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: (0, _calcTextareaHeight2.default)(this.$refs.textarea).minHeight
        };
        return;
      }
      var minRows = autosize.minRows;
      var maxRows = autosize.maxRows;

      this.textareaCalcStyle = (0, _calcTextareaHeight2.default)(this.$refs.textarea, minRows, maxRows);
    },
    handleFocus: function handleFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    handleComposition: function handleComposition(event) {
      if (event.type === 'compositionend') {
        this.isOnComposition = false;
        this.currentValue = this.valueBeforeComposition;
        this.valueBeforeComposition = null;
        this.handleInput(event);
      } else {
        var text = event.target.value;
        var lastCharacter = text[text.length - 1] || '';
        this.isOnComposition = !(0, _shared.isKorean)(lastCharacter);
        if (this.isOnComposition && event.type === 'compositionstart') {
          this.valueBeforeComposition = text;
        }
      }
    },
    handleInput: function handleInput(event) {
      var value = event.target.value;
      this.setCurrentValue(value);
      if (this.isOnComposition) return;
      this.$emit('input', value);
    },
    handleChange: function handleChange(event) {
      this.$emit('change', event.target.value);
    },
    setCurrentValue: function setCurrentValue(value) {
      var _this = this;

      if (this.isOnComposition && value === this.valueBeforeComposition) return;
      this.currentValue = value;
      if (this.isOnComposition) return;
      this.$nextTick(function (_) {
        _this.resizeTextarea();
      });
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', [value]);
      }
    },
    calcIconOffset: function calcIconOffset(place) {
      var pendantMap = {
        'suf': 'append',
        'pre': 'prepend'
      };

      var pendant = pendantMap[place];

      if (this.$slots[pendant]) {
        return { transform: 'translateX(' + (place === 'suf' ? '-' : '') + this.$el.querySelector('.el-input-group__' + pendant).offsetWidth + 'px)' };
      }
    },
    clear: function clear() {
      this.$emit('input', '');
      this.$emit('change', '');
      this.$emit('clear');
      this.setCurrentValue('');
      this.focus();
    }
  },

  created: function created() {
    this.$on('inputSelect', this.select);
  },
  mounted: function mounted() {
    this.resizeTextarea();
    if (this.isGroup) {
      this.prefixOffset = this.calcIconOffset('pre');
      this.suffixOffset = this.calcIconOffset('suf');
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = calcTextareaHeight;
var hiddenTextarea = void 0;

var HIDDEN_STYLE = '\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n';

var CONTEXT_STYLE = ['letter-spacing', 'line-height', 'padding-top', 'padding-bottom', 'font-family', 'font-weight', 'font-size', 'text-rendering', 'text-transform', 'width', 'text-indent', 'padding-left', 'padding-right', 'border-width', 'box-sizing'];

function calculateNodeStyling(targetElement) {
  var style = window.getComputedStyle(targetElement);

  var boxSizing = style.getPropertyValue('box-sizing');

  var paddingSize = parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top'));

  var borderSize = parseFloat(style.getPropertyValue('border-bottom-width')) + parseFloat(style.getPropertyValue('border-top-width'));

  var contextStyle = CONTEXT_STYLE.map(function (name) {
    return name + ':' + style.getPropertyValue(name);
  }).join(';');

  return { contextStyle: contextStyle, paddingSize: paddingSize, borderSize: borderSize, boxSizing: boxSizing };
}

function calcTextareaHeight(targetElement) {
  var minRows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var maxRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  var _calculateNodeStyling = calculateNodeStyling(targetElement),
      paddingSize = _calculateNodeStyling.paddingSize,
      borderSize = _calculateNodeStyling.borderSize,
      boxSizing = _calculateNodeStyling.boxSizing,
      contextStyle = _calculateNodeStyling.contextStyle;

  hiddenTextarea.setAttribute('style', contextStyle + ';' + HIDDEN_STYLE);
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || '';

  var height = hiddenTextarea.scrollHeight;
  var result = {};

  if (boxSizing === 'border-box') {
    height = height + borderSize;
  } else if (boxSizing === 'content-box') {
    height = height - paddingSize;
  }

  hiddenTextarea.value = '';
  var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

  if (minRows !== null) {
    var minHeight = singleRowHeight * minRows;
    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize;
    }
    height = Math.max(minHeight, height);
    result.minHeight = minHeight + 'px';
  }
  if (maxRows !== null) {
    var maxHeight = singleRowHeight * maxRows;
    if (boxSizing === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.min(maxHeight, height);
  }
  result.height = height + 'px';
  hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea);
  hiddenTextarea = null;
  return result;
};

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[
  _vm.type === 'textarea' ? 'el-textarea' : 'el-input',
  _vm.inputSize ? 'el-input--' + _vm.inputSize : '',
  {
    'is-disabled': _vm.inputDisabled,
    'el-input-group': _vm.$slots.prepend || _vm.$slots.append,
    'el-input-group--append': _vm.$slots.append,
    'el-input-group--prepend': _vm.$slots.prepend,
    'el-input--prefix': _vm.$slots.prefix || _vm.prefixIcon,
    'el-input--suffix': _vm.$slots.suffix || _vm.suffixIcon || _vm.clearable
  }
  ],on:{"mouseenter":function($event){_vm.hovering = true},"mouseleave":function($event){_vm.hovering = false}}},[(_vm.type !== 'textarea')?[(_vm.$slots.prepend)?_c('div',{staticClass:"el-input-group__prepend"},[_vm._t("prepend")],2):_vm._e(),(_vm.type !== 'textarea')?_c('input',_vm._b({ref:"input",staticClass:"el-input__inner",attrs:{"tabindex":_vm.tabindex,"type":_vm.type,"disabled":_vm.inputDisabled,"autocomplete":_vm.autoComplete,"aria-label":_vm.label},domProps:{"value":_vm.currentValue},on:{"compositionstart":_vm.handleComposition,"compositionupdate":_vm.handleComposition,"compositionend":_vm.handleComposition,"input":_vm.handleInput,"focus":_vm.handleFocus,"blur":_vm.handleBlur,"change":_vm.handleChange}},'input',_vm.$attrs,false)):_vm._e(),(_vm.$slots.prefix || _vm.prefixIcon)?_c('span',{staticClass:"el-input__prefix",style:(_vm.prefixOffset)},[_vm._t("prefix"),(_vm.prefixIcon)?_c('i',{staticClass:"el-input__icon",class:_vm.prefixIcon}):_vm._e()],2):_vm._e(),(_vm.$slots.suffix || _vm.suffixIcon || _vm.showClear || _vm.validateState && _vm.needStatusIcon)?_c('span',{staticClass:"el-input__suffix",style:(_vm.suffixOffset)},[_c('span',{staticClass:"el-input__suffix-inner"},[(!_vm.showClear)?[_vm._t("suffix"),(_vm.suffixIcon)?_c('i',{staticClass:"el-input__icon",class:_vm.suffixIcon}):_vm._e()]:_c('i',{staticClass:"el-input__icon el-icon-circle-close el-input__clear",on:{"click":_vm.clear}})],2),(_vm.validateState)?_c('i',{staticClass:"el-input__icon",class:['el-input__validateIcon', _vm.validateIcon]}):_vm._e()]):_vm._e(),(_vm.$slots.append)?_c('div',{staticClass:"el-input-group__append"},[_vm._t("append")],2):_vm._e()]:_c('textarea',_vm._b({ref:"textarea",staticClass:"el-textarea__inner",style:(_vm.textareaStyle),attrs:{"tabindex":_vm.tabindex,"disabled":_vm.inputDisabled,"aria-label":_vm.label},domProps:{"value":_vm.currentValue},on:{"compositionstart":_vm.handleComposition,"compositionupdate":_vm.handleComposition,"compositionend":_vm.handleComposition,"input":_vm.handleInput,"focus":_vm.handleFocus,"blur":_vm.handleBlur,"change":_vm.handleChange}},'textarea',_vm.$attrs,false))],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

module.exports = __webpack_require__(35);

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = __webpack_require__(40);

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = __webpack_require__(41);

/***/ })

/******/ });

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * Show migrating guide in browser console.
 *
 * Usage:
 * import Migrating from 'element-ui/src/mixins/migrating';
 *
 * mixins: [Migrating]
 *
 * add getMigratingConfig method for your component.
 *  getMigratingConfig() {
 *    return {
 *      props: {
 *        'allow-no-selection': 'allow-no-selection is removed.',
 *        'selection-mode': 'selection-mode is removed.'
 *      },
 *      events: {
 *        selectionchange: 'selectionchange is renamed to selection-change.'
 *      }
 *    };
 *  },
 */
exports.default = {
  mounted: function mounted() {
    if (false) {}
    if (!this.$vnode) return;

    var _getMigratingConfig = this.getMigratingConfig(),
        _getMigratingConfig$p = _getMigratingConfig.props,
        props = _getMigratingConfig$p === undefined ? {} : _getMigratingConfig$p,
        _getMigratingConfig$e = _getMigratingConfig.events,
        events = _getMigratingConfig$e === undefined ? {} : _getMigratingConfig$e;

    var _$vnode = this.$vnode,
        data = _$vnode.data,
        componentOptions = _$vnode.componentOptions;

    var definedProps = data.attrs || {};
    var definedEvents = componentOptions.listeners || {};

    for (var propName in definedProps) {
      if (definedProps.hasOwnProperty(propName) && props[propName]) {
        console.warn('[Element Migrating][' + this.$options.name + '][Attribute]: ' + props[propName]);
      }
    }

    for (var eventName in definedEvents) {
      if (definedEvents.hasOwnProperty(eventName) && events[eventName]) {
        console.warn('[Element Migrating][' + this.$options.name + '][Event]: ' + events[eventName]);
      }
    }
  },

  methods: {
    getMigratingConfig: function getMigratingConfig() {
      return {
        props: {},
        events: {}
      };
    }
  }
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (target) {
  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments[i] || {};
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
};

;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _vue = __webpack_require__(18);

var _vue2 = _interopRequireDefault(_vue);

var _popup = __webpack_require__(43);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopperJS = _vue2.default.prototype.$isServer ? function () {} : __webpack_require__(45);
var stop = function stop(e) {
  return e.stopPropagation();
};

/**
 * @param {HTMLElement} [reference=$refs.reference] - The reference element used to position the popper.
 * @param {HTMLElement} [popper=$refs.popper] - The HTML element used as popper, or a configuration used to generate the popper.
 * @param {String} [placement=button] - Placement of the popper accepted values: top(-start, -end), right(-start, -end), bottom(-start, -end), left(-start, -end)
 * @param {Number} [offset=0] - Amount of pixels the popper will be shifted (can be negative).
 * @param {Boolean} [visible=false] Visibility of the popup element.
 * @param {Boolean} [visible-arrow=false] Visibility of the arrow, no style.
 */
exports.default = {
  props: {
    transformOrigin: {
      type: [Boolean, String],
      default: true
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    boundariesPadding: {
      type: Number,
      default: 5
    },
    reference: {},
    popper: {},
    offset: {
      default: 0
    },
    value: Boolean,
    visibleArrow: Boolean,
    arrowOffset: {
      type: Number,
      default: 35
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    popperOptions: {
      type: Object,
      default: function _default() {
        return {
          gpuAcceleration: false
        };
      }
    }
  },

  data: function data() {
    return {
      showPopper: false,
      currentPlacement: ''
    };
  },


  watch: {
    value: {
      immediate: true,
      handler: function handler(val) {
        this.showPopper = val;
        this.$emit('input', val);
      }
    },

    showPopper: function showPopper(val) {
      if (this.disabled) {
        return;
      }
      val ? this.updatePopper() : this.destroyPopper();
      this.$emit('input', val);
    }
  },

  methods: {
    createPopper: function createPopper() {
      var _this = this;

      if (this.$isServer) return;
      this.currentPlacement = this.currentPlacement || this.placement;
      if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement)) {
        return;
      }

      var options = this.popperOptions;
      var popper = this.popperElm = this.popperElm || this.popper || this.$refs.popper;
      var reference = this.referenceElm = this.referenceElm || this.reference || this.$refs.reference;

      if (!reference && this.$slots.reference && this.$slots.reference[0]) {
        reference = this.referenceElm = this.$slots.reference[0].elm;
      }

      if (!popper || !reference) return;
      if (this.visibleArrow) this.appendArrow(popper);
      if (this.appendToBody) document.body.appendChild(this.popperElm);
      if (this.popperJS && this.popperJS.destroy) {
        this.popperJS.destroy();
      }

      options.placement = this.currentPlacement;
      options.offset = this.offset;
      options.arrowOffset = this.arrowOffset;
      this.popperJS = new PopperJS(reference, popper, options);
      this.popperJS.onCreate(function (_) {
        _this.$emit('created', _this);
        _this.resetTransformOrigin();
        _this.$nextTick(_this.updatePopper);
      });
      if (typeof options.onUpdate === 'function') {
        this.popperJS.onUpdate(options.onUpdate);
      }
      this.popperJS._popper.style.zIndex = _popup.PopupManager.nextZIndex();
      this.popperElm.addEventListener('click', stop);
    },
    updatePopper: function updatePopper() {
      var popperJS = this.popperJS;
      if (popperJS) {
        popperJS.update();
        if (popperJS._popper) {
          popperJS._popper.style.zIndex = _popup.PopupManager.nextZIndex();
        }
      } else {
        this.createPopper();
      }
    },
    doDestroy: function doDestroy(forceDestroy) {
      /* istanbul ignore if */
      if (!this.popperJS || this.showPopper && !forceDestroy) return;
      this.popperJS.destroy();
      this.popperJS = null;
    },
    destroyPopper: function destroyPopper() {
      if (this.popperJS) {
        this.resetTransformOrigin();
      }
    },
    resetTransformOrigin: function resetTransformOrigin() {
      if (!this.transformOrigin) return;
      var placementMap = {
        top: 'bottom',
        bottom: 'top',
        left: 'right',
        right: 'left'
      };
      var placement = this.popperJS._popper.getAttribute('x-placement').split('-')[0];
      var origin = placementMap[placement];
      this.popperJS._popper.style.transformOrigin = typeof this.transformOrigin === 'string' ? this.transformOrigin : ['top', 'bottom'].indexOf(placement) > -1 ? 'center ' + origin : origin + ' center';
    },
    appendArrow: function appendArrow(element) {
      var hash = void 0;
      if (this.appended) {
        return;
      }

      this.appended = true;

      for (var item in element.attributes) {
        if (/^_v-/.test(element.attributes[item].name)) {
          hash = element.attributes[item].name;
          break;
        }
      }

      var arrow = document.createElement('div');

      if (hash) {
        arrow.setAttribute(hash, '');
      }
      arrow.setAttribute('x-arrow', '');
      arrow.className = 'popper__arrow';
      element.appendChild(arrow);
    }
  },

  beforeDestroy: function beforeDestroy() {
    this.doDestroy(true);
    if (this.popperElm && this.popperElm.parentNode === document.body) {
      this.popperElm.removeEventListener('click', stop);
      document.body.removeChild(this.popperElm);
    }
  },


  // call destroy in keep-alive mode
  deactivated: function deactivated() {
    this.$options.beforeDestroy[0].call(this);
  }
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.PopupManager = undefined;

var _vue = __webpack_require__(18);

var _vue2 = _interopRequireDefault(_vue);

var _merge = __webpack_require__(41);

var _merge2 = _interopRequireDefault(_merge);

var _popupManager = __webpack_require__(44);

var _popupManager2 = _interopRequireDefault(_popupManager);

var _scrollbarWidth = __webpack_require__(33);

var _scrollbarWidth2 = _interopRequireDefault(_scrollbarWidth);

var _dom = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var idSeed = 1;

var scrollBarWidth = void 0;

var getDOM = function getDOM(dom) {
  if (dom.nodeType === 3) {
    dom = dom.nextElementSibling || dom.nextSibling;
    getDOM(dom);
  }
  return dom;
};

exports.default = {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    openDelay: {},
    closeDelay: {},
    zIndex: {},
    modal: {
      type: Boolean,
      default: false
    },
    modalFade: {
      type: Boolean,
      default: true
    },
    modalClass: {},
    modalAppendToBody: {
      type: Boolean,
      default: false
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    }
  },

  beforeMount: function beforeMount() {
    this._popupId = 'popup-' + idSeed++;
    _popupManager2.default.register(this._popupId, this);
  },
  beforeDestroy: function beforeDestroy() {
    _popupManager2.default.deregister(this._popupId);
    _popupManager2.default.closeModal(this._popupId);

    this.restoreBodyStyle();
  },
  data: function data() {
    return {
      opened: false,
      bodyPaddingRight: null,
      computedBodyPaddingRight: 0,
      withoutHiddenClass: true,
      rendered: false
    };
  },


  watch: {
    visible: function visible(val) {
      var _this = this;

      if (val) {
        if (this._opening) return;
        if (!this.rendered) {
          this.rendered = true;
          _vue2.default.nextTick(function () {
            _this.open();
          });
        } else {
          this.open();
        }
      } else {
        this.close();
      }
    }
  },

  methods: {
    open: function open(options) {
      var _this2 = this;

      if (!this.rendered) {
        this.rendered = true;
      }

      var props = (0, _merge2.default)({}, this.$props || this, options);

      if (this._closeTimer) {
        clearTimeout(this._closeTimer);
        this._closeTimer = null;
      }
      clearTimeout(this._openTimer);

      var openDelay = Number(props.openDelay);
      if (openDelay > 0) {
        this._openTimer = setTimeout(function () {
          _this2._openTimer = null;
          _this2.doOpen(props);
        }, openDelay);
      } else {
        this.doOpen(props);
      }
    },
    doOpen: function doOpen(props) {
      if (this.$isServer) return;
      if (this.willOpen && !this.willOpen()) return;
      if (this.opened) return;

      this._opening = true;

      var dom = getDOM(this.$el);

      var modal = props.modal;

      var zIndex = props.zIndex;
      if (zIndex) {
        _popupManager2.default.zIndex = zIndex;
      }

      if (modal) {
        if (this._closing) {
          _popupManager2.default.closeModal(this._popupId);
          this._closing = false;
        }
        _popupManager2.default.openModal(this._popupId, _popupManager2.default.nextZIndex(), this.modalAppendToBody ? undefined : dom, props.modalClass, props.modalFade);
        if (props.lockScroll) {
          this.withoutHiddenClass = !(0, _dom.hasClass)(document.body, 'el-popup-parent--hidden');
          if (this.withoutHiddenClass) {
            this.bodyPaddingRight = document.body.style.paddingRight;
            this.computedBodyPaddingRight = parseInt((0, _dom.getStyle)(document.body, 'paddingRight'), 10);
          }
          scrollBarWidth = (0, _scrollbarWidth2.default)();
          var bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
          var bodyOverflowY = (0, _dom.getStyle)(document.body, 'overflowY');
          if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === 'scroll') && this.withoutHiddenClass) {
            document.body.style.paddingRight = this.computedBodyPaddingRight + scrollBarWidth + 'px';
          }
          (0, _dom.addClass)(document.body, 'el-popup-parent--hidden');
        }
      }

      if (getComputedStyle(dom).position === 'static') {
        dom.style.position = 'absolute';
      }

      dom.style.zIndex = _popupManager2.default.nextZIndex();
      this.opened = true;

      this.onOpen && this.onOpen();

      this.doAfterOpen();
    },
    doAfterOpen: function doAfterOpen() {
      this._opening = false;
    },
    close: function close() {
      var _this3 = this;

      if (this.willClose && !this.willClose()) return;

      if (this._openTimer !== null) {
        clearTimeout(this._openTimer);
        this._openTimer = null;
      }
      clearTimeout(this._closeTimer);

      var closeDelay = Number(this.closeDelay);

      if (closeDelay > 0) {
        this._closeTimer = setTimeout(function () {
          _this3._closeTimer = null;
          _this3.doClose();
        }, closeDelay);
      } else {
        this.doClose();
      }
    },
    doClose: function doClose() {
      this._closing = true;

      this.onClose && this.onClose();

      if (this.lockScroll) {
        setTimeout(this.restoreBodyStyle, 200);
      }

      this.opened = false;

      this.doAfterClose();
    },
    doAfterClose: function doAfterClose() {
      _popupManager2.default.closeModal(this._popupId);
      this._closing = false;
    },
    restoreBodyStyle: function restoreBodyStyle() {
      if (this.modal && this.withoutHiddenClass) {
        document.body.style.paddingRight = this.bodyPaddingRight;
        (0, _dom.removeClass)(document.body, 'el-popup-parent--hidden');
      }
      this.withoutHiddenClass = true;
    }
  }
};
exports.PopupManager = _popupManager2.default;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _vue = __webpack_require__(18);

var _vue2 = _interopRequireDefault(_vue);

var _dom = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasModal = false;
var hasInitZIndex = false;
var zIndex = 2000;

var getModal = function getModal() {
  if (_vue2.default.prototype.$isServer) return;
  var modalDom = PopupManager.modalDom;
  if (modalDom) {
    hasModal = true;
  } else {
    hasModal = false;
    modalDom = document.createElement('div');
    PopupManager.modalDom = modalDom;

    modalDom.addEventListener('touchmove', function (event) {
      event.preventDefault();
      event.stopPropagation();
    });

    modalDom.addEventListener('click', function () {
      PopupManager.doOnModalClick && PopupManager.doOnModalClick();
    });
  }

  return modalDom;
};

var instances = {};

var PopupManager = {
  modalFade: true,

  getInstance: function getInstance(id) {
    return instances[id];
  },

  register: function register(id, instance) {
    if (id && instance) {
      instances[id] = instance;
    }
  },

  deregister: function deregister(id) {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },

  nextZIndex: function nextZIndex() {
    return PopupManager.zIndex++;
  },

  modalStack: [],

  doOnModalClick: function doOnModalClick() {
    var topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topItem) return;

    var instance = PopupManager.getInstance(topItem.id);
    if (instance && instance.closeOnClickModal) {
      instance.close();
    }
  },

  openModal: function openModal(id, zIndex, dom, modalClass, modalFade) {
    if (_vue2.default.prototype.$isServer) return;
    if (!id || zIndex === undefined) return;
    this.modalFade = modalFade;

    var modalStack = this.modalStack;

    for (var i = 0, j = modalStack.length; i < j; i++) {
      var item = modalStack[i];
      if (item.id === id) {
        return;
      }
    }

    var modalDom = getModal();

    (0, _dom.addClass)(modalDom, 'v-modal');
    if (this.modalFade && !hasModal) {
      (0, _dom.addClass)(modalDom, 'v-modal-enter');
    }
    if (modalClass) {
      var classArr = modalClass.trim().split(/\s+/);
      classArr.forEach(function (item) {
        return (0, _dom.addClass)(modalDom, item);
      });
    }
    setTimeout(function () {
      (0, _dom.removeClass)(modalDom, 'v-modal-enter');
    }, 200);

    if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
      dom.parentNode.appendChild(modalDom);
    } else {
      document.body.appendChild(modalDom);
    }

    if (zIndex) {
      modalDom.style.zIndex = zIndex;
    }
    modalDom.tabIndex = 0;
    modalDom.style.display = '';

    this.modalStack.push({ id: id, zIndex: zIndex, modalClass: modalClass });
  },

  closeModal: function closeModal(id) {
    var modalStack = this.modalStack;
    var modalDom = getModal();

    if (modalStack.length > 0) {
      var topItem = modalStack[modalStack.length - 1];
      if (topItem.id === id) {
        if (topItem.modalClass) {
          var classArr = topItem.modalClass.trim().split(/\s+/);
          classArr.forEach(function (item) {
            return (0, _dom.removeClass)(modalDom, item);
          });
        }

        modalStack.pop();
        if (modalStack.length > 0) {
          modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
        }
      } else {
        for (var i = modalStack.length - 1; i >= 0; i--) {
          if (modalStack[i].id === id) {
            modalStack.splice(i, 1);
            break;
          }
        }
      }
    }

    if (modalStack.length === 0) {
      if (this.modalFade) {
        (0, _dom.addClass)(modalDom, 'v-modal-leave');
      }
      setTimeout(function () {
        if (modalStack.length === 0) {
          if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
          modalDom.style.display = 'none';
          PopupManager.modalDom = undefined;
        }
        (0, _dom.removeClass)(modalDom, 'v-modal-leave');
      }, 200);
    }
  }
};

Object.defineProperty(PopupManager, 'zIndex', {
  configurable: true,
  get: function get() {
    if (!hasInitZIndex) {
      zIndex = (_vue2.default.prototype.$ELEMENT || {}).zIndex || zIndex;
      hasInitZIndex = true;
    }
    return zIndex;
  },
  set: function set(value) {
    zIndex = value;
  }
});

var getTopPopup = function getTopPopup() {
  if (_vue2.default.prototype.$isServer) return;
  if (PopupManager.modalStack.length > 0) {
    var topPopup = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topPopup) return;
    var instance = PopupManager.getInstance(topPopup.id);

    return instance;
  }
};

if (!_vue2.default.prototype.$isServer) {
  // handle `esc` key when the popup is shown
  window.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      var topPopup = getTopPopup();

      if (topPopup && topPopup.closeOnPressEscape) {
        topPopup.handleClose ? topPopup.handleClose() : topPopup.handleAction ? topPopup.handleAction('cancel') : topPopup.close();
      }
    }
  });
}

exports.default = PopupManager;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version {{version}}
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

//
// Cross module loader
// Supported: Node, AMD, Browser globals
//
;(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})(undefined, function () {

    'use strict';

    var root = window;

    // default options
    var DEFAULTS = {
        // placement of the popper
        placement: 'bottom',

        gpuAcceleration: true,

        // shift popper from its origin by the given amount of pixels (can be negative)
        offset: 0,

        // the element which will act as boundary of the popper
        boundariesElement: 'viewport',

        // amount of pixel used to define a minimum distance between the boundaries and the popper
        boundariesPadding: 5,

        // popper will try to prevent overflow following this order,
        // by default, then, it could overflow on the left and on top of the boundariesElement
        preventOverflowOrder: ['left', 'right', 'top', 'bottom'],

        // the behavior used by flip to change the placement of the popper
        flipBehavior: 'flip',

        arrowElement: '[x-arrow]',

        arrowOffset: 0,

        // list of functions used to modify the offsets before they are applied to the popper
        modifiers: ['shift', 'offset', 'preventOverflow', 'keepTogether', 'arrow', 'flip', 'applyStyle'],

        modifiersIgnored: [],

        forceAbsolute: false
    };

    /**
     * Create a new Popper.js instance
     * @constructor Popper
     * @param {HTMLElement} reference - The reference element used to position the popper
     * @param {HTMLElement|Object} popper
     *      The HTML element used as popper, or a configuration used to generate the popper.
     * @param {String} [popper.tagName='div'] The tag name of the generated popper.
     * @param {Array} [popper.classNames=['popper']] Array of classes to apply to the generated popper.
     * @param {Array} [popper.attributes] Array of attributes to apply, specify `attr:value` to assign a value to it.
     * @param {HTMLElement|String} [popper.parent=window.document.body] The parent element, given as HTMLElement or as query string.
     * @param {String} [popper.content=''] The content of the popper, it can be text, html, or node; if it is not text, set `contentType` to `html` or `node`.
     * @param {String} [popper.contentType='text'] If `html`, the `content` will be parsed as HTML. If `node`, it will be appended as-is.
     * @param {String} [popper.arrowTagName='div'] Same as `popper.tagName` but for the arrow element.
     * @param {Array} [popper.arrowClassNames='popper__arrow'] Same as `popper.classNames` but for the arrow element.
     * @param {String} [popper.arrowAttributes=['x-arrow']] Same as `popper.attributes` but for the arrow element.
     * @param {Object} options
     * @param {String} [options.placement=bottom]
     *      Placement of the popper accepted values: `top(-start, -end), right(-start, -end), bottom(-start, -right),
     *      left(-start, -end)`
     *
     * @param {HTMLElement|String} [options.arrowElement='[x-arrow]']
     *      The DOM Node used as arrow for the popper, or a CSS selector used to get the DOM node. It must be child of
     *      its parent Popper. Popper.js will apply to the given element the style required to align the arrow with its
     *      reference element.
     *      By default, it will look for a child node of the popper with the `x-arrow` attribute.
     *
     * @param {Boolean} [options.gpuAcceleration=true]
     *      When this property is set to true, the popper position will be applied using CSS3 translate3d, allowing the
     *      browser to use the GPU to accelerate the rendering.
     *      If set to false, the popper will be placed using `top` and `left` properties, not using the GPU.
     *
     * @param {Number} [options.offset=0]
     *      Amount of pixels the popper will be shifted (can be negative).
     *
     * @param {String|Element} [options.boundariesElement='viewport']
     *      The element which will define the boundaries of the popper position, the popper will never be placed outside
     *      of the defined boundaries (except if `keepTogether` is enabled)
     *
     * @param {Number} [options.boundariesPadding=5]
     *      Additional padding for the boundaries
     *
     * @param {Array} [options.preventOverflowOrder=['left', 'right', 'top', 'bottom']]
     *      Order used when Popper.js tries to avoid overflows from the boundaries, they will be checked in order,
     *      this means that the last ones will never overflow
     *
     * @param {String|Array} [options.flipBehavior='flip']
     *      The behavior used by the `flip` modifier to change the placement of the popper when the latter is trying to
     *      overlap its reference element. Defining `flip` as value, the placement will be flipped on
     *      its axis (`right - left`, `top - bottom`).
     *      You can even pass an array of placements (eg: `['right', 'left', 'top']` ) to manually specify
     *      how alter the placement when a flip is needed. (eg. in the above example, it would first flip from right to left,
     *      then, if even in its new placement, the popper is overlapping its reference element, it will be moved to top)
     *
     * @param {Array} [options.modifiers=[ 'shift', 'offset', 'preventOverflow', 'keepTogether', 'arrow', 'flip', 'applyStyle']]
     *      List of functions used to modify the data before they are applied to the popper, add your custom functions
     *      to this array to edit the offsets and placement.
     *      The function should reflect the @params and @returns of preventOverflow
     *
     * @param {Array} [options.modifiersIgnored=[]]
     *      Put here any built-in modifier name you want to exclude from the modifiers list
     *      The function should reflect the @params and @returns of preventOverflow
     *
     * @param {Boolean} [options.removeOnDestroy=false]
     *      Set to true if you want to automatically remove the popper when you call the `destroy` method.
     */
    function Popper(reference, popper, options) {
        this._reference = reference.jquery ? reference[0] : reference;
        this.state = {};

        // if the popper variable is a configuration object, parse it to generate an HTMLElement
        // generate a default popper if is not defined
        var isNotDefined = typeof popper === 'undefined' || popper === null;
        var isConfig = popper && Object.prototype.toString.call(popper) === '[object Object]';
        if (isNotDefined || isConfig) {
            this._popper = this.parse(isConfig ? popper : {});
        }
        // otherwise, use the given HTMLElement as popper
        else {
                this._popper = popper.jquery ? popper[0] : popper;
            }

        // with {} we create a new object with the options inside it
        this._options = Object.assign({}, DEFAULTS, options);

        // refactoring modifiers' list
        this._options.modifiers = this._options.modifiers.map(function (modifier) {
            // remove ignored modifiers
            if (this._options.modifiersIgnored.indexOf(modifier) !== -1) return;

            // set the x-placement attribute before everything else because it could be used to add margins to the popper
            // margins needs to be calculated to get the correct popper offsets
            if (modifier === 'applyStyle') {
                this._popper.setAttribute('x-placement', this._options.placement);
            }

            // return predefined modifier identified by string or keep the custom one
            return this.modifiers[modifier] || modifier;
        }.bind(this));

        // make sure to apply the popper position before any computation
        this.state.position = this._getPosition(this._popper, this._reference);
        setStyle(this._popper, { position: this.state.position, top: 0 });

        // fire the first update to position the popper in the right place
        this.update();

        // setup event listeners, they will take care of update the position in specific situations
        this._setupEventListeners();
        return this;
    }

    //
    // Methods
    //
    /**
     * Destroy the popper
     * @method
     * @memberof Popper
     */
    Popper.prototype.destroy = function () {
        this._popper.removeAttribute('x-placement');
        this._popper.style.left = '';
        this._popper.style.position = '';
        this._popper.style.top = '';
        this._popper.style[getSupportedPropertyName('transform')] = '';
        this._removeEventListeners();

        // remove the popper if user explicity asked for the deletion on destroy
        if (this._options.removeOnDestroy) {
            this._popper.remove();
        }
        return this;
    };

    /**
     * Updates the position of the popper, computing the new offsets and applying the new style
     * @method
     * @memberof Popper
     */
    Popper.prototype.update = function () {
        var data = { instance: this, styles: {} };

        // store placement inside the data object, modifiers will be able to edit `placement` if needed
        // and refer to _originalPlacement to know the original value
        data.placement = this._options.placement;
        data._originalPlacement = this._options.placement;

        // compute the popper and reference offsets and put them inside data.offsets
        data.offsets = this._getOffsets(this._popper, this._reference, data.placement);

        // get boundaries
        data.boundaries = this._getBoundaries(data, this._options.boundariesPadding, this._options.boundariesElement);

        data = this.runModifiers(data, this._options.modifiers);

        if (typeof this.state.updateCallback === 'function') {
            this.state.updateCallback(data);
        }
    };

    /**
     * If a function is passed, it will be executed after the initialization of popper with as first argument the Popper instance.
     * @method
     * @memberof Popper
     * @param {Function} callback
     */
    Popper.prototype.onCreate = function (callback) {
        // the createCallbacks return as first argument the popper instance
        callback(this);
        return this;
    };

    /**
     * If a function is passed, it will be executed after each update of popper with as first argument the set of coordinates and informations
     * used to style popper and its arrow.
     * NOTE: it doesn't get fired on the first call of the `Popper.update()` method inside the `Popper` constructor!
     * @method
     * @memberof Popper
     * @param {Function} callback
     */
    Popper.prototype.onUpdate = function (callback) {
        this.state.updateCallback = callback;
        return this;
    };

    /**
     * Helper used to generate poppers from a configuration file
     * @method
     * @memberof Popper
     * @param config {Object} configuration
     * @returns {HTMLElement} popper
     */
    Popper.prototype.parse = function (config) {
        var defaultConfig = {
            tagName: 'div',
            classNames: ['popper'],
            attributes: [],
            parent: root.document.body,
            content: '',
            contentType: 'text',
            arrowTagName: 'div',
            arrowClassNames: ['popper__arrow'],
            arrowAttributes: ['x-arrow']
        };
        config = Object.assign({}, defaultConfig, config);

        var d = root.document;

        var popper = d.createElement(config.tagName);
        addClassNames(popper, config.classNames);
        addAttributes(popper, config.attributes);
        if (config.contentType === 'node') {
            popper.appendChild(config.content.jquery ? config.content[0] : config.content);
        } else if (config.contentType === 'html') {
            popper.innerHTML = config.content;
        } else {
            popper.textContent = config.content;
        }

        if (config.arrowTagName) {
            var arrow = d.createElement(config.arrowTagName);
            addClassNames(arrow, config.arrowClassNames);
            addAttributes(arrow, config.arrowAttributes);
            popper.appendChild(arrow);
        }

        var parent = config.parent.jquery ? config.parent[0] : config.parent;

        // if the given parent is a string, use it to match an element
        // if more than one element is matched, the first one will be used as parent
        // if no elements are matched, the script will throw an error
        if (typeof parent === 'string') {
            parent = d.querySelectorAll(config.parent);
            if (parent.length > 1) {
                console.warn('WARNING: the given `parent` query(' + config.parent + ') matched more than one element, the first one will be used');
            }
            if (parent.length === 0) {
                throw 'ERROR: the given `parent` doesn\'t exists!';
            }
            parent = parent[0];
        }
        // if the given parent is a DOM nodes list or an array of nodes with more than one element,
        // the first one will be used as parent
        if (parent.length > 1 && parent instanceof Element === false) {
            console.warn('WARNING: you have passed as parent a list of elements, the first one will be used');
            parent = parent[0];
        }

        // append the generated popper to its parent
        parent.appendChild(popper);

        return popper;

        /**
         * Adds class names to the given element
         * @function
         * @ignore
         * @param {HTMLElement} target
         * @param {Array} classes
         */
        function addClassNames(element, classNames) {
            classNames.forEach(function (className) {
                element.classList.add(className);
            });
        }

        /**
         * Adds attributes to the given element
         * @function
         * @ignore
         * @param {HTMLElement} target
         * @param {Array} attributes
         * @example
         * addAttributes(element, [ 'data-info:foobar' ]);
         */
        function addAttributes(element, attributes) {
            attributes.forEach(function (attribute) {
                element.setAttribute(attribute.split(':')[0], attribute.split(':')[1] || '');
            });
        }
    };

    /**
     * Helper used to get the position which will be applied to the popper
     * @method
     * @memberof Popper
     * @param config {HTMLElement} popper element
     * @param reference {HTMLElement} reference element
     * @returns {String} position
     */
    Popper.prototype._getPosition = function (popper, reference) {
        var container = getOffsetParent(reference);

        if (this._options.forceAbsolute) {
            return 'absolute';
        }

        // Decide if the popper will be fixed
        // If the reference element is inside a fixed context, the popper will be fixed as well to allow them to scroll together
        var isParentFixed = isFixed(reference, container);
        return isParentFixed ? 'fixed' : 'absolute';
    };

    /**
     * Get offsets to the popper
     * @method
     * @memberof Popper
     * @access private
     * @param {Element} popper - the popper element
     * @param {Element} reference - the reference element (the popper will be relative to this)
     * @returns {Object} An object containing the offsets which will be applied to the popper
     */
    Popper.prototype._getOffsets = function (popper, reference, placement) {
        placement = placement.split('-')[0];
        var popperOffsets = {};

        popperOffsets.position = this.state.position;
        var isParentFixed = popperOffsets.position === 'fixed';

        //
        // Get reference element position
        //
        var referenceOffsets = getOffsetRectRelativeToCustomParent(reference, getOffsetParent(popper), isParentFixed);

        //
        // Get popper sizes
        //
        var popperRect = getOuterSizes(popper);

        //
        // Compute offsets of popper
        //

        // depending by the popper placement we have to compute its offsets slightly differently
        if (['right', 'left'].indexOf(placement) !== -1) {
            popperOffsets.top = referenceOffsets.top + referenceOffsets.height / 2 - popperRect.height / 2;
            if (placement === 'left') {
                popperOffsets.left = referenceOffsets.left - popperRect.width;
            } else {
                popperOffsets.left = referenceOffsets.right;
            }
        } else {
            popperOffsets.left = referenceOffsets.left + referenceOffsets.width / 2 - popperRect.width / 2;
            if (placement === 'top') {
                popperOffsets.top = referenceOffsets.top - popperRect.height;
            } else {
                popperOffsets.top = referenceOffsets.bottom;
            }
        }

        // Add width and height to our offsets object
        popperOffsets.width = popperRect.width;
        popperOffsets.height = popperRect.height;

        return {
            popper: popperOffsets,
            reference: referenceOffsets
        };
    };

    /**
     * Setup needed event listeners used to update the popper position
     * @method
     * @memberof Popper
     * @access private
     */
    Popper.prototype._setupEventListeners = function () {
        // NOTE: 1 DOM access here
        this.state.updateBound = this.update.bind(this);
        root.addEventListener('resize', this.state.updateBound);
        // if the boundariesElement is window we don't need to listen for the scroll event
        if (this._options.boundariesElement !== 'window') {
            var target = getScrollParent(this._reference);
            // here it could be both `body` or `documentElement` thanks to Firefox, we then check both
            if (target === root.document.body || target === root.document.documentElement) {
                target = root;
            }
            target.addEventListener('scroll', this.state.updateBound);
            this.state.scrollTarget = target;
        }
    };

    /**
     * Remove event listeners used to update the popper position
     * @method
     * @memberof Popper
     * @access private
     */
    Popper.prototype._removeEventListeners = function () {
        // NOTE: 1 DOM access here
        root.removeEventListener('resize', this.state.updateBound);
        if (this._options.boundariesElement !== 'window' && this.state.scrollTarget) {
            this.state.scrollTarget.removeEventListener('scroll', this.state.updateBound);
            this.state.scrollTarget = null;
        }
        this.state.updateBound = null;
    };

    /**
     * Computed the boundaries limits and return them
     * @method
     * @memberof Popper
     * @access private
     * @param {Object} data - Object containing the property "offsets" generated by `_getOffsets`
     * @param {Number} padding - Boundaries padding
     * @param {Element} boundariesElement - Element used to define the boundaries
     * @returns {Object} Coordinates of the boundaries
     */
    Popper.prototype._getBoundaries = function (data, padding, boundariesElement) {
        // NOTE: 1 DOM access here
        var boundaries = {};
        var width, height;
        if (boundariesElement === 'window') {
            var body = root.document.body,
                html = root.document.documentElement;

            height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);

            boundaries = {
                top: 0,
                right: width,
                bottom: height,
                left: 0
            };
        } else if (boundariesElement === 'viewport') {
            var offsetParent = getOffsetParent(this._popper);
            var scrollParent = getScrollParent(this._popper);
            var offsetParentRect = getOffsetRect(offsetParent);

            // Thanks the fucking native API, `document.body.scrollTop` & `document.documentElement.scrollTop`
            var getScrollTopValue = function getScrollTopValue(element) {
                return element == document.body ? Math.max(document.documentElement.scrollTop, document.body.scrollTop) : element.scrollTop;
            };
            var getScrollLeftValue = function getScrollLeftValue(element) {
                return element == document.body ? Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) : element.scrollLeft;
            };

            // if the popper is fixed we don't have to substract scrolling from the boundaries
            var scrollTop = data.offsets.popper.position === 'fixed' ? 0 : getScrollTopValue(scrollParent);
            var scrollLeft = data.offsets.popper.position === 'fixed' ? 0 : getScrollLeftValue(scrollParent);

            boundaries = {
                top: 0 - (offsetParentRect.top - scrollTop),
                right: root.document.documentElement.clientWidth - (offsetParentRect.left - scrollLeft),
                bottom: root.document.documentElement.clientHeight - (offsetParentRect.top - scrollTop),
                left: 0 - (offsetParentRect.left - scrollLeft)
            };
        } else {
            if (getOffsetParent(this._popper) === boundariesElement) {
                boundaries = {
                    top: 0,
                    left: 0,
                    right: boundariesElement.clientWidth,
                    bottom: boundariesElement.clientHeight
                };
            } else {
                boundaries = getOffsetRect(boundariesElement);
            }
        }
        boundaries.left += padding;
        boundaries.right -= padding;
        boundaries.top = boundaries.top + padding;
        boundaries.bottom = boundaries.bottom - padding;
        return boundaries;
    };

    /**
     * Loop trough the list of modifiers and run them in order, each of them will then edit the data object
     * @method
     * @memberof Popper
     * @access public
     * @param {Object} data
     * @param {Array} modifiers
     * @param {Function} ends
     */
    Popper.prototype.runModifiers = function (data, modifiers, ends) {
        var modifiersToRun = modifiers.slice();
        if (ends !== undefined) {
            modifiersToRun = this._options.modifiers.slice(0, getArrayKeyIndex(this._options.modifiers, ends));
        }

        modifiersToRun.forEach(function (modifier) {
            if (isFunction(modifier)) {
                data = modifier.call(this, data);
            }
        }.bind(this));

        return data;
    };

    /**
     * Helper used to know if the given modifier depends from another one.
     * @method
     * @memberof Popper
     * @param {String} requesting - name of requesting modifier
     * @param {String} requested - name of requested modifier
     * @returns {Boolean}
     */
    Popper.prototype.isModifierRequired = function (requesting, requested) {
        var index = getArrayKeyIndex(this._options.modifiers, requesting);
        return !!this._options.modifiers.slice(0, index).filter(function (modifier) {
            return modifier === requested;
        }).length;
    };

    //
    // Modifiers
    //

    /**
     * Modifiers list
     * @namespace Popper.modifiers
     * @memberof Popper
     * @type {Object}
     */
    Popper.prototype.modifiers = {};

    /**
     * Apply the computed styles to the popper element
     * @method
     * @memberof Popper.modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @returns {Object} The same data object
     */
    Popper.prototype.modifiers.applyStyle = function (data) {
        // apply the final offsets to the popper
        // NOTE: 1 DOM access here
        var styles = {
            position: data.offsets.popper.position
        };

        // round top and left to avoid blurry text
        var left = Math.round(data.offsets.popper.left);
        var top = Math.round(data.offsets.popper.top);

        // if gpuAcceleration is set to true and transform is supported, we use `translate3d` to apply the position to the popper
        // we automatically use the supported prefixed version if needed
        var prefixedProperty;
        if (this._options.gpuAcceleration && (prefixedProperty = getSupportedPropertyName('transform'))) {
            styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
            styles.top = 0;
            styles.left = 0;
        }
        // othwerise, we use the standard `left` and `top` properties
        else {
                styles.left = left;
                styles.top = top;
            }

        // any property present in `data.styles` will be applied to the popper,
        // in this way we can make the 3rd party modifiers add custom styles to it
        // Be aware, modifiers could override the properties defined in the previous
        // lines of this modifier!
        Object.assign(styles, data.styles);

        setStyle(this._popper, styles);

        // set an attribute which will be useful to style the tooltip (use it to properly position its arrow)
        // NOTE: 1 DOM access here
        this._popper.setAttribute('x-placement', data.placement);

        // if the arrow modifier is required and the arrow style has been computed, apply the arrow style
        if (this.isModifierRequired(this.modifiers.applyStyle, this.modifiers.arrow) && data.offsets.arrow) {
            setStyle(data.arrowElement, data.offsets.arrow);
        }

        return data;
    };

    /**
     * Modifier used to shift the popper on the start or end of its reference element side
     * @method
     * @memberof Popper.modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @returns {Object} The data object, properly modified
     */
    Popper.prototype.modifiers.shift = function (data) {
        var placement = data.placement;
        var basePlacement = placement.split('-')[0];
        var shiftVariation = placement.split('-')[1];

        // if shift shiftVariation is specified, run the modifier
        if (shiftVariation) {
            var reference = data.offsets.reference;
            var popper = getPopperClientRect(data.offsets.popper);

            var shiftOffsets = {
                y: {
                    start: { top: reference.top },
                    end: { top: reference.top + reference.height - popper.height }
                },
                x: {
                    start: { left: reference.left },
                    end: { left: reference.left + reference.width - popper.width }
                }
            };

            var axis = ['bottom', 'top'].indexOf(basePlacement) !== -1 ? 'x' : 'y';

            data.offsets.popper = Object.assign(popper, shiftOffsets[axis][shiftVariation]);
        }

        return data;
    };

    /**
     * Modifier used to make sure the popper does not overflows from it's boundaries
     * @method
     * @memberof Popper.modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @returns {Object} The data object, properly modified
     */
    Popper.prototype.modifiers.preventOverflow = function (data) {
        var order = this._options.preventOverflowOrder;
        var popper = getPopperClientRect(data.offsets.popper);

        var check = {
            left: function left() {
                var left = popper.left;
                if (popper.left < data.boundaries.left) {
                    left = Math.max(popper.left, data.boundaries.left);
                }
                return { left: left };
            },
            right: function right() {
                var left = popper.left;
                if (popper.right > data.boundaries.right) {
                    left = Math.min(popper.left, data.boundaries.right - popper.width);
                }
                return { left: left };
            },
            top: function top() {
                var top = popper.top;
                if (popper.top < data.boundaries.top) {
                    top = Math.max(popper.top, data.boundaries.top);
                }
                return { top: top };
            },
            bottom: function bottom() {
                var top = popper.top;
                if (popper.bottom > data.boundaries.bottom) {
                    top = Math.min(popper.top, data.boundaries.bottom - popper.height);
                }
                return { top: top };
            }
        };

        order.forEach(function (direction) {
            data.offsets.popper = Object.assign(popper, check[direction]());
        });

        return data;
    };

    /**
     * Modifier used to make sure the popper is always near its reference
     * @method
     * @memberof Popper.modifiers
     * @argument {Object} data - The data object generated by _update method
     * @returns {Object} The data object, properly modified
     */
    Popper.prototype.modifiers.keepTogether = function (data) {
        var popper = getPopperClientRect(data.offsets.popper);
        var reference = data.offsets.reference;
        var f = Math.floor;

        if (popper.right < f(reference.left)) {
            data.offsets.popper.left = f(reference.left) - popper.width;
        }
        if (popper.left > f(reference.right)) {
            data.offsets.popper.left = f(reference.right);
        }
        if (popper.bottom < f(reference.top)) {
            data.offsets.popper.top = f(reference.top) - popper.height;
        }
        if (popper.top > f(reference.bottom)) {
            data.offsets.popper.top = f(reference.bottom);
        }

        return data;
    };

    /**
     * Modifier used to flip the placement of the popper when the latter is starting overlapping its reference element.
     * Requires the `preventOverflow` modifier before it in order to work.
     * **NOTE:** This modifier will run all its previous modifiers everytime it tries to flip the popper!
     * @method
     * @memberof Popper.modifiers
     * @argument {Object} data - The data object generated by _update method
     * @returns {Object} The data object, properly modified
     */
    Popper.prototype.modifiers.flip = function (data) {
        // check if preventOverflow is in the list of modifiers before the flip modifier.
        // otherwise flip would not work as expected.
        if (!this.isModifierRequired(this.modifiers.flip, this.modifiers.preventOverflow)) {
            console.warn('WARNING: preventOverflow modifier is required by flip modifier in order to work, be sure to include it before flip!');
            return data;
        }

        if (data.flipped && data.placement === data._originalPlacement) {
            // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
            return data;
        }

        var placement = data.placement.split('-')[0];
        var placementOpposite = getOppositePlacement(placement);
        var variation = data.placement.split('-')[1] || '';

        var flipOrder = [];
        if (this._options.flipBehavior === 'flip') {
            flipOrder = [placement, placementOpposite];
        } else {
            flipOrder = this._options.flipBehavior;
        }

        flipOrder.forEach(function (step, index) {
            if (placement !== step || flipOrder.length === index + 1) {
                return;
            }

            placement = data.placement.split('-')[0];
            placementOpposite = getOppositePlacement(placement);

            var popperOffsets = getPopperClientRect(data.offsets.popper);

            // this boolean is used to distinguish right and bottom from top and left
            // they need different computations to get flipped
            var a = ['right', 'bottom'].indexOf(placement) !== -1;

            // using Math.floor because the reference offsets may contain decimals we are not going to consider here
            if (a && Math.floor(data.offsets.reference[placement]) > Math.floor(popperOffsets[placementOpposite]) || !a && Math.floor(data.offsets.reference[placement]) < Math.floor(popperOffsets[placementOpposite])) {
                // we'll use this boolean to detect any flip loop
                data.flipped = true;
                data.placement = flipOrder[index + 1];
                if (variation) {
                    data.placement += '-' + variation;
                }
                data.offsets.popper = this._getOffsets(this._popper, this._reference, data.placement).popper;

                data = this.runModifiers(data, this._options.modifiers, this._flip);
            }
        }.bind(this));
        return data;
    };

    /**
     * Modifier used to add an offset to the popper, useful if you more granularity positioning your popper.
     * The offsets will shift the popper on the side of its reference element.
     * @method
     * @memberof Popper.modifiers
     * @argument {Object} data - The data object generated by _update method
     * @returns {Object} The data object, properly modified
     */
    Popper.prototype.modifiers.offset = function (data) {
        var offset = this._options.offset;
        var popper = data.offsets.popper;

        if (data.placement.indexOf('left') !== -1) {
            popper.top -= offset;
        } else if (data.placement.indexOf('right') !== -1) {
            popper.top += offset;
        } else if (data.placement.indexOf('top') !== -1) {
            popper.left -= offset;
        } else if (data.placement.indexOf('bottom') !== -1) {
            popper.left += offset;
        }
        return data;
    };

    /**
     * Modifier used to move the arrows on the edge of the popper to make sure them are always between the popper and the reference element
     * It will use the CSS outer size of the arrow element to know how many pixels of conjuction are needed
     * @method
     * @memberof Popper.modifiers
     * @argument {Object} data - The data object generated by _update method
     * @returns {Object} The data object, properly modified
     */
    Popper.prototype.modifiers.arrow = function (data) {
        var arrow = this._options.arrowElement;
        var arrowOffset = this._options.arrowOffset;

        // if the arrowElement is a string, suppose it's a CSS selector
        if (typeof arrow === 'string') {
            arrow = this._popper.querySelector(arrow);
        }

        // if arrow element is not found, don't run the modifier
        if (!arrow) {
            return data;
        }

        // the arrow element must be child of its popper
        if (!this._popper.contains(arrow)) {
            console.warn('WARNING: `arrowElement` must be child of its popper element!');
            return data;
        }

        // arrow depends on keepTogether in order to work
        if (!this.isModifierRequired(this.modifiers.arrow, this.modifiers.keepTogether)) {
            console.warn('WARNING: keepTogether modifier is required by arrow modifier in order to work, be sure to include it before arrow!');
            return data;
        }

        var arrowStyle = {};
        var placement = data.placement.split('-')[0];
        var popper = getPopperClientRect(data.offsets.popper);
        var reference = data.offsets.reference;
        var isVertical = ['left', 'right'].indexOf(placement) !== -1;

        var len = isVertical ? 'height' : 'width';
        var side = isVertical ? 'top' : 'left';
        var translate = isVertical ? 'translateY' : 'translateX';
        var altSide = isVertical ? 'left' : 'top';
        var opSide = isVertical ? 'bottom' : 'right';
        var arrowSize = getOuterSizes(arrow)[len];

        //
        // extends keepTogether behavior making sure the popper and its reference have enough pixels in conjuction
        //

        // top/left side
        if (reference[opSide] - arrowSize < popper[side]) {
            data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowSize);
        }
        // bottom/right side
        if (reference[side] + arrowSize > popper[opSide]) {
            data.offsets.popper[side] += reference[side] + arrowSize - popper[opSide];
        }

        // compute center of the popper
        var center = reference[side] + (arrowOffset || reference[len] / 2 - arrowSize / 2);

        var sideValue = center - popper[side];

        // prevent arrow from being placed not contiguously to its popper
        sideValue = Math.max(Math.min(popper[len] - arrowSize - 8, sideValue), 8);
        arrowStyle[side] = sideValue;
        arrowStyle[altSide] = ''; // make sure to remove any old style from the arrow

        data.offsets.arrow = arrowStyle;
        data.arrowElement = arrow;

        return data;
    };

    //
    // Helpers
    //

    /**
     * Get the outer sizes of the given element (offset size + margins)
     * @function
     * @ignore
     * @argument {Element} element
     * @returns {Object} object containing width and height properties
     */
    function getOuterSizes(element) {
        // NOTE: 1 DOM access here
        var _display = element.style.display,
            _visibility = element.style.visibility;
        element.style.display = 'block';element.style.visibility = 'hidden';
        var calcWidthToForceRepaint = element.offsetWidth;

        // original method
        var styles = root.getComputedStyle(element);
        var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
        var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
        var result = { width: element.offsetWidth + y, height: element.offsetHeight + x };

        // reset element styles
        element.style.display = _display;element.style.visibility = _visibility;
        return result;
    }

    /**
     * Get the opposite placement of the given one/
     * @function
     * @ignore
     * @argument {String} placement
     * @returns {String} flipped placement
     */
    function getOppositePlacement(placement) {
        var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
        return placement.replace(/left|right|bottom|top/g, function (matched) {
            return hash[matched];
        });
    }

    /**
     * Given the popper offsets, generate an output similar to getBoundingClientRect
     * @function
     * @ignore
     * @argument {Object} popperOffsets
     * @returns {Object} ClientRect like output
     */
    function getPopperClientRect(popperOffsets) {
        var offsets = Object.assign({}, popperOffsets);
        offsets.right = offsets.left + offsets.width;
        offsets.bottom = offsets.top + offsets.height;
        return offsets;
    }

    /**
     * Given an array and the key to find, returns its index
     * @function
     * @ignore
     * @argument {Array} arr
     * @argument keyToFind
     * @returns index or null
     */
    function getArrayKeyIndex(arr, keyToFind) {
        var i = 0,
            key;
        for (key in arr) {
            if (arr[key] === keyToFind) {
                return i;
            }
            i++;
        }
        return null;
    }

    /**
     * Get CSS computed property of the given element
     * @function
     * @ignore
     * @argument {Eement} element
     * @argument {String} property
     */
    function getStyleComputedProperty(element, property) {
        // NOTE: 1 DOM access here
        var css = root.getComputedStyle(element, null);
        return css[property];
    }

    /**
     * Returns the offset parent of the given element
     * @function
     * @ignore
     * @argument {Element} element
     * @returns {Element} offset parent
     */
    function getOffsetParent(element) {
        // NOTE: 1 DOM access here
        var offsetParent = element.offsetParent;
        return offsetParent === root.document.body || !offsetParent ? root.document.documentElement : offsetParent;
    }

    /**
     * Returns the scrolling parent of the given element
     * @function
     * @ignore
     * @argument {Element} element
     * @returns {Element} offset parent
     */
    function getScrollParent(element) {
        var parent = element.parentNode;

        if (!parent) {
            return element;
        }

        if (parent === root.document) {
            // Firefox puts the scrollTOp value on `documentElement` instead of `body`, we then check which of them is
            // greater than 0 and return the proper element
            if (root.document.body.scrollTop || root.document.body.scrollLeft) {
                return root.document.body;
            } else {
                return root.document.documentElement;
            }
        }

        // Firefox want us to check `-x` and `-y` variations as well
        if (['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow')) !== -1 || ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow-x')) !== -1 || ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow-y')) !== -1) {
            // If the detected scrollParent is body, we perform an additional check on its parentNode
            // in this way we'll get body if the browser is Chrome-ish, or documentElement otherwise
            // fixes issue #65
            return parent;
        }
        return getScrollParent(element.parentNode);
    }

    /**
     * Check if the given element is fixed or is inside a fixed parent
     * @function
     * @ignore
     * @argument {Element} element
     * @argument {Element} customContainer
     * @returns {Boolean} answer to "isFixed?"
     */
    function isFixed(element) {
        if (element === root.document.body) {
            return false;
        }
        if (getStyleComputedProperty(element, 'position') === 'fixed') {
            return true;
        }
        return element.parentNode ? isFixed(element.parentNode) : element;
    }

    /**
     * Set the style to the given popper
     * @function
     * @ignore
     * @argument {Element} element - Element to apply the style to
     * @argument {Object} styles - Object with a list of properties and values which will be applied to the element
     */
    function setStyle(element, styles) {
        function is_numeric(n) {
            return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
        }
        Object.keys(styles).forEach(function (prop) {
            var unit = '';
            // add unit if the value is numeric and is one of the following
            if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && is_numeric(styles[prop])) {
                unit = 'px';
            }
            element.style[prop] = styles[prop] + unit;
        });
    }

    /**
     * Check if the given variable is a function
     * @function
     * @ignore
     * @argument {*} functionToCheck - variable to check
     * @returns {Boolean} answer to: is a function?
     */
    function isFunction(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }

    /**
     * Get the position of the given element, relative to its offset parent
     * @function
     * @ignore
     * @param {Element} element
     * @return {Object} position - Coordinates of the element and its `scrollTop`
     */
    function getOffsetRect(element) {
        var elementRect = {
            width: element.offsetWidth,
            height: element.offsetHeight,
            left: element.offsetLeft,
            top: element.offsetTop
        };

        elementRect.right = elementRect.left + elementRect.width;
        elementRect.bottom = elementRect.top + elementRect.height;

        // position
        return elementRect;
    }

    /**
     * Get bounding client rect of given element
     * @function
     * @ignore
     * @param {HTMLElement} element
     * @return {Object} client rect
     */
    function getBoundingClientRect(element) {
        var rect = element.getBoundingClientRect();

        // whether the IE version is lower than 11
        var isIE = navigator.userAgent.indexOf("MSIE") != -1;

        // fix ie document bounding top always 0 bug
        var rectTop = isIE && element.tagName === 'HTML' ? -element.scrollTop : rect.top;

        return {
            left: rect.left,
            top: rectTop,
            right: rect.right,
            bottom: rect.bottom,
            width: rect.right - rect.left,
            height: rect.bottom - rectTop
        };
    }

    /**
     * Given an element and one of its parents, return the offset
     * @function
     * @ignore
     * @param {HTMLElement} element
     * @param {HTMLElement} parent
     * @return {Object} rect
     */
    function getOffsetRectRelativeToCustomParent(element, parent, fixed) {
        var elementRect = getBoundingClientRect(element);
        var parentRect = getBoundingClientRect(parent);

        if (fixed) {
            var scrollParent = getScrollParent(parent);
            parentRect.top += scrollParent.scrollTop;
            parentRect.bottom += scrollParent.scrollTop;
            parentRect.left += scrollParent.scrollLeft;
            parentRect.right += scrollParent.scrollLeft;
        }

        var rect = {
            top: elementRect.top - parentRect.top,
            left: elementRect.left - parentRect.left,
            bottom: elementRect.top - parentRect.top + elementRect.height,
            right: elementRect.left - parentRect.left + elementRect.width,
            width: elementRect.width,
            height: elementRect.height
        };
        return rect;
    }

    /**
     * Get the prefixed supported property name
     * @function
     * @ignore
     * @argument {String} property (camelCase)
     * @returns {String} prefixed property (camelCase)
     */
    function getSupportedPropertyName(property) {
        var prefixes = ['', 'ms', 'webkit', 'moz', 'o'];

        for (var i = 0; i < prefixes.length; i++) {
            var toCheck = prefixes[i] ? prefixes[i] + property.charAt(0).toUpperCase() + property.slice(1) : property;
            if (typeof root.document.body.style[toCheck] !== 'undefined') {
                return toCheck;
            }
        }
        return null;
    }

    /**
     * The Object.assign() method is used to copy the values of all enumerable own properties from one or more source
     * objects to a target object. It will return the target object.
     * This polyfill doesn't support symbol properties, since ES5 doesn't have symbols anyway
     * Source: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
     * @function
     * @ignore
     */
    if (!Object.assign) {
        Object.defineProperty(Object, 'assign', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function value(target) {
                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert first argument to object');
                }

                var to = Object(target);
                for (var i = 1; i < arguments.length; i++) {
                    var nextSource = arguments[i];
                    if (nextSource === undefined || nextSource === null) {
                        continue;
                    }
                    nextSource = Object(nextSource);

                    var keysArray = Object.keys(nextSource);
                    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                        var nextKey = keysArray[nextIndex];
                        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (desc !== undefined && desc.enumerable) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
                return to;
            }
        });
    }

    return Popper;
});

/***/ }),
/* 46 */,
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Carousel", function() { return Carousel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Slide", function() { return Slide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Collapse", function() { return Collapse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dropdown", function() { return Dropdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return Modal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab", function() { return Tab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tabs", function() { return Tabs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatePicker", function() { return DatePicker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Affix", function() { return Affix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Alert", function() { return Alert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pagination", function() { return Pagination; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tooltip", function() { return Tooltip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Popover", function() { return Popover; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimePicker", function() { return TimePicker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Typeahead", function() { return Typeahead; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressBar", function() { return ProgressBar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressBarStack", function() { return ProgressBarStack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Breadcrumbs", function() { return Breadcrumbs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbItem", function() { return BreadcrumbItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Btn", function() { return Btn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BtnGroup", function() { return BtnGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BtnToolbar", function() { return BtnToolbar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiSelect", function() { return MultiSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Navbar", function() { return Navbar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarNav", function() { return NavbarNav; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarForm", function() { return NavbarForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarText", function() { return NavbarText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tooltip", function() { return tooltip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "popover", function() { return popover; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollspy", function() { return scrollspy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageBox", function() { return messageBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Notification", function() { return notification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);


function isExist(obj) {
  return typeof obj !== 'undefined' && obj !== null;
}

function isFunction(obj) {
  return typeof obj === 'function';
}

function isNumber(obj) {
  return typeof obj === 'number';
}

function isString(obj) {
  return typeof obj === 'string';
}

function isBoolean(obj) {
  return typeof obj === 'boolean';
}

function isPromiseSupported() {
  return typeof window !== 'undefined' && isExist(window.Promise);
}

var Carousel = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "carousel slide", attrs: { "data-ride": "carousel" }, on: { "mouseenter": _vm.stopInterval, "mouseleave": _vm.startInterval } }, [_vm.indicators ? _vm._t("indicators", [_c('ol', { staticClass: "carousel-indicators" }, _vm._l(_vm.slides, function (slide, index) {
      return _c('li', { class: { active: index === _vm.activeIndex }, on: { "click": function click($event) {
            _vm.select(index);
          } } });
    }))], { select: _vm.select, activeIndex: _vm.activeIndex }) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "carousel-inner", attrs: { "role": "listbox" } }, [_vm._t("default")], 2), _vm._v(" "), _vm.controls ? _c('a', { staticClass: "left carousel-control", attrs: { "href": "#", "role": "button" }, on: { "click": function click($event) {
          $event.preventDefault();_vm.prev();
        } } }, [_c('span', { class: _vm.iconControlLeft, attrs: { "aria-hidden": "true" } }), _vm._v(" "), _c('span', { staticClass: "sr-only" }, [_vm._v("Previous")])]) : _vm._e(), _vm._v(" "), _vm.controls ? _c('a', { staticClass: "right carousel-control", attrs: { "href": "#", "role": "button" }, on: { "click": function click($event) {
          $event.preventDefault();_vm.next();
        } } }, [_c('span', { class: _vm.iconControlRight, attrs: { "aria-hidden": "true" } }), _vm._v(" "), _c('span', { staticClass: "sr-only" }, [_vm._v("Next")])]) : _vm._e()], 2);
  }, staticRenderFns: [],
  props: {
    value: Number,
    indicators: {
      type: Boolean,
      default: true
    },
    controls: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 5000
    },
    iconControlLeft: {
      type: String,
      default: 'glyphicon glyphicon-chevron-left'
    },
    iconControlRight: {
      type: String,
      default: 'glyphicon glyphicon-chevron-right'
    }
  },
  data: function data() {
    return {
      slides: [],
      activeIndex: 0, // Make v-model not required
      timeoutId: 0,
      intervalId: 0
    };
  },

  watch: {
    interval: function interval() {
      this.startInterval();
    },
    value: function value(index, oldValue) {
      this.run(index, oldValue);
      this.activeIndex = index;
    }
  },
  mounted: function mounted() {
    if (isExist(this.value)) {
      this.activeIndex = this.value;
    }
    if (this.slides.length > 0) {
      this.$select(this.activeIndex);
    }
    this.startInterval();
  },
  beforeDestroy: function beforeDestroy() {
    this.stopInterval();
  },

  methods: {
    run: function run(newIndex, oldIndex) {
      var _this = this;

      var currentActiveIndex = oldIndex || 0;
      var direction = void 0;
      if (newIndex > currentActiveIndex) {
        direction = ['next', 'left'];
      } else {
        direction = ['prev', 'right'];
      }
      this.slides[newIndex].slideClass[direction[0]] = true;
      this.$nextTick(function () {
        _this.slides[newIndex].$el.offsetHeight;
        _this.slides.forEach(function (slide, i) {
          if (i === currentActiveIndex) {
            slide.slideClass.active = true;
            slide.slideClass[direction[1]] = true;
          } else if (i === newIndex) {
            slide.slideClass[direction[1]] = true;
          }
        });
        _this.timeoutId = setTimeout(function () {
          _this.$select(newIndex);
          _this.$emit('change', newIndex);
          _this.timeoutId = 0;
        }, 600);
      });
    },
    startInterval: function startInterval() {
      var _this2 = this;

      this.stopInterval();
      if (this.interval > 0) {
        this.intervalId = setInterval(function () {
          _this2.next();
        }, this.interval);
      }
    },
    stopInterval: function stopInterval() {
      clearInterval(this.intervalId);
      this.intervalId = 0;
    },
    resetAllSlideClass: function resetAllSlideClass() {
      this.slides.forEach(function (slide) {
        slide.slideClass.active = false;
        slide.slideClass.left = false;
        slide.slideClass.right = false;
        slide.slideClass.next = false;
        slide.slideClass.prev = false;
      });
    },
    $select: function $select(index) {
      this.resetAllSlideClass();
      this.slides[index].slideClass.active = true;
    },
    select: function select(index) {
      if (this.timeoutId !== 0 || index === this.activeIndex) {
        return;
      }
      if (isExist(this.value)) {
        this.$emit('input', index);
      } else {
        this.run(index, this.activeIndex);
        this.activeIndex = index;
      }
    },
    prev: function prev() {
      this.select(this.activeIndex === 0 ? this.slides.length - 1 : this.activeIndex - 1);
    },
    next: function next() {
      this.select(this.activeIndex === this.slides.length - 1 ? 0 : this.activeIndex + 1);
    }
  }
};

function spliceIfExist(arr, item) {
  if (Array.isArray(arr)) {
    var index = arr.indexOf(item);
    if (index >= 0) {
      arr.splice(index, 1);
    }
  }
}

function range(end) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  var arr = [];
  for (var i = start; i < end; i += step) {
    arr.push(i);
  }
  return arr;
}

function nodeListToArray(nodeList) {
  return Array.prototype.slice.call(nodeList || []);
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

var Slide = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "item", class: _vm.slideClass }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  data: function data() {
    return {
      slideClass: {
        active: false,
        prev: false,
        next: false,
        left: false,
        right: false
      }
    };
  },
  created: function created() {
    try {
      this.$parent.slides.push(this);
    } catch (e) {
      throw new Error('Slide parent must be Carousel.');
    }
  },
  beforeDestroy: function beforeDestroy() {
    var slides = this.$parent && this.$parent.slides;
    spliceIfExist(slides, this);
  }
};

var EVENTS = {
  MOUSE_ENTER: 'mouseenter',
  MOUSE_LEAVE: 'mouseleave',
  FOCUS: 'focus',
  BLUR: 'blur',
  CLICK: 'click',
  INPUT: 'input',
  KEY_DOWN: 'keydown',
  KEY_UP: 'keyup',
  KEY_PRESS: 'keypress',
  RESIZE: 'resize',
  SCROLL: 'scroll'
};

var TRIGGERS = {
  CLICK: 'click',
  HOVER: 'hover',
  FOCUS: 'focus',
  HOVER_FOCUS: 'hover-focus',
  OUTSIDE_CLICK: 'outside-click',
  MANUAL: 'manual'
};

var PLACEMENTS = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left'
};

function isIE11() {
  return !!window.MSInputMethodContext && !!document.documentMode;
}

function isIE10() {
  return window.navigator.appVersion.indexOf('MSIE 10') !== -1;
}

function getComputedStyle(el) {
  return window.getComputedStyle(el);
}

function getViewportSize() {
  var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return { width: width, height: height };
}

var scrollbarWidth = null;
var savedScreenSize = null;

function getScrollbarWidth() {
  var recalculate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var screenSize = getViewportSize();
  // return directly when already calculated & not force recalculate & screen size not changed
  if (scrollbarWidth !== null && !recalculate && screenSize.height === savedScreenSize.height && screenSize.width === savedScreenSize.width) {
    return scrollbarWidth;
  }
  if (document.readyState === 'loading') {
    return null;
  }
  var div1 = document.createElement('div');
  var div2 = document.createElement('div');
  div1.style.width = div2.style.width = div1.style.height = div2.style.height = '100px';
  div1.style.overflow = 'scroll';
  div2.style.overflow = 'hidden';
  document.body.appendChild(div1);
  document.body.appendChild(div2);
  scrollbarWidth = Math.abs(div1.scrollHeight - div2.scrollHeight);
  document.body.removeChild(div1);
  document.body.removeChild(div2);
  // save new screen size
  savedScreenSize = screenSize;
  return scrollbarWidth;
}

function on(element, event, handler) {
  element.addEventListener(event, handler);
}

function off(element, event, handler) {
  element.removeEventListener(event, handler);
}

function isElement(el) {
  return el && el.nodeType === Node.ELEMENT_NODE;
}

function removeFromDom(el) {
  isElement(el) && isElement(el.parentNode) && el.parentNode.removeChild(el);
}

function ensureElementMatchesFunction() {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s);
      var i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;
    };
  }
}

function addClass(el, className) {
  if (!isElement(el)) {
    return;
  }
  if (el.className) {
    var classes = el.className.split(' ');
    if (classes.indexOf(className) < 0) {
      classes.push(className);
      el.className = classes.join(' ');
    }
  } else {
    el.className = className;
  }
}

function removeClass(el, className) {
  if (!isElement(el)) {
    return;
  }
  if (el.className) {
    var classes = el.className.split(' ');
    var newClasses = [];
    for (var i = 0, l = classes.length; i < l; i++) {
      if (classes[i] !== className) {
        newClasses.push(classes[i]);
      }
    }
    el.className = newClasses.join(' ');
  }
}

function hasClass(el, className) {
  if (!isElement(el)) {
    return false;
  }
  var classes = el.className.split(' ');
  for (var i = 0, l = classes.length; i < l; i++) {
    if (classes[i] === className) {
      return true;
    }
  }
  return false;
}

function setDropdownPosition(dropdown, trigger) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var doc = document.documentElement;
  var containerScrollLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  var containerScrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  var rect = trigger.getBoundingClientRect();
  var dropdownRect = dropdown.getBoundingClientRect();
  dropdown.style.right = 'auto';
  dropdown.style.bottom = 'auto';
  if (options.menuRight) {
    dropdown.style.left = containerScrollLeft + rect.left + rect.width - dropdownRect.width + 'px';
  } else {
    dropdown.style.left = containerScrollLeft + rect.left + 'px';
  }
  if (options.dropup) {
    dropdown.style.top = containerScrollTop + rect.top - dropdownRect.height - 4 + 'px';
  } else {
    dropdown.style.top = containerScrollTop + rect.top + rect.height + 'px';
  }
}

function isAvailableAtPosition(trigger, popup, placement) {
  var triggerRect = trigger.getBoundingClientRect();
  var popupRect = popup.getBoundingClientRect();
  var viewPortSize = getViewportSize();
  var top = true;
  var right = true;
  var bottom = true;
  var left = true;
  switch (placement) {
    case PLACEMENTS.TOP:
      top = triggerRect.top >= popupRect.height;
      left = triggerRect.left + triggerRect.width / 2 >= popupRect.width / 2;
      right = triggerRect.right - triggerRect.width / 2 + popupRect.width / 2 <= viewPortSize.width;
      break;
    case PLACEMENTS.BOTTOM:
      bottom = triggerRect.bottom + popupRect.height <= viewPortSize.height;
      left = triggerRect.left + triggerRect.width / 2 >= popupRect.width / 2;
      right = triggerRect.right - triggerRect.width / 2 + popupRect.width / 2 <= viewPortSize.width;
      break;
    case PLACEMENTS.RIGHT:
      right = triggerRect.right + popupRect.width <= viewPortSize.width;
      top = triggerRect.top + triggerRect.height / 2 >= popupRect.height / 2;
      bottom = triggerRect.bottom - triggerRect.height / 2 + popupRect.height / 2 <= viewPortSize.height;
      break;
    case PLACEMENTS.LEFT:
      left = triggerRect.left >= popupRect.width;
      top = triggerRect.top + triggerRect.height / 2 >= popupRect.height / 2;
      bottom = triggerRect.bottom - triggerRect.height / 2 + popupRect.height / 2 <= viewPortSize.height;
      break;
  }
  return top && right && bottom && left;
}

function setTooltipPosition(tooltip, trigger, placement, auto, appendToSelector) {
  var container = void 0;
  var containerScrollTop = void 0;
  var containerScrollLeft = void 0;
  if (!isExist(appendToSelector) || appendToSelector === 'body') {
    container = document.body;
    var doc = document.documentElement;
    containerScrollLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    containerScrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  } else {
    container = document.querySelector(appendToSelector);
    containerScrollLeft = container.scrollLeft;
    containerScrollTop = container.scrollTop;
  }
  // auto adjust placement
  if (auto) {
    // Try: right -> bottom -> left -> top
    // Cause the default placement is top
    var placements = [PLACEMENTS.RIGHT, PLACEMENTS.BOTTOM, PLACEMENTS.LEFT, PLACEMENTS.TOP];
    // The class switch helper function
    var changePlacementClass = function changePlacementClass(placement) {
      // console.log(placement)
      placements.forEach(function (placement) {
        removeClass(tooltip, placement);
      });
      addClass(tooltip, placement);
    };
    // No need to adjust if the default placement fits
    if (!isAvailableAtPosition(trigger, tooltip, placement)) {
      for (var i = 0, l = placements.length; i < l; i++) {
        // Re-assign placement class
        changePlacementClass(placements[i]);
        // Break if new placement fits
        if (isAvailableAtPosition(trigger, tooltip, placements[i])) {
          placement = placements[i];
          break;
        }
      }
      changePlacementClass(placement);
    }
  }
  // fix left and top for tooltip
  var rect = trigger.getBoundingClientRect();
  var tooltipRect = tooltip.getBoundingClientRect();
  if (placement === PLACEMENTS.BOTTOM) {
    tooltip.style.top = containerScrollTop + rect.top + rect.height + 'px';
    tooltip.style.left = containerScrollLeft + rect.left + rect.width / 2 - tooltipRect.width / 2 + 'px';
  } else if (placement === PLACEMENTS.LEFT) {
    tooltip.style.top = containerScrollTop + rect.top + rect.height / 2 - tooltipRect.height / 2 + 'px';
    tooltip.style.left = containerScrollLeft + rect.left - tooltipRect.width + 'px';
  } else if (placement === PLACEMENTS.RIGHT) {
    tooltip.style.top = containerScrollTop + rect.top + rect.height / 2 - tooltipRect.height / 2 + 'px';
    tooltip.style.left = containerScrollLeft + rect.left + rect.width + 'px';
  } else {
    tooltip.style.top = containerScrollTop + rect.top - tooltipRect.height + 'px';
    tooltip.style.left = containerScrollLeft + rect.left + rect.width / 2 - tooltipRect.width / 2 + 'px';
  }
}

function hasScrollbar(el) {
  var SCROLL = 'scroll';
  var hasVScroll = el.scrollHeight > el.clientHeight;
  var style = getComputedStyle(el);
  return hasVScroll || style.overflow === SCROLL || style.overflowY === SCROLL;
}

function toggleBodyOverflow(enable) {
  var MODAL_OPEN = 'modal-open';
  var body = document.body;
  if (enable) {
    removeClass(body, MODAL_OPEN);
    body.style.paddingRight = null;
  } else {
    var browsersWithFloatingScrollbar = isIE10() || isIE11();
    var documentHasScrollbar = hasScrollbar(document.documentElement) || hasScrollbar(document.body);
    if (documentHasScrollbar && !browsersWithFloatingScrollbar) {
      body.style.paddingRight = getScrollbarWidth() + 'px';
    }
    addClass(body, MODAL_OPEN);
  }
}

function getClosest(el, selector) {
  ensureElementMatchesFunction();
  var parent = void 0;
  var _el = el;
  while (_el) {
    parent = _el.parentElement;
    if (parent && parent.matches(selector)) {
      return parent;
    }
    _el = parent;
  }
  return null;
}

function getParents(el, selector) {
  var until = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  ensureElementMatchesFunction();
  var parents = [];
  var parent = el.parentElement;
  while (parent) {
    if (parent.matches(selector)) {
      parents.push(parent);
    } else if (until && (until === parent || parent.matches(until))) {
      break;
    }
    parent = parent.parentElement;
  }
  return parents;
}

var COLLAPSE = 'collapse';
var IN = 'in';
var COLLAPSING = 'collapsing';

var Collapse = {
  render: function render(h) {
    return h(this.tag, {}, this.$slots.default);
  },

  props: {
    tag: {
      type: String,
      default: 'div'
    },
    value: {
      type: Boolean,
      default: false
    },
    transitionDuration: {
      type: Number,
      default: 350
    }
  },
  data: function data() {
    return {
      timeoutId: 0
    };
  },

  watch: {
    value: function value(show) {
      this.toggle(show);
    }
  },
  mounted: function mounted() {
    var el = this.$el;
    addClass(el, COLLAPSE);
    if (this.value) {
      addClass(el, IN);
    }
  },

  methods: {
    toggle: function toggle(show) {
      var _this = this;

      clearTimeout(this.timeoutId);
      var el = this.$el;
      if (show) {
        this.$emit('show');
        removeClass(el, COLLAPSE);
        el.style.height = 'auto';
        var height = window.getComputedStyle(el).height;
        el.style.height = null;
        addClass(el, COLLAPSING);
        el.offsetHeight; // force repaint
        el.style.height = height;
        this.timeoutId = setTimeout(function () {
          removeClass(el, COLLAPSING);
          addClass(el, COLLAPSE);
          addClass(el, IN);
          el.style.height = null;
          _this.timeoutId = 0;
          _this.$emit('shown');
        }, this.transitionDuration);
      } else {
        this.$emit('hide');
        el.style.height = window.getComputedStyle(el).height;
        removeClass(el, IN);
        removeClass(el, COLLAPSE);
        el.offsetHeight;
        el.style.height = null;
        addClass(el, COLLAPSING);
        this.timeoutId = setTimeout(function () {
          addClass(el, COLLAPSE);
          removeClass(el, COLLAPSING);
          el.style.height = null;
          _this.timeoutId = 0;
          _this.$emit('hidden');
        }, this.transitionDuration);
      }
    }
  }
};

var DEFAULT_TAG = 'div';

var Dropdown = {
  render: function render(h) {
    return h(this.tag, {
      class: {
        'btn-group': this.tag === DEFAULT_TAG,
        dropdown: !this.dropup,
        dropup: this.dropup,
        open: this.show
      }
    }, [this.$slots.default, h('ul', {
      class: {
        'dropdown-menu': true,
        'dropdown-menu-right': this.menuRight
      },
      ref: 'dropdown'
    }, [this.$slots.dropdown])]);
  },

  props: {
    tag: {
      type: String,
      default: DEFAULT_TAG
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    value: Boolean,
    dropup: {
      type: Boolean,
      default: false
    },
    menuRight: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    notCloseElements: Array,
    positionElement: null
  },
  data: function data() {
    return {
      show: false,
      triggerEl: undefined
    };
  },

  watch: {
    value: function value(v) {
      this.toggle(v);
    }
  },
  mounted: function mounted() {
    this.initTrigger();
    if (this.triggerEl) {
      on(this.triggerEl, EVENTS.CLICK, this.toggle);
    }
    on(window, EVENTS.CLICK, this.windowClicked);
    if (this.value) {
      this.toggle(true);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.removeDropdownFromBody();
    if (this.triggerEl) {
      off(this.triggerEl, EVENTS.CLICK, this.toggle);
    }
    off(window, EVENTS.CLICK, this.windowClicked);
  },

  methods: {
    initTrigger: function initTrigger() {
      var trigger = this.$el.querySelector('[data-role="trigger"]') || this.$el.querySelector('.dropdown-toggle') || this.$el.firstChild;
      this.triggerEl = trigger && trigger !== this.$refs.dropdown ? trigger : null;
    },
    toggle: function toggle(show) {
      if (this.disabled) {
        return;
      }
      if (isBoolean(show)) {
        this.show = show;
      } else {
        this.show = !this.show;
      }
      if (this.appendToBody) {
        this.show ? this.appendDropdownToBody() : this.removeDropdownFromBody();
      }
      this.$emit('input', this.show);
    },
    windowClicked: function windowClicked(event) {
      var target = event.target;
      if (this.show && target) {
        var targetInNotCloseElements = false;
        if (this.notCloseElements) {
          for (var i = 0, l = this.notCloseElements.length; i < l; i++) {
            var isTargetInElement = this.notCloseElements[i].contains(target);
            var shouldBreak = isTargetInElement;
            if (this.appendToBody) {
              var isTargetInDropdown = this.$refs.dropdown.contains(target);
              var isElInElements = this.notCloseElements.indexOf(this.$el) >= 0;
              shouldBreak = isTargetInElement || isTargetInDropdown && isElInElements;
            }
            if (shouldBreak) {
              targetInNotCloseElements = true;
              break;
            }
          }
        }
        var targetInDropdownBody = this.$refs.dropdown.contains(target);
        var targetInTrigger = this.$el.contains(target) && !targetInDropdownBody;
        if (!targetInTrigger && !targetInNotCloseElements) {
          this.toggle(false);
        }
      }
    },
    appendDropdownToBody: function appendDropdownToBody() {
      try {
        var el = this.$refs.dropdown;
        el.style.display = 'block';
        document.body.appendChild(el);
        var positionElement = this.positionElement || this.$el;
        setDropdownPosition(el, positionElement, this);
      } catch (e) {
        // Silent
      }
    },
    removeDropdownFromBody: function removeDropdownFromBody() {
      try {
        var el = this.$refs.dropdown;
        el.removeAttribute('style');
        this.$el.appendChild(el);
      } catch (e) {
        // Silent
      }
    }
  }
};

var defaultLang = {
  uiv: {
    datePicker: {
      clear: 'Clear',
      today: 'Today',
      month: 'Month',
      month1: 'January',
      month2: 'February',
      month3: 'March',
      month4: 'April',
      month5: 'May',
      month6: 'June',
      month7: 'July',
      month8: 'August',
      month9: 'September',
      month10: 'October',
      month11: 'November',
      month12: 'December',
      year: 'Year',
      week1: 'Mon',
      week2: 'Tue',
      week3: 'Wed',
      week4: 'Thu',
      week5: 'Fri',
      week6: 'Sat',
      week7: 'Sun'
    },
    timePicker: {
      am: 'AM',
      pm: 'PM'
    },
    modal: {
      cancel: 'Cancel',
      ok: 'OK'
    },
    multiSelect: {
      placeholder: 'Select...',
      filterPlaceholder: 'Search...'
    }
  }
};

// https://github.com/ElemeFE/element/blob/dev/src/locale/index.js
var lang = defaultLang;

var i18nHandler = function i18nHandler() {
  var vuei18n = Object.getPrototypeOf(this).$t;
  if (isFunction(vuei18n)) {
    try {
      return vuei18n.apply(this, arguments);
    } catch (err) {
      //  vuei18n.apply doesn't work with 7.3.3 of vue-i18n
      return this.$t.apply(this, arguments);
    }
  }
};

var t = function t(path, options) {
  options = options || {};

  var value = i18nHandler.apply(this, arguments);
  if (isExist(value) && !options.$$locale) {
    return value;
  }
  var array = path.split('.');
  var current = options.$$locale || lang;

  for (var i = 0, j = array.length; i < j; i++) {
    var property = array[i];
    value = current[property];
    if (i === j - 1) return value;
    if (!value) return '';
    current = value;
  }
  return '';
};

var use = function use(l) {
  lang = l || lang;
};

var i18n = function i18n(fn) {
  i18nHandler = fn || i18nHandler;
};

var locale = { use: use, t: t, i18n: i18n };

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var Local = {
  methods: {
    t: function t$$1() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args[1] = _extends({ $$locale: this.locale }, args[1]);
      return t.apply(this, args);
    }
  },
  props: {
    locale: Object
  }
};

function mergeData() {
  for (var e, a, s = {}, t = arguments.length; t--;) {
    for (var r = 0, c = Object.keys(arguments[t]); r < c.length; r++) {
      switch (e = c[r]) {case "class":case "style":case "directives":
          Array.isArray(s[e]) || (s[e] = []), s[e] = s[e].concat(arguments[t][e]);break;case "staticClass":
          if (!arguments[t][e]) break;void 0 === s[e] && (s[e] = ""), s[e] && (s[e] += " "), s[e] += arguments[t][e].trim();break;case "on":case "nativeOn":
          s[e] || (s[e] = {});for (var o = 0, n = Object.keys(arguments[t][e]); o < n.length; o++) {
            a = n[o], s[e][a] ? s[e][a] = [].concat(s[e][a], arguments[t][e][a]) : s[e][a] = arguments[t][e][a];
          }break;case "attrs":case "props":case "domProps":case "scopedSlots":case "staticStyle":case "hook":case "transition":
          s[e] || (s[e] = {}), s[e] = __assign({}, arguments[t][e], s[e]);break;case "slot":case "key":case "ref":case "tag":case "show":case "keepAlive":default:
          s[e] || (s[e] = arguments[t][e]);}
    }
  }return s;
}var __assign = Object.assign || function (e) {
  for (var a, s = 1, t = arguments.length; s < t; s++) {
    a = arguments[s];for (var r in a) {
      Object.prototype.hasOwnProperty.call(a, r) && (e[r] = a[r]);
    }
  }return e;
};

var linkMixin = {
  props: {
    // <a> props
    href: String,
    target: String,
    // <router-link> props
    to: null,
    replace: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
    },
    exact: {
      type: Boolean,
      default: false
    }
  }
};

var BtnGroup = {
  functional: true,
  render: function render(h, _ref) {
    var props = _ref.props,
        children = _ref.children,
        data = _ref.data;

    return h('div', mergeData(data, {
      class: defineProperty({
        'btn-group': !props.vertical,
        'btn-group-vertical': props.vertical,
        'btn-group-justified': props.justified
      }, 'btn-group-' + props.size, props.size),
      attrs: {
        role: 'group',
        'data-toggle': 'buttons'
      }
    }), children);
  },

  props: {
    size: String,
    vertical: {
      type: Boolean,
      default: false
    },
    justified: {
      type: Boolean,
      default: false
    }
  }
};

var INPUT_TYPE_CHECKBOX = 'checkbox';
var INPUT_TYPE_RADIO = 'radio';

var Btn = {
  functional: true,
  mixins: [linkMixin],
  render: function render(h, _ref) {
    var _classes;

    var children = _ref.children,
        props = _ref.props,
        data = _ref.data;

    // event listeners
    var listeners = data.on || {};
    // checkbox: model contain inputValue
    // radio: model === inputValue
    var isInputActive = props.inputType === INPUT_TYPE_CHECKBOX ? props.value.indexOf(props.inputValue) >= 0 : props.value === props.inputValue;
    // button class
    var classes = (_classes = {
      btn: true,
      active: props.inputType ? isInputActive : props.active,
      disabled: props.disabled,
      'btn-block': props.block
    }, defineProperty(_classes, 'btn-' + props.type, Boolean(props.type)), defineProperty(_classes, 'btn-' + props.size, Boolean(props.size)), _classes);
    // prevent event for disabled links
    var on = {
      click: function click(e) {
        if (props.disabled && e instanceof Event) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };
    // render params
    var tag = void 0,
        options = void 0,
        slot = void 0;

    if (props.href) {
      // is native link
      tag = 'a';
      slot = children;
      options = mergeData(data, {
        on: on,
        class: classes,
        attrs: {
          role: 'button',
          href: props.href,
          target: props.target
        }
      });
    } else if (props.to) {
      // is vue router link
      tag = 'router-link';
      slot = children;
      options = mergeData(data, {
        nativeOn: on,
        class: classes,
        props: {
          event: props.disabled ? '' : 'click', // prevent nav while disabled
          to: props.to,
          replace: props.replace,
          append: props.append,
          exact: props.exact
        },
        attrs: {
          role: 'button'
        }
      });
    } else if (props.inputType) {
      // is input checkbox or radio
      tag = 'label';
      options = mergeData(data, {
        on: on,
        class: classes
      });
      slot = [h('input', {
        attrs: {
          autocomplete: 'off',
          type: props.inputType,
          checked: isInputActive ? 'checked' : null,
          disabled: props.disabled
        },
        domProps: {
          checked: isInputActive // required
        },
        on: {
          change: function change() {
            if (props.inputType === INPUT_TYPE_CHECKBOX) {
              if (isInputActive) {
                props.value.splice(props.value.indexOf(props.inputValue), 1);
              } else {
                props.value.push(props.inputValue);
              }
            } else {
              listeners['input'](props.inputValue);
            }
          }
        }
      }), children];
    } else if (props.justified) {
      // is in justified btn-group
      tag = BtnGroup;
      options = {};
      slot = [h('button', mergeData(data, {
        on: on,
        class: classes,
        attrs: {
          type: props.nativeType,
          disabled: props.disabled
        }
      }), children)];
    } else {
      // is button
      tag = 'button';
      slot = children;
      options = mergeData(data, {
        on: on,
        class: classes,
        attrs: {
          type: props.nativeType,
          disabled: props.disabled
        }
      });
    }

    return h(tag, options, slot);
  },

  props: {
    justified: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default'
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    size: String,
    block: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // <input> props
    value: null,
    inputValue: null,
    inputType: {
      type: String,
      validator: function validator(value) {
        return value === INPUT_TYPE_CHECKBOX || value === INPUT_TYPE_RADIO;
      }
    }
  }
};

var MODAL_BACKDROP = 'modal-backdrop';
var IN$1 = 'in';
var getOpenModalNum = function getOpenModalNum() {
  return document.querySelectorAll('.' + MODAL_BACKDROP).length;
};

var Modal = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "modal", class: { fade: _vm.transitionDuration > 0 }, attrs: { "tabindex": "-1", "role": "dialog" }, on: { "click": function click($event) {
          if ($event.target !== $event.currentTarget) {
            return null;
          }_vm.backdropClicked($event);
        } } }, [_c('div', { ref: "dialog", staticClass: "modal-dialog", class: _vm.modalSizeClass, attrs: { "role": "document" } }, [_c('div', { staticClass: "modal-content" }, [_vm.header ? _c('div', { staticClass: "modal-header" }, [_vm._t("header", [_vm.dismissBtn ? _c('button', { staticClass: "close", staticStyle: { "position": "relative", "z-index": "1060" }, attrs: { "type": "button", "aria-label": "Close" }, on: { "click": function click($event) {
          _vm.toggle(false);
        } } }, [_c('span', { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]) : _vm._e(), _vm._v(" "), _c('h4', { staticClass: "modal-title" }, [_vm._t("title", [_vm._v(_vm._s(_vm.title))])], 2)])], 2) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "modal-body" }, [_vm._t("default")], 2), _vm._v(" "), _vm.footer ? _c('div', { staticClass: "modal-footer" }, [_vm._t("footer", [_c('btn', { on: { "click": function click($event) {
          _vm.toggle(false, 'cancel');
        } } }, [_c('span', [_vm._v(_vm._s(_vm.cancelText || _vm.t('uiv.modal.cancel')))])]), _vm._v(" "), _c('btn', { attrs: { "type": "primary", "data-action": "auto-focus" }, on: { "click": function click($event) {
          _vm.toggle(false, 'ok');
        } } }, [_c('span', [_vm._v(_vm._s(_vm.okText || _vm.t('uiv.modal.ok')))])])])], 2) : _vm._e()])]), _vm._v(" "), _c('div', { ref: "backdrop", staticClass: "modal-backdrop", class: { fade: _vm.transitionDuration > 0 } })]);
  }, staticRenderFns: [],
  mixins: [Local],
  components: { Btn: Btn },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: String,
    size: String,
    backdrop: {
      type: Boolean,
      default: true
    },
    footer: {
      type: Boolean,
      default: true
    },
    header: {
      type: Boolean,
      default: true
    },
    cancelText: String,
    okText: String,
    dismissBtn: {
      type: Boolean,
      default: true
    },
    transitionDuration: {
      type: Number,
      default: 150
    },
    autoFocus: {
      type: Boolean,
      default: false
    },
    keyboard: {
      type: Boolean,
      default: true
    },
    beforeClose: Function,
    zOffset: {
      type: Number,
      default: 20
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      msg: '',
      timeoutId: 0
    };
  },

  computed: {
    modalSizeClass: function modalSizeClass() {
      return defineProperty({}, 'modal-' + this.size, Boolean(this.size));
    }
  },
  watch: {
    value: function value(v) {
      this.$toggle(v);
    }
  },
  mounted: function mounted() {
    removeFromDom(this.$refs.backdrop);
    on(window, EVENTS.KEY_UP, this.onKeyPress);
    if (this.value) {
      this.$toggle(true);
    }
  },
  beforeDestroy: function beforeDestroy() {
    clearTimeout(this.timeoutId);
    removeFromDom(this.$refs.backdrop);
    removeFromDom(this.$el);
    if (getOpenModalNum() === 0) {
      toggleBodyOverflow(true);
    }
    off(window, EVENTS.KEY_UP, this.onKeyPress);
  },

  methods: {
    onKeyPress: function onKeyPress(event) {
      if (this.keyboard && this.value && event.keyCode === 27) {
        this.toggle(false);
      }
    },
    toggle: function toggle(show, msg) {
      // skip the hiding while show===false & beforeClose returning falsely value
      if (!show && isFunction(this.beforeClose) && !this.beforeClose(msg)) {
        return;
      }
      this.msg = msg;
      this.$emit('input', show);
    },
    $toggle: function $toggle(show) {
      var _this = this;

      var modal = this.$el;
      var backdrop = this.$refs.backdrop;
      clearTimeout(this.timeoutId);
      if (show) {
        var alreadyOpenModalNum = getOpenModalNum();
        document.body.appendChild(backdrop);
        if (this.appendToBody) {
          document.body.appendChild(modal);
        }
        modal.style.display = 'block';
        modal.scrollTop = 0;
        backdrop.offsetHeight; // force repaint
        toggleBodyOverflow(false);
        addClass(backdrop, IN$1);
        addClass(modal, IN$1);
        // fix z-index for nested modals
        // no need to calculate if no modal is already open
        if (alreadyOpenModalNum > 0) {
          var modalBaseZ = parseInt(getComputedStyle(modal).zIndex) || 1050; // 1050 is default modal z-Index
          var backdropBaseZ = parseInt(getComputedStyle(backdrop).zIndex) || 1040; // 1040 is default backdrop z-Index
          var offset = alreadyOpenModalNum * this.zOffset;
          modal.style.zIndex = '' + (modalBaseZ + offset);
          backdrop.style.zIndex = '' + (backdropBaseZ + offset);
        }
        // z-index fix end
        this.timeoutId = setTimeout(function () {
          if (_this.autoFocus) {
            var btn = _this.$el.querySelector('[data-action="auto-focus"]');
            if (btn) {
              btn.focus();
            }
          }
          _this.$emit('show');
          _this.timeoutId = 0;
        }, this.transitionDuration);
      } else {
        removeClass(backdrop, IN$1);
        removeClass(modal, IN$1);
        this.timeoutId = setTimeout(function () {
          modal.style.display = 'none';
          removeFromDom(backdrop);
          if (_this.appendToBody) {
            removeFromDom(modal);
          }
          if (getOpenModalNum() === 0) {
            toggleBodyOverflow(true);
          }
          _this.$emit('hide', _this.msg || 'dismiss');
          _this.msg = '';
          _this.timeoutId = 0;
          // restore z-index for nested modals
          modal.style.zIndex = '';
          backdrop.style.zIndex = '';
          // z-index fix end
        }, this.transitionDuration);
      }
    },
    backdropClicked: function backdropClicked(event) {
      if (this.backdrop) {
        this.toggle(false);
      }
    }
  }
};

var ACTIVE_CLASS = 'active';
var IN_CLASS = 'in';

var Tab = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "tab-pane", class: { fade: _vm.transition > 0 }, attrs: { "role": "tabpanel" } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  props: {
    title: {
      type: String,
      default: 'Tab Title'
    },
    htmlTitle: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    group: String,
    pullRight: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      active: true,
      transition: 150
    };
  },

  watch: {
    active: function active(_active) {
      var _this = this;

      if (_active) {
        setTimeout(function () {
          addClass(_this.$el, ACTIVE_CLASS);
          _this.$el.offsetHeight;
          addClass(_this.$el, IN_CLASS);
        }, this.transition);
      } else {
        removeClass(this.$el, IN_CLASS);
        setTimeout(function () {
          removeClass(_this.$el, ACTIVE_CLASS);
        }, this.transition);
      }
    }
  },
  created: function created() {
    try {
      this.$parent.tabs.push(this);
    } catch (e) {
      throw new Error('<tab> parent must be <tabs>.');
    }
  },
  beforeDestroy: function beforeDestroy() {
    var tabs = this.$parent && this.$parent.tabs;
    spliceIfExist(tabs, this);
  },

  methods: {
    show: function show() {
      var _this2 = this;

      this.$nextTick(function () {
        addClass(_this2.$el, ACTIVE_CLASS);
        addClass(_this2.$el, IN_CLASS);
      });
    }
  }
};

var BEFORE_CHANGE_EVENT = 'before-change';

var Tabs = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('section', [_c('ul', { class: _vm.navClasses, attrs: { "role": "tablist" } }, [_vm._l(_vm.groupedTabs, function (tab, index) {
      return [tab.tabs ? _c('dropdown', { class: _vm.getTabClasses(tab), attrs: { "role": "presentation", "tag": "li" } }, [_c('a', { staticClass: "dropdown-toggle", attrs: { "role": "tab", "href": "#" }, on: { "click": function click($event) {
            $event.preventDefault();
          } } }, [_vm._v(_vm._s(tab.group) + " "), _c('span', { staticClass: "caret" })]), _vm._v(" "), _c('template', { slot: "dropdown" }, _vm._l(tab.tabs, function (subTab) {
        return _c('li', { class: _vm.getTabClasses(subTab, true) }, [_c('a', { attrs: { "href": "#" }, on: { "click": function click($event) {
              $event.preventDefault();_vm.select(_vm.tabs.indexOf(subTab));
            } } }, [_vm._v(_vm._s(subTab.title))])]);
      }))], 2) : _c('li', { class: _vm.getTabClasses(tab), attrs: { "role": "presentation" } }, [_c('a', { attrs: { "role": "tab", "href": "#" }, on: { "click": function click($event) {
            $event.preventDefault();_vm.select(_vm.tabs.indexOf(tab));
          } } }, [tab.htmlTitle ? _c('span', { domProps: { "innerHTML": _vm._s(tab.title) } }) : [_vm._v(_vm._s(tab.title))]], 2)])];
    }), _vm._v(" "), !_vm.justified && _vm.$slots['nav-right'] ? _c('li', { staticClass: "pull-right" }, [_vm._t("nav-right")], 2) : _vm._e()], 2), _vm._v(" "), _c('div', { staticClass: "tab-content" }, [_vm._t("default")], 2)]);
  }, staticRenderFns: [],
  components: { Dropdown: Dropdown },
  props: {
    value: {
      type: Number,
      validator: function validator(v) {
        return v >= 0;
      }
    },
    transitionDuration: {
      type: Number,
      default: 150
    },
    justified: Boolean,
    pills: Boolean,
    stacked: Boolean
  },
  data: function data() {
    return {
      tabs: [],
      activeIndex: 0 // Make v-model not required
    };
  },

  watch: {
    value: {
      immediate: true,
      handler: function handler(value) {
        if (isNumber(value)) {
          this.activeIndex = value;
          this.selectCurrent();
        }
      }
    },
    tabs: function tabs(_tabs) {
      var _this = this;

      _tabs.forEach(function (tab, index) {
        tab.transition = _this.transitionDuration;
        if (index === _this.activeIndex) {
          tab.show();
        }
      });
      this.selectCurrent();
    }
  },
  computed: {
    navClasses: function navClasses() {
      return {
        nav: true,
        'nav-justified': this.justified,
        'nav-tabs': !this.pills,
        'nav-pills': this.pills,
        'nav-stacked': this.stacked && this.pills
      };
    },
    groupedTabs: function groupedTabs() {
      var tabs = [];
      var hash = {};
      this.tabs.forEach(function (tab) {
        if (tab.group) {
          if (hash.hasOwnProperty(tab.group)) {
            tabs[hash[tab.group]].tabs.push(tab);
          } else {
            tabs.push({
              tabs: [tab],
              group: tab.group
            });
            hash[tab.group] = tabs.length - 1;
          }
          if (tab.active) {
            tabs[hash[tab.group]].active = true;
          }
          if (tab.pullRight) {
            tabs[hash[tab.group]].pullRight = true;
          }
        } else {
          tabs.push(tab);
        }
      });
      return tabs;
    }
  },
  methods: {
    getTabClasses: function getTabClasses(tab) {
      var isSubTab = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      return {
        active: tab.active,
        disabled: tab.disabled,
        'pull-right': tab.pullRight && !isSubTab
      };
    },
    selectCurrent: function selectCurrent() {
      var _this2 = this;

      var found = false;
      this.tabs.forEach(function (tab, index) {
        if (index === _this2.activeIndex) {
          found = !tab.active;
          tab.active = true;
        } else {
          tab.active = false;
        }
      });
      if (found) {
        this.$emit('change', this.activeIndex);
      }
    },
    selectValidate: function selectValidate(index) {
      var _this3 = this;

      if (isFunction(this.$listeners[BEFORE_CHANGE_EVENT])) {
        this.$emit(BEFORE_CHANGE_EVENT, this.activeIndex, index, function (result) {
          if (!isExist(result)) {
            _this3.$select(index);
          }
        });
      } else {
        this.$select(index);
      }
    },
    select: function select(index) {
      if (!this.tabs[index].disabled && index !== this.activeIndex) {
        this.selectValidate(index);
      }
    },
    $select: function $select(index) {
      if (isNumber(this.value)) {
        this.$emit('input', index);
      } else {
        this.activeIndex = index;
        this.selectCurrent();
      }
    }
  }
};

function pad(value, num) {
  value = value + '';
  for (var i = num - value.length; i > 0; i--) {
    value = '0' + value;
  }
  return value;
}

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function stringify(date, format) {
  try {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var monthName = monthNames[month - 1];
    return format.replace(/yyyy/g, year).replace(/MMMM/g, monthName).replace(/MMM/g, monthName.substring(0, 3)).replace(/MM/g, pad(month, 2)).replace(/dd/g, pad(day, 2)).replace(/yy/g, year).replace(/M(?!a)/g, month).replace(/d/g, day);
  } catch (e) {
    return '';
  }
}

function convertDateToUTC(date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}

/* https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
 *
 * For a given date, get the ISO week number
 *
 * Based on information at:
 *
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 */
function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.year, d.month, d.date));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

var DateView = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('table', { staticStyle: { "width": "100%" }, attrs: { "role": "grid" } }, [_c('thead', [_c('tr', [_c('td', [_c('btn', { staticStyle: { "border": "none" }, attrs: { "block": "", "size": "sm" }, on: { "click": _vm.goPrevMonth } }, [_c('i', { class: _vm.iconControlLeft })])], 1), _vm._v(" "), _c('td', { attrs: { "colspan": _vm.weekNumbers ? 6 : 5 } }, [_c('btn', { staticStyle: { "border": "none" }, attrs: { "block": "", "size": "sm" }, on: { "click": _vm.changeView } }, [_c('b', [_vm._v(_vm._s(_vm.yearMonthStr))])])], 1), _vm._v(" "), _c('td', [_c('btn', { staticStyle: { "border": "none" }, attrs: { "block": "", "size": "sm" }, on: { "click": _vm.goNextMonth } }, [_c('i', { class: _vm.iconControlRight })])], 1)]), _vm._v(" "), _c('tr', { attrs: { "align": "center" } }, [_vm.weekNumbers ? _c('td') : _vm._e(), _vm._v(" "), _vm._l(_vm.weekDays, function (day) {
      return _c('td', { attrs: { "width": "14.2857142857%" } }, [_c('small', [_vm._v(_vm._s(_vm.tWeekName(day === 0 ? 7 : day)))])]);
    })], 2)]), _vm._v(" "), _c('tbody', _vm._l(_vm.monthDayRows, function (row) {
      return _c('tr', [_vm.weekNumbers ? _c('td', { staticClass: "text-center", staticStyle: { "border-right": "1px solid #eee" } }, [_c('small', { staticClass: "text-muted" }, [_vm._v(_vm._s(_vm.getWeekNumber(row[_vm.weekStartsWith])))])]) : _vm._e(), _vm._v(" "), _vm._l(row, function (date) {
        return _c('td', [_c('btn', { class: date.classes, staticStyle: { "border": "none" }, attrs: { "block": "", "size": "sm", "data-action": "select", "type": _vm.getBtnType(date), "disabled": date.disabled }, on: { "click": function click($event) {
              _vm.select(date);
            } } }, [_c('span', { class: { 'text-muted': _vm.month !== date.month }, attrs: { "data-action": "select" } }, [_vm._v(_vm._s(date.date))])])], 1);
      })], 2);
    }))]);
  }, staticRenderFns: [],
  mixins: [Local],
  props: {
    month: Number,
    year: Number,
    date: Date,
    today: Date,
    limit: Object,
    weekStartsWith: Number,
    iconControlLeft: String,
    iconControlRight: String,
    dateClass: Function,
    yearMonthFormatter: Function,
    weekNumbers: Boolean
  },
  components: { Btn: Btn },
  computed: {
    weekDays: function weekDays() {
      var days = [];
      var firstDay = this.weekStartsWith;
      while (days.length < 7) {
        days.push(firstDay++);
        if (firstDay > 6) {
          firstDay = 0;
        }
      }
      return days;
    },
    yearMonthStr: function yearMonthStr() {
      if (this.yearMonthFormatter) {
        return this.yearMonthFormatter(this.year, this.month);
      } else {
        return isExist(this.month) ? this.year + ' ' + this.t('uiv.datePicker.month' + (this.month + 1)) : this.year;
      }
    },
    monthDayRows: function monthDayRows() {
      var rows = [];
      var firstDay = new Date(this.year, this.month, 1);
      var prevMonthLastDate = new Date(this.year, this.month, 0).getDate();
      var startIndex = firstDay.getDay();
      // console.log(startIndex)
      var daysNum = daysInMonth(this.month, this.year);
      var weekOffset = 0;
      if (this.weekStartsWith > startIndex) {
        weekOffset = 7 - this.weekStartsWith;
      } else {
        weekOffset = 0 - this.weekStartsWith;
      }
      // console.log(prevMonthLastDate, startIndex, daysNum)
      for (var i = 0; i < 6; i++) {
        rows.push([]);
        for (var j = 0 - weekOffset; j < 7 - weekOffset; j++) {
          var currentIndex = i * 7 + j;
          var date = { year: this.year, disabled: false
            // date in and not in current month
          };if (currentIndex < startIndex) {
            date.date = prevMonthLastDate - startIndex + currentIndex + 1;
            if (this.month > 0) {
              date.month = this.month - 1;
            } else {
              date.month = 11;
              date.year--;
            }
          } else if (currentIndex < startIndex + daysNum) {
            date.date = currentIndex - startIndex + 1;
            date.month = this.month;
          } else {
            date.date = currentIndex - startIndex - daysNum + 1;
            if (this.month < 11) {
              date.month = this.month + 1;
            } else {
              date.month = 0;
              date.year++;
            }
          }
          // process limit dates
          var dateObj = new Date(date.year, date.month, date.date);
          var afterFrom = true;
          var beforeTo = true;
          if (this.limit && this.limit.from) {
            afterFrom = dateObj >= this.limit.from;
          }
          if (this.limit && this.limit.to) {
            beforeTo = dateObj < this.limit.to;
          }
          date.disabled = !afterFrom || !beforeTo;
          date.classes = isFunction(this.dateClass) ? this.dateClass(dateObj) : '';
          rows[i].push(date);
        }
      }
      return rows;
    }
  },
  methods: {
    getWeekNumber: getWeekNumber,
    tWeekName: function tWeekName(index) {
      return this.t('uiv.datePicker.week' + index);
    },
    getBtnType: function getBtnType(date) {
      if (this.date && date.date === this.date.getDate() && date.month === this.date.getMonth() && date.year === this.date.getFullYear()) {
        return 'primary';
      } else if (date.date === this.today.getDate() && date.month === this.today.getMonth() && date.year === this.today.getFullYear()) {
        return 'info';
      } else {
        return 'default';
      }
    },
    select: function select(date) {
      this.$emit('date-change', date);
    },
    goPrevMonth: function goPrevMonth() {
      var month = this.month;
      var year = this.year;
      if (this.month > 0) {
        month--;
      } else {
        month = 11;
        year--;
        this.$emit('year-change', year);
      }
      this.$emit('month-change', month);
    },
    goNextMonth: function goNextMonth() {
      var month = this.month;
      var year = this.year;
      if (this.month < 11) {
        month++;
      } else {
        month = 0;
        year++;
        this.$emit('year-change', year);
      }
      this.$emit('month-change', month);
    },
    changeView: function changeView() {
      this.$emit('view-change', 'm');
    }
  }
};

var MonthView = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('table', { staticStyle: { "width": "100%" }, attrs: { "role": "grid" } }, [_c('thead', [_c('tr', [_c('td', [_c('btn', { staticStyle: { "border": "none" }, attrs: { "block": "", "size": "sm" }, on: { "click": _vm.goPrevYear } }, [_c('i', { class: _vm.iconControlLeft })])], 1), _vm._v(" "), _c('td', { attrs: { "colspan": "4" } }, [_c('btn', { staticStyle: { "border": "none" }, attrs: { "block": "", "size": "sm" }, on: { "click": function click($event) {
          _vm.changeView();
        } } }, [_c('b', [_vm._v(_vm._s(_vm.year))])])], 1), _vm._v(" "), _c('td', [_c('btn', { staticStyle: { "border": "none" }, attrs: { "block": "", "size": "sm" }, on: { "click": _vm.goNextYear } }, [_c('i', { class: _vm.iconControlRight })])], 1)])]), _vm._v(" "), _c('tbody', _vm._l(_vm.rows, function (row, i) {
      return _c('tr', _vm._l(row, function (month, j) {
        return _c('td', { attrs: { "colspan": "2", "width": "33.333333%" } }, [_c('btn', { staticStyle: { "border": "none" }, attrs: { "block": "", "size": "sm", "type": _vm.getBtnClass(i * 3 + j) }, on: { "click": function click($event) {
              _vm.changeView(i * 3 + j);
            } } }, [_c('span', [_vm._v(_vm._s(_vm.tCell(month)))])])], 1);
      }));
    }))]);
  }, staticRenderFns: [],
  components: { Btn: Btn },
  mixins: [Local],
  props: {
    month: Number,
    year: Number,
    iconControlLeft: String,
    iconControlRight: String
  },
  data: function data() {
    return {
      rows: []
    };
  },
  mounted: function mounted() {
    for (var i = 0; i < 4; i++) {
      this.rows.push([]);
      for (var j = 0; j < 3; j++) {
        this.rows[i].push(i * 3 + j + 1);
      }
    }
  },

  methods: {
    tCell: function tCell(cell) {
      return this.t('uiv.datePicker.month' + cell);
    },
    getBtnClass: function getBtnClass(month) {
      if (month === this.month) {
        return 'primary';
      } else {
        return 'default';
      }
    },
    goPrevYear: function goPrevYear() {
      this.$emit('year-change', this.year - 1);
    },
    goNextYear: function goNextYear() {
      this.$emit('year-change', this.year + 1);
    },
    changeView: function changeView(monthIndex) {
      if (isExist(monthIndex)) {
        this.$emit('month-change', monthIndex);
        this.$emit('view-change', 'd');
      } else {
        this.$emit('view-change', 'y');
      }
    }
  }
};

var YearView = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('table', { staticStyle: { "width": "100%" }, attrs: { "role": "grid" } }, [_c('thead', [_c('tr', [_c('td', [_c('btn', { staticStyle: { "border": "none" }, attrs: { "block": "", "size": "sm" }, on: { "click": _vm.goPrevYear } }, [_c('i', { class: _vm.iconControlLeft })])], 1), _vm._v(" "), _c('td', { attrs: { "colspan": "3" } }, [_c('btn', { staticStyle: { "border": "none" }, attrs: { "block": "", "size": "sm" } }, [_c('b', [_vm._v(_vm._s(_vm.yearStr))])])], 1), _vm._v(" "), _c('td', [_c('btn', { staticStyle: { "border": "none" }, attrs: { "block": "", "size": "sm" }, on: { "click": _vm.goNextYear } }, [_c('i', { class: _vm.iconControlRight })])], 1)])]), _vm._v(" "), _c('tbody', _vm._l(_vm.rows, function (row) {
      return _c('tr', _vm._l(row, function (year) {
        return _c('td', { attrs: { "width": "20%" } }, [_c('btn', { staticStyle: { "border": "none" }, attrs: { "block": "", "size": "sm", "type": _vm.getBtnClass(year) }, on: { "click": function click($event) {
              _vm.changeView(year);
            } } }, [_c('span', [_vm._v(_vm._s(year))])])], 1);
      }));
    }))]);
  }, staticRenderFns: [],
  components: { Btn: Btn },
  props: {
    year: Number,
    iconControlLeft: String,
    iconControlRight: String
  },
  computed: {
    rows: function rows() {
      var rows = [];
      var yearGroupStart = this.year - this.year % 20;
      for (var i = 0; i < 4; i++) {
        rows.push([]);
        for (var j = 0; j < 5; j++) {
          rows[i].push(yearGroupStart + i * 5 + j);
        }
      }
      return rows;
    },
    yearStr: function yearStr() {
      var start = this.year - this.year % 20;
      return start + ' ~ ' + (start + 19);
    }
  },
  methods: {
    getBtnClass: function getBtnClass(year) {
      if (year === this.year) {
        return 'primary';
      } else {
        return 'default';
      }
    },
    goPrevYear: function goPrevYear() {
      this.$emit('year-change', this.year - 20);
    },
    goNextYear: function goNextYear() {
      this.$emit('year-change', this.year + 20);
    },
    changeView: function changeView(year) {
      this.$emit('year-change', year);
      this.$emit('view-change', 'm');
    }
  }
};

var DatePicker = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { style: _vm.pickerStyle, attrs: { "data-role": "date-picker" }, on: { "click": _vm.onPickerClick } }, [_c('date-view', { directives: [{ name: "show", rawName: "v-show", value: _vm.view === 'd', expression: "view==='d'" }], attrs: { "month": _vm.currentMonth, "year": _vm.currentYear, "date": _vm.valueDateObj, "today": _vm.now, "limit": _vm.limit, "week-starts-with": _vm.weekStartsWith, "icon-control-left": _vm.iconControlLeft, "icon-control-right": _vm.iconControlRight, "date-class": _vm.dateClass, "year-month-formatter": _vm.yearMonthFormatter, "week-numbers": _vm.weekNumbers, "locale": _vm.locale }, on: { "month-change": _vm.onMonthChange, "year-change": _vm.onYearChange, "date-change": _vm.onDateChange, "view-change": _vm.onViewChange } }), _vm._v(" "), _c('month-view', { directives: [{ name: "show", rawName: "v-show", value: _vm.view === 'm', expression: "view==='m'" }], attrs: { "month": _vm.currentMonth, "year": _vm.currentYear, "icon-control-left": _vm.iconControlLeft, "icon-control-right": _vm.iconControlRight, "locale": _vm.locale }, on: { "month-change": _vm.onMonthChange, "year-change": _vm.onYearChange, "view-change": _vm.onViewChange } }), _vm._v(" "), _c('year-view', { directives: [{ name: "show", rawName: "v-show", value: _vm.view === 'y', expression: "view==='y'" }], attrs: { "year": _vm.currentYear, "icon-control-left": _vm.iconControlLeft, "icon-control-right": _vm.iconControlRight }, on: { "year-change": _vm.onYearChange, "view-change": _vm.onViewChange } }), _vm._v(" "), _vm.todayBtn || _vm.clearBtn ? _c('div', [_c('br'), _vm._v(" "), _c('div', { staticClass: "text-center" }, [_vm.todayBtn ? _c('btn', { attrs: { "data-action": "select", "type": "info", "size": "sm" }, domProps: { "textContent": _vm._s(_vm.t('uiv.datePicker.today')) }, on: { "click": _vm.selectToday } }) : _vm._e(), _vm._v(" "), _vm.clearBtn ? _c('btn', { attrs: { "data-action": "select", "size": "sm" }, domProps: { "textContent": _vm._s(_vm.t('uiv.datePicker.clear')) }, on: { "click": _vm.clearSelect } }) : _vm._e()], 1)]) : _vm._e()], 1);
  }, staticRenderFns: [],
  mixins: [Local],
  components: { DateView: DateView, MonthView: MonthView, YearView: YearView, Btn: Btn },
  props: {
    value: null,
    width: {
      type: Number,
      default: 270
    },
    todayBtn: {
      type: Boolean,
      default: true
    },
    clearBtn: {
      type: Boolean,
      default: true
    },
    closeOnSelected: {
      type: Boolean,
      default: true
    },
    limitFrom: null,
    limitTo: null,
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    initialView: {
      type: String,
      default: 'd'
    },
    dateParser: {
      type: Function,
      default: Date.parse
    },
    dateClass: Function,
    yearMonthFormatter: Function,
    weekStartsWith: {
      type: Number,
      default: 0,
      validator: function validator(value) {
        return value >= 0 && value <= 6;
      }
    },
    weekNumbers: Boolean,
    iconControlLeft: {
      type: String,
      default: 'glyphicon glyphicon-chevron-left'
    },
    iconControlRight: {
      type: String,
      default: 'glyphicon glyphicon-chevron-right'
    }
  },
  data: function data() {
    return {
      show: false,
      now: new Date(),
      currentMonth: 0,
      currentYear: 0,
      view: 'd'
    };
  },

  computed: {
    valueDateObj: function valueDateObj() {
      var ts = this.dateParser(this.value);
      if (isNaN(ts)) {
        return null;
      } else {
        var date = new Date(ts);
        if (date.getHours() !== 0) {
          date = new Date(ts + date.getTimezoneOffset() * 60 * 1000);
        }
        return date;
      }
    },
    pickerStyle: function pickerStyle() {
      return {
        width: this.width + 'px'
      };
    },
    limit: function limit() {
      var limit = {};
      if (this.limitFrom) {
        var limitFrom = this.dateParser(this.limitFrom);
        if (!isNaN(limitFrom)) {
          limitFrom = convertDateToUTC(new Date(limitFrom));
          limitFrom.setHours(0, 0, 0, 0);
          limit.from = limitFrom;
        }
      }
      if (this.limitTo) {
        var limitTo = this.dateParser(this.limitTo);
        if (!isNaN(limitTo)) {
          limitTo = convertDateToUTC(new Date(limitTo));
          limitTo.setHours(0, 0, 0, 0);
          limit.to = limitTo;
        }
      }
      return limit;
    }
  },
  mounted: function mounted() {
    if (this.value) {
      this.setMonthAndYearByValue(this.value);
    } else {
      this.currentMonth = this.now.getMonth();
      this.currentYear = this.now.getFullYear();
      this.view = this.initialView;
    }
  },

  watch: {
    value: function value(val, oldVal) {
      this.setMonthAndYearByValue(val, oldVal);
    }
  },
  methods: {
    setMonthAndYearByValue: function setMonthAndYearByValue(val, oldVal) {
      var ts = this.dateParser(val);
      if (!isNaN(ts)) {
        var date = new Date(ts);
        if (date.getHours() !== 0) {
          date = new Date(ts + date.getTimezoneOffset() * 60 * 1000);
        }
        if (this.limit && (this.limit.from && date < this.limit.from || this.limit.to && date >= this.limit.to)) {
          this.$emit('input', oldVal || '');
        } else {
          this.currentMonth = date.getMonth();
          this.currentYear = date.getFullYear();
        }
      }
    },
    onMonthChange: function onMonthChange(month) {
      this.currentMonth = month;
    },
    onYearChange: function onYearChange(year) {
      this.currentYear = year;
      this.currentMonth = undefined;
    },
    onDateChange: function onDateChange(date) {
      if (date && isNumber(date.date) && isNumber(date.month) && isNumber(date.year)) {
        var _date = new Date(date.year, date.month, date.date);
        this.$emit('input', stringify(_date, this.format));
      } else {
        this.$emit('input', '');
      }
    },
    onViewChange: function onViewChange(view) {
      this.view = view;
    },
    selectToday: function selectToday() {
      this.view = 'd';
      this.onDateChange({
        date: this.now.getDate(),
        month: this.now.getMonth(),
        year: this.now.getFullYear()
      });
    },
    clearSelect: function clearSelect() {
      this.currentMonth = this.now.getMonth();
      this.currentYear = this.now.getFullYear();
      this.view = this.initialView;
      this.onDateChange();
    },
    onPickerClick: function onPickerClick(event) {
      if (event.target.getAttribute('data-action') !== 'select' || !this.closeOnSelected) {
        event.stopPropagation();
      }
    }
  }
};

var HANDLER = '_uiv_scroll_handler';
var events = [EVENTS.RESIZE, EVENTS.SCROLL];

var bind = function bind(el, binding) {
  var callback = binding.value;
  if (!isFunction(callback)) {
    return;
  }
  unbind(el);
  el[HANDLER] = callback;
  events.forEach(function (event) {
    on(window, event, el[HANDLER]);
  });
};

var unbind = function unbind(el) {
  events.forEach(function (event) {
    off(window, event, el[HANDLER]);
  });
  delete el[HANDLER];
};

var update = function update(el, binding) {
  if (binding.value !== binding.oldValue) {
    bind(el, binding);
  }
};

var scroll = { bind: bind, unbind: unbind, update: update };

var Affix = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "hidden-print" }, [_c('div', { directives: [{ name: "scroll", rawName: "v-scroll", value: _vm.onScroll, expression: "onScroll" }], class: _vm.classes, style: _vm.styles }, [_vm._t("default")], 2)]);
  }, staticRenderFns: [],
  directives: {
    scroll: scroll
  },
  props: {
    offset: {
      type: Number,
      default: 0
    }
  },
  data: function data() {
    return {
      affixed: false
    };
  },

  computed: {
    classes: function classes() {
      return {
        affix: this.affixed
      };
    },
    styles: function styles() {
      return {
        top: this.affixed ? this.offset + 'px' : null
      };
    }
  },
  methods: {
    // from https://github.com/ant-design/ant-design/blob/master/components/affix/index.jsx#L20
    onScroll: function onScroll() {
      var _this = this;

      // if is hidden don't calculate anything
      if (!(this.$el.offsetWidth || this.$el.offsetHeight || this.$el.getClientRects().length)) {
        return;
      }
      // get window scroll and element position to detect if have to be normal or affixed
      var scroll$$1 = {};
      var element = {};
      var rect = this.$el.getBoundingClientRect();
      var body = document.body;
      var _arr = ['Top', 'Left'];
      for (var _i = 0; _i < _arr.length; _i++) {
        var type = _arr[_i];
        var t = type.toLowerCase();
        scroll$$1[t] = window['page' + (type === 'Top' ? 'Y' : 'X') + 'Offset'];
        element[t] = scroll$$1[t] + rect[t] - (this.$el['client' + type] || body['client' + type] || 0);
      }
      var fix = scroll$$1.top > element.top - this.offset;
      if (this.affixed !== fix) {
        this.affixed = fix;
        if (this.affixed) {
          this.$emit('affix');
          this.$nextTick(function () {
            _this.$emit('affixed');
          });
        }
      }
    }
  }
};

var Alert = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.alertClass, attrs: { "role": "alert" } }, [_vm.dismissible ? _c('button', { staticClass: "close", attrs: { "type": "button", "aria-label": "Close" }, on: { "click": _vm.closeAlert } }, [_c('span', { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]) : _vm._e(), _vm._v(" "), _vm._t("default")], 2);
  }, staticRenderFns: [],
  props: {
    dismissible: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'info'
    }
  },
  data: function data() {
    return {
      timeout: 0
    };
  },

  computed: {
    alertClass: function alertClass() {
      var _ref;

      return _ref = {
        'alert': true
      }, defineProperty(_ref, "alert-" + this.type, Boolean(this.type)), defineProperty(_ref, 'alert-dismissible', this.dismissible), _ref;
    }
  },
  methods: {
    closeAlert: function closeAlert() {
      clearTimeout(this.timeout);
      this.$emit('dismissed');
    }
  },
  mounted: function mounted() {
    if (this.duration > 0) {
      this.timeout = setTimeout(this.closeAlert, this.duration);
    }
  },
  destroyed: function destroyed() {
    clearTimeout(this.timeout);
  }
};

var Pagination = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('nav', { class: _vm.navClasses, attrs: { "aria-label": "Page navigation" } }, [_c('ul', { staticClass: "pagination", class: _vm.classes }, [_vm.boundaryLinks ? _c('li', { class: { disabled: _vm.value <= 1 || _vm.disabled } }, [_c('a', { attrs: { "href": "#", "role": "button", "aria-label": "First" }, on: { "click": function click($event) {
          $event.preventDefault();_vm.onPageChange(1);
        } } }, [_c('span', { attrs: { "aria-hidden": "true" } }, [_vm._v("«")])])]) : _vm._e(), _vm._v(" "), _vm.directionLinks ? _c('li', { class: { disabled: _vm.value <= 1 || _vm.disabled } }, [_c('a', { attrs: { "href": "#", "role": "button", "aria-label": "Previous" }, on: { "click": function click($event) {
          $event.preventDefault();_vm.onPageChange(_vm.value - 1);
        } } }, [_c('span', { attrs: { "aria-hidden": "true" } }, [_vm._v("‹")])])]) : _vm._e(), _vm._v(" "), _vm.sliceStart > 0 ? _c('li', { class: { disabled: _vm.disabled } }, [_c('a', { attrs: { "href": "#", "role": "button", "aria-label": "Previous group" }, on: { "click": function click($event) {
          $event.preventDefault();_vm.toPage(1);
        } } }, [_c('span', { attrs: { "aria-hidden": "true" } }, [_vm._v("…")])])]) : _vm._e(), _vm._v(" "), _vm._l(_vm.sliceArray, function (item) {
      return _c('li', { key: item, class: { active: _vm.value === item + 1, disabled: _vm.disabled } }, [_c('a', { attrs: { "href": "#", "role": "button" }, on: { "click": function click($event) {
            $event.preventDefault();_vm.onPageChange(item + 1);
          } } }, [_vm._v(_vm._s(item + 1))])]);
    }), _vm._v(" "), _vm.sliceStart < _vm.totalPage - _vm.maxSize ? _c('li', { class: { disabled: _vm.disabled } }, [_c('a', { attrs: { "href": "#", "role": "button", "aria-label": "Next group" }, on: { "click": function click($event) {
          $event.preventDefault();_vm.toPage(0);
        } } }, [_c('span', { attrs: { "aria-hidden": "true" } }, [_vm._v("…")])])]) : _vm._e(), _vm._v(" "), _vm.directionLinks ? _c('li', { class: { disabled: _vm.value >= _vm.totalPage || _vm.disabled } }, [_c('a', { attrs: { "href": "#", "role": "button", "aria-label": "Next" }, on: { "click": function click($event) {
          $event.preventDefault();_vm.onPageChange(_vm.value + 1);
        } } }, [_c('span', { attrs: { "aria-hidden": "true" } }, [_vm._v("›")])])]) : _vm._e(), _vm._v(" "), _vm.boundaryLinks ? _c('li', { class: { disabled: _vm.value >= _vm.totalPage || _vm.disabled } }, [_c('a', { attrs: { "href": "#", "role": "button", "aria-label": "Last" }, on: { "click": function click($event) {
          $event.preventDefault();_vm.onPageChange(_vm.totalPage);
        } } }, [_c('span', { attrs: { "aria-hidden": "true" } }, [_vm._v("»")])])]) : _vm._e()], 2)]);
  }, staticRenderFns: [],
  props: {
    value: {
      type: Number,
      required: true,
      validator: function validator(v) {
        return v >= 1;
      }
    },
    boundaryLinks: {
      type: Boolean,
      default: false
    },
    directionLinks: {
      type: Boolean,
      default: true
    },
    size: String,
    align: String,
    totalPage: {
      type: Number,
      required: true,
      validator: function validator(v) {
        return v >= 0;
      }
    },
    maxSize: {
      type: Number,
      default: 5,
      validator: function validator(v) {
        return v >= 0;
      }
    },
    disabled: Boolean
  },
  data: function data() {
    return {
      sliceStart: 0
    };
  },

  computed: {
    navClasses: function navClasses() {
      return defineProperty({}, 'text-' + this.align, Boolean(this.align));
    },
    classes: function classes() {
      return defineProperty({}, 'pagination-' + this.size, Boolean(this.size));
    },
    sliceArray: function sliceArray() {
      return range(this.totalPage).slice(this.sliceStart, this.sliceStart + this.maxSize);
    }
  },
  methods: {
    calculateSliceStart: function calculateSliceStart() {
      var currentPage = this.value;
      var chunkSize = this.maxSize;
      var currentChunkStart = this.sliceStart;
      var currentChunkEnd = currentChunkStart + chunkSize;
      if (currentPage > currentChunkEnd) {
        var lastChunkStart = this.totalPage - chunkSize;
        if (currentPage > lastChunkStart) {
          this.sliceStart = lastChunkStart;
        } else {
          this.sliceStart = currentPage - 1;
        }
      } else if (currentPage < currentChunkStart + 1) {
        if (currentPage > chunkSize) {
          this.sliceStart = currentPage - chunkSize;
        } else {
          this.sliceStart = 0;
        }
      }
    },
    onPageChange: function onPageChange(page) {
      if (!this.disabled && page > 0 && page <= this.totalPage && page !== this.value) {
        this.$emit('input', page);
        this.$emit('change', page);
      }
    },
    toPage: function toPage(pre) {
      if (this.disabled) {
        return;
      }
      var chunkSize = this.maxSize;
      var currentChunkStart = this.sliceStart;
      var lastChunkStart = this.totalPage - chunkSize;
      var start = pre ? currentChunkStart - chunkSize : currentChunkStart + chunkSize;
      if (start < 0) {
        this.sliceStart = 0;
      } else if (start > lastChunkStart) {
        this.sliceStart = lastChunkStart;
      } else {
        this.sliceStart = start;
      }
    }
  },
  created: function created() {
    this.$watch(function (vm) {
      return [vm.value, vm.maxSize, vm.totalPage].join();
    }, this.calculateSliceStart, {
      immediate: true
    });
  }
};

var SHOW_CLASS = 'in';

var popupMixin = {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'span'
    },
    placement: {
      type: String,
      default: PLACEMENTS.TOP
    },
    autoPlacement: {
      type: Boolean,
      default: true
    },
    appendTo: {
      type: String,
      default: 'body'
    },
    transitionDuration: {
      type: Number,
      default: 150
    },
    enable: {
      type: Boolean,
      default: true
    },
    enterable: {
      type: Boolean,
      default: true
    },
    target: null
  },
  data: function data() {
    return {
      triggerEl: null,
      timeoutId: 0
    };
  },

  watch: {
    value: function value(v) {
      v ? this.show() : this.hide();
    },
    trigger: function trigger() {
      this.clearListeners();
      this.initListeners();
    },
    target: function target(value) {
      this.clearListeners();
      this.initTriggerElByTarget(value);
      this.initListeners();
    },
    allContent: function allContent(value) {
      var _this = this;

      // can not use value because it can not detect slot changes
      if (this.isNotEmpty()) {
        // reset position while content changed & is shown
        // nextTick is required
        this.$nextTick(function () {
          if (_this.isShown()) {
            _this.resetPosition();
          }
        });
      } else {
        this.hide();
      }
    },
    enable: function enable(value) {
      // hide if enable changed to false
      if (!value) {
        this.hide();
      }
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    ensureElementMatchesFunction();
    removeFromDom(this.$refs.popup);
    this.$nextTick(function () {
      _this2.initTriggerElByTarget(_this2.target);
      _this2.initListeners();
      if (_this2.value) {
        _this2.show();
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.clearListeners();
    removeFromDom(this.$refs.popup);
  },

  methods: {
    initTriggerElByTarget: function initTriggerElByTarget(target) {
      if (target) {
        // target exist
        if (isString(target)) {
          // is selector
          this.triggerEl = document.querySelector(target);
        } else if (isElement(target)) {
          // is element
          this.triggerEl = target;
        } else if (isElement(target.$el)) {
          // is component
          this.triggerEl = target.$el;
        }
      } else {
        // find special element
        var trigger = this.$el.querySelector('[data-role="trigger"]');
        if (trigger) {
          this.triggerEl = trigger;
        } else {
          // use the first child
          var firstChild = this.$el.firstChild;
          this.triggerEl = firstChild === this.$refs.popup ? null : firstChild;
        }
      }
    },
    initListeners: function initListeners() {
      if (this.triggerEl) {
        if (this.trigger === TRIGGERS.HOVER) {
          on(this.triggerEl, EVENTS.MOUSE_ENTER, this.show);
          on(this.triggerEl, EVENTS.MOUSE_LEAVE, this.hide);
        } else if (this.trigger === TRIGGERS.FOCUS) {
          on(this.triggerEl, EVENTS.FOCUS, this.show);
          on(this.triggerEl, EVENTS.BLUR, this.hide);
        } else if (this.trigger === TRIGGERS.HOVER_FOCUS) {
          on(this.triggerEl, EVENTS.MOUSE_ENTER, this.handleAuto);
          on(this.triggerEl, EVENTS.MOUSE_LEAVE, this.handleAuto);
          on(this.triggerEl, EVENTS.FOCUS, this.handleAuto);
          on(this.triggerEl, EVENTS.BLUR, this.handleAuto);
        } else if (this.trigger === TRIGGERS.CLICK || this.trigger === TRIGGERS.OUTSIDE_CLICK) {
          on(this.triggerEl, EVENTS.CLICK, this.toggle);
        }
      }
      on(window, EVENTS.CLICK, this.windowClicked);
    },
    clearListeners: function clearListeners() {
      if (this.triggerEl) {
        off(this.triggerEl, EVENTS.FOCUS, this.show);
        off(this.triggerEl, EVENTS.BLUR, this.hide);
        off(this.triggerEl, EVENTS.MOUSE_ENTER, this.show);
        off(this.triggerEl, EVENTS.MOUSE_LEAVE, this.hide);
        off(this.triggerEl, EVENTS.CLICK, this.toggle);
        off(this.triggerEl, EVENTS.MOUSE_ENTER, this.handleAuto);
        off(this.triggerEl, EVENTS.MOUSE_LEAVE, this.handleAuto);
        off(this.triggerEl, EVENTS.FOCUS, this.handleAuto);
        off(this.triggerEl, EVENTS.BLUR, this.handleAuto);
      }
      off(window, EVENTS.CLICK, this.windowClicked);
    },
    resetPosition: function resetPosition() {
      var popup = this.$refs.popup;
      setTooltipPosition(popup, this.triggerEl, this.placement, this.autoPlacement, this.appendTo);
      popup.offsetHeight;
    },
    hideOnLeave: function hideOnLeave() {
      if (this.trigger === TRIGGERS.HOVER || this.trigger === TRIGGERS.HOVER_FOCUS && !this.triggerEl.matches(':focus')) {
        this.$hide();
      }
    },
    toggle: function toggle() {
      if (this.isShown()) {
        this.hide();
      } else {
        this.show();
      }
    },
    show: function show() {
      if (this.enable && this.triggerEl && this.isNotEmpty() && !this.isShown()) {
        var popup = this.$refs.popup;
        if (this.timeoutId > 0) {
          clearTimeout(this.timeoutId);
          this.timeoutId = 0;
        } else {
          popup.className = this.name + ' ' + this.placement + ' fade';
          var container = document.querySelector(this.appendTo);
          container.appendChild(popup);
          this.resetPosition();
        }
        addClass(popup, SHOW_CLASS);
        this.$emit('input', true);
        this.$emit('show');
      }
    },
    hide: function hide() {
      var _this3 = this;

      if (!this.isShown()) {
        return;
      }
      if (this.enterable && (this.trigger === TRIGGERS.HOVER || this.trigger === TRIGGERS.HOVER_FOCUS)) {
        setTimeout(function () {
          if (!_this3.$refs.popup.matches(':hover')) {
            _this3.$hide();
          }
        }, 100);
      } else {
        this.$hide();
      }
    },
    $hide: function $hide() {
      var _this4 = this;

      if (this.isShown()) {
        clearTimeout(this.timeoutId);
        removeClass(this.$refs.popup, SHOW_CLASS);
        this.timeoutId = setTimeout(function () {
          removeFromDom(_this4.$refs.popup);
          _this4.timeoutId = 0;
          _this4.$emit('input', false);
          _this4.$emit('hide');
        }, this.transitionDuration);
      }
    },
    isShown: function isShown() {
      return hasClass(this.$refs.popup, SHOW_CLASS);
    },
    windowClicked: function windowClicked(event) {
      if (this.triggerEl && !this.triggerEl.contains(event.target) && this.trigger === TRIGGERS.OUTSIDE_CLICK && !this.$refs.popup.contains(event.target) && this.isShown()) {
        this.hide();
      }
    },
    handleAuto: function handleAuto() {
      var _this5 = this;

      setTimeout(function () {
        if (_this5.triggerEl.matches(':hover, :focus')) {
          _this5.show();
        } else {
          _this5.hide();
        }
      }, 20); // 20ms make firefox happy
    }
  }
};

var Tooltip = {
  mixins: [popupMixin],
  data: function data() {
    return {
      name: 'tooltip'
    };
  },
  render: function render(h) {
    return h(this.tag, [this.$slots.default, h('div', {
      ref: 'popup',
      attrs: {
        role: 'tooltip'
      },
      on: {
        mouseleave: this.hideOnLeave
      }
    }, [h('div', { 'class': 'tooltip-arrow' }), h('div', {
      'class': 'tooltip-inner',
      domProps: { innerHTML: this.text }
    })])]);
  },

  props: {
    text: {
      type: String,
      default: ''
    },
    trigger: {
      type: String,
      default: TRIGGERS.HOVER_FOCUS
    }
  },
  computed: {
    allContent: function allContent() {
      return this.text;
    }
  },
  methods: {
    isNotEmpty: function isNotEmpty() {
      return this.text;
    }
  }
};

var Popover = {
  mixins: [popupMixin],
  data: function data() {
    return {
      name: 'popover'
    };
  },
  render: function render(h) {
    return h(this.tag, [this.$slots.default, h('div', {
      style: {
        display: 'block'
      },
      ref: 'popup',
      on: {
        mouseleave: this.hideOnLeave
      }
    }, [h('div', { 'class': 'arrow' }), h('h3', {
      'class': 'popover-title',
      directives: [{ name: 'show', value: this.title }]
    }, this.title), h('div', { 'class': 'popover-content' }, [this.content || this.$slots.popover])])]);
  },

  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    trigger: {
      type: String,
      default: TRIGGERS.OUTSIDE_CLICK
    }
  },
  computed: {
    allContent: function allContent() {
      return this.title + this.content;
    }
  },
  methods: {
    isNotEmpty: function isNotEmpty() {
      return this.title || this.content || this.$slots.popover;
    }
  }
};

var maxHours = 23;
var zero = 0;
var maxMinutes = 59;
var cutUpAmAndPm = 12;

var TimePicker = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('section', { on: { "click": function click($event) {
          $event.stopPropagation();
        } } }, [_c('table', [_c('tbody', [_vm.controls ? _c('tr', { staticClass: "text-center" }, [_c('td', [_c('btn', { attrs: { "type": "link", "size": "sm", "disabled": _vm.readonly }, on: { "click": function click($event) {
          _vm.changeTime(1, 1);
        } } }, [_c('i', { class: _vm.iconControlUp })])], 1), _vm._v(" "), _c('td', [_vm._v(" ")]), _vm._v(" "), _c('td', [_c('btn', { attrs: { "type": "link", "size": "sm", "disabled": _vm.readonly }, on: { "click": function click($event) {
          _vm.changeTime(0, 1);
        } } }, [_c('i', { class: _vm.iconControlUp })])], 1), _vm._v(" "), _vm.showMeridian ? _c('td') : _vm._e()]) : _vm._e(), _vm._v(" "), _c('tr', [_c('td', { staticClass: "form-group" }, [_c('input', { directives: [{ name: "model", rawName: "v-model.lazy", value: _vm.hoursText, expression: "hoursText", modifiers: { "lazy": true } }], ref: "hoursInput", staticClass: "form-control text-center", staticStyle: { "width": "50px" }, attrs: { "type": "tel", "pattern": "\\d*", "placeholder": "HH", "readonly": _vm.readonly, "maxlength": "2", "size": "2" }, domProps: { "value": _vm.hoursText }, on: { "mouseup": _vm.selectInputValue, "keydown": [function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "up", 38, $event.key)) {
            return null;
          }$event.preventDefault();_vm.changeTime(1, 1);
        }, function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "down", 40, $event.key)) {
            return null;
          }$event.preventDefault();_vm.changeTime(1, 0);
        }], "wheel": function wheel($event) {
          _vm.onWheel($event, true);
        }, "change": function change($event) {
          _vm.hoursText = $event.target.value;
        } } })]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('td', { staticClass: "form-group" }, [_c('input', { directives: [{ name: "model", rawName: "v-model.lazy", value: _vm.minutesText, expression: "minutesText", modifiers: { "lazy": true } }], ref: "minutesInput", staticClass: "form-control text-center", staticStyle: { "width": "50px" }, attrs: { "type": "tel", "pattern": "\\d*", "placeholder": "MM", "readonly": _vm.readonly, "maxlength": "2", "size": "2" }, domProps: { "value": _vm.minutesText }, on: { "mouseup": _vm.selectInputValue, "keydown": [function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "up", 38, $event.key)) {
            return null;
          }$event.preventDefault();_vm.changeTime(0, 1);
        }, function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "down", 40, $event.key)) {
            return null;
          }$event.preventDefault();_vm.changeTime(0, 0);
        }], "wheel": function wheel($event) {
          _vm.onWheel($event, false);
        }, "change": function change($event) {
          _vm.minutesText = $event.target.value;
        } } })]), _vm._v(" "), _vm.showMeridian ? _c('td', [_vm._v("   "), _c('btn', { attrs: { "data-action": "toggleMeridian", "disabled": _vm.readonly }, domProps: { "textContent": _vm._s(_vm.meridian ? _vm.t('uiv.timePicker.am') : _vm.t('uiv.timePicker.pm')) }, on: { "click": _vm.toggleMeridian } })], 1) : _vm._e()]), _vm._v(" "), _vm.controls ? _c('tr', { staticClass: "text-center" }, [_c('td', [_c('btn', { attrs: { "type": "link", "size": "sm", "disabled": _vm.readonly }, on: { "click": function click($event) {
          _vm.changeTime(1, 0);
        } } }, [_c('i', { class: _vm.iconControlDown })])], 1), _vm._v(" "), _c('td', [_vm._v(" ")]), _vm._v(" "), _c('td', [_c('btn', { attrs: { "type": "link", "size": "sm", "disabled": _vm.readonly }, on: { "click": function click($event) {
          _vm.changeTime(0, 0);
        } } }, [_c('i', { class: _vm.iconControlDown })])], 1), _vm._v(" "), _vm.showMeridian ? _c('td') : _vm._e()]) : _vm._e()])])]);
  }, staticRenderFns: [function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('td', [_vm._v(" "), _c('b', [_vm._v(":")]), _vm._v(" ")]);
  }],
  components: { Btn: Btn },
  mixins: [Local],
  props: {
    value: {
      type: Date,
      required: true
    },
    showMeridian: {
      type: Boolean,
      default: true
    },
    min: Date,
    max: Date,
    hourStep: {
      type: Number,
      default: 1
    },
    minStep: {
      type: Number,
      default: 1
    },
    readonly: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: true
    },
    iconControlUp: {
      type: String,
      default: 'glyphicon glyphicon-chevron-up'
    },
    iconControlDown: {
      type: String,
      default: 'glyphicon glyphicon-chevron-down'
    }
  },
  data: function data() {
    return {
      hours: 0,
      minutes: 0,
      meridian: true,
      hoursText: '',
      minutesText: ''
    };
  },
  mounted: function mounted() {
    this.updateByValue(this.value);
  },

  watch: {
    value: function value(_value) {
      this.updateByValue(_value);
    },
    showMeridian: function showMeridian(value) {
      this.setTime();
    },
    hoursText: function hoursText(value) {
      if (this.hours === 0 && value === '') {
        // Prevent a runtime reset from being overwritten
        return;
      }
      var hour = parseInt(value);
      if (this.showMeridian) {
        if (hour >= 1 && hour <= cutUpAmAndPm) {
          if (this.meridian) {
            this.hours = hour === cutUpAmAndPm ? 0 : hour;
          } else {
            this.hours = hour === cutUpAmAndPm ? cutUpAmAndPm : hour + cutUpAmAndPm;
          }
        }
      } else if (hour >= zero && hour <= maxHours) {
        this.hours = hour;
      }
      this.setTime();
    },
    minutesText: function minutesText(value) {
      if (this.minutes === 0 && value === '') {
        // Prevent a runtime reset from being overwritten
        return;
      }
      var minutesStr = parseInt(value);
      if (minutesStr >= zero && minutesStr <= maxMinutes) {
        this.minutes = minutesStr;
      }
      this.setTime();
    }
  },
  methods: {
    updateByValue: function updateByValue(value) {
      if (isNaN(value.getTime())) {
        this.hours = 0;
        this.minutes = 0;
        this.hoursText = '';
        this.minutesText = '';
        this.meridian = true;
        return;
      }
      this.hours = value.getHours();
      this.minutes = value.getMinutes();
      if (!this.showMeridian) {
        this.hoursText = pad(this.hours, 2);
      } else {
        if (this.hours >= cutUpAmAndPm) {
          if (this.hours === cutUpAmAndPm) {
            this.hoursText = this.hours + '';
          } else {
            this.hoursText = pad(this.hours - cutUpAmAndPm, 2);
          }
          this.meridian = false;
        } else {
          if (this.hours === zero) {
            this.hoursText = cutUpAmAndPm.toString();
          } else {
            this.hoursText = pad(this.hours, 2);
          }
          this.meridian = true;
        }
      }
      this.minutesText = pad(this.minutes, 2);
      // lazy model won't update when using keyboard up/down
      this.$refs.hoursInput.value = this.hoursText;
      this.$refs.minutesInput.value = this.minutesText;
    },
    addHour: function addHour(step) {
      step = step || this.hourStep;
      this.hours = this.hours >= maxHours ? zero : this.hours + step;
    },
    reduceHour: function reduceHour(step) {
      step = step || this.hourStep;
      this.hours = this.hours <= zero ? maxHours : this.hours - step;
    },
    addMinute: function addMinute() {
      if (this.minutes >= maxMinutes) {
        this.minutes = zero;
        this.addHour(1);
      } else {
        this.minutes += this.minStep;
      }
    },
    reduceMinute: function reduceMinute() {
      if (this.minutes <= zero) {
        this.minutes = maxMinutes;
        this.reduceHour(1);
      } else {
        this.minutes -= this.minStep;
      }
    },
    changeTime: function changeTime(isHour, isPlus) {
      if (!this.readonly) {
        if (isHour && isPlus) {
          this.addHour();
        } else if (isHour && !isPlus) {
          this.reduceHour();
        } else if (!isHour && isPlus) {
          this.addMinute();
        } else {
          this.reduceMinute();
        }
        this.setTime();
      }
    },
    toggleMeridian: function toggleMeridian() {
      this.meridian = !this.meridian;
      if (this.meridian) {
        this.hours -= cutUpAmAndPm;
      } else {
        this.hours += cutUpAmAndPm;
      }
      this.setTime();
    },
    onWheel: function onWheel(e, isHour) {
      if (!this.readonly) {
        e.preventDefault();
        this.changeTime(isHour, e.deltaY < 0);
      }
    },
    setTime: function setTime() {
      var time = this.value;
      if (isNaN(time.getTime())) {
        time = new Date();
        time.setHours(0);
        time.setMinutes(0);
      }
      time.setHours(this.hours);
      time.setMinutes(this.minutes);
      if (this.max) {
        var max = new Date(time);
        max.setHours(this.max.getHours());
        max.setMinutes(this.max.getMinutes());
        time = time > max ? max : time;
      }
      if (this.min) {
        var min = new Date(time);
        min.setHours(this.min.getHours());
        min.setMinutes(this.min.getMinutes());
        time = time < min ? min : time;
      }
      this.$emit('input', new Date(time));
    },
    selectInputValue: function selectInputValue(e) {
      // mouseup should be prevented!
      // See various comments in https://stackoverflow.com/questions/3272089/programmatically-selecting-text-in-an-input-field-on-ios-devices-mobile-safari
      e.target.setSelectionRange(0, 2);
    }
  }
};

function getRequest(url) {
  var request = new window.XMLHttpRequest();
  var data = {};
  var p = {
    then: function then(fn1, fn2) {
      return p.done(fn1).fail(fn2);
    },
    catch: function _catch(fn) {
      return p.fail(fn);
    },
    always: function always(fn) {
      return p.done(fn).fail(fn);
    }
  };
  var statuses = ['done', 'fail'];
  statuses.forEach(function (name) {
    data[name] = [];
    p[name] = function (fn) {
      if (fn instanceof Function) data[name].push(fn);
      return p;
    };
  });
  p.done(JSON.parse);
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      var e = { status: request.status };
      if (request.status === 200) {
        var response = request.responseText;
        for (var i in data.done) {
          if (data.done.hasOwnProperty(i) && isFunction(data.done[i])) {
            var value = data.done[i](response);
            if (isExist(value)) {
              response = value;
            }
          }
        }
      } else {
        data.fail.forEach(function (fail) {
          return fail(e);
        });
      }
    }
  };
  request.open('GET', url);
  request.setRequestHeader('Accept', 'application/json');
  request.send();
  return p;
}

var Typeahead = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('dropdown', { ref: "dropdown", attrs: { "tag": "section", "append-to-body": _vm.appendToBody, "not-close-elements": _vm.elements, "position-element": _vm.inputEl }, model: { value: _vm.open, callback: function callback($$v) {
          _vm.open = $$v;
        }, expression: "open" } }, [_c('template', { slot: "dropdown" }, [_vm._t("item", _vm._l(_vm.items, function (item, index) {
      return _c('li', { class: { active: _vm.activeIndex === index } }, [_c('a', { attrs: { "href": "#" }, on: { "click": function click($event) {
            $event.preventDefault();_vm.selectItem(item);
          } } }, [_c('span', { domProps: { "innerHTML": _vm._s(_vm.highlight(item)) } })])]);
    }), { items: _vm.items, activeIndex: _vm.activeIndex, select: _vm.selectItem, highlight: _vm.highlight })], 2)], 2);
  }, staticRenderFns: [],
  components: { Dropdown: Dropdown },
  props: {
    value: {
      required: true
    },
    data: Array,
    itemKey: String,
    appendToBody: {
      type: Boolean,
      default: false
    },
    ignoreCase: {
      type: Boolean,
      default: true
    },
    matchStart: {
      type: Boolean,
      default: false
    },
    forceSelect: {
      type: Boolean,
      default: false
    },
    forceClear: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 10
    },
    asyncSrc: String,
    asyncKey: String,
    asyncFunction: Function,
    debounce: {
      type: Number,
      default: 200
    },
    openOnFocus: {
      type: Boolean,
      default: true
    },
    openOnEmpty: {
      type: Boolean,
      default: false
    },
    target: {
      required: true
    },
    preselect: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      inputEl: null,
      items: [],
      activeIndex: 0,
      timeoutID: 0,
      elements: [],
      open: false,
      dropdownMenuEl: null
    };
  },

  computed: {
    regexOptions: function regexOptions() {
      var options = '';
      if (this.ignoreCase) {
        options += 'i';
      }
      if (!this.matchStart) {
        options += 'g';
      }
      return options;
    }
  },
  mounted: function mounted() {
    var _this = this;

    ensureElementMatchesFunction();
    this.$nextTick(function () {
      _this.initInputElByTarget(_this.target);
      _this.initListeners();
      _this.dropdownMenuEl = _this.$refs.dropdown.$el.querySelector('.dropdown-menu');
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.removeListeners();
  },

  watch: {
    target: function target(el) {
      this.removeListeners();
      this.initInputElByTarget(el);
      this.initListeners();
    },
    value: function value(_value) {
      if (isString(_value)) {
        // direct
        this.inputEl.value = _value;
      } else if (_value) {
        // is object
        this.inputEl.value = this.itemKey ? _value[this.itemKey] : _value;
      } else if (_value === null) {
        // is null or undefined or something else not valid
        this.inputEl.value = '';
      }
    }
  },
  methods: {
    initInputElByTarget: function initInputElByTarget(target) {
      if (!target) {
        return;
      }
      if (isString(target)) {
        // is selector
        this.inputEl = document.querySelector(target);
      } else if (isElement(target)) {
        // is element
        this.inputEl = target;
      } else if (isElement(target.$el)) {
        // is component
        this.inputEl = target.$el;
      }
    },
    initListeners: function initListeners() {
      if (this.inputEl) {
        this.elements = [this.inputEl];
        on(this.inputEl, EVENTS.FOCUS, this.inputFocused);
        on(this.inputEl, EVENTS.BLUR, this.inputBlured);
        on(this.inputEl, EVENTS.INPUT, this.inputChanged);
        on(this.inputEl, EVENTS.KEY_DOWN, this.inputKeyPressed);
      }
    },
    removeListeners: function removeListeners() {
      this.elements = [];
      if (this.inputEl) {
        off(this.inputEl, EVENTS.FOCUS, this.inputFocused);
        off(this.inputEl, EVENTS.BLUR, this.inputBlured);
        off(this.inputEl, EVENTS.INPUT, this.inputChanged);
        off(this.inputEl, EVENTS.KEY_DOWN, this.inputKeyPressed);
      }
    },
    prepareItems: function prepareItems(data) {
      var disableFilters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (disableFilters) {
        this.items = data.slice(0, this.limit);
        return;
      }
      this.items = [];
      this.activeIndex = this.preselect ? 0 : -1;
      for (var i = 0, l = data.length; i < l; i++) {
        var item = data[i];
        var key = this.itemKey ? item[this.itemKey] : item;
        key = key.toString();
        var index = -1;
        if (this.ignoreCase) {
          index = key.toLowerCase().indexOf(this.inputEl.value.toLowerCase());
        } else {
          index = key.indexOf(this.inputEl.value);
        }
        if (this.matchStart ? index === 0 : index >= 0) {
          this.items.push(item);
        }
        if (this.items.length >= this.limit) {
          break;
        }
      }
    },
    fetchItems: function fetchItems(value, debounce) {
      var _this2 = this;

      clearTimeout(this.timeoutID);
      if (value === '' && !this.openOnEmpty) {
        this.open = false;
      } else if (this.data) {
        this.prepareItems(this.data);
        this.open = Boolean(this.items.length);
      } else if (this.asyncSrc) {
        this.timeoutID = setTimeout(function () {
          _this2.$emit('loading');
          getRequest(_this2.asyncSrc + encodeURIComponent(value)).then(function (data) {
            if (_this2.inputEl.matches(':focus')) {
              _this2.prepareItems(_this2.asyncKey ? data[_this2.asyncKey] : data, true);
              _this2.open = Boolean(_this2.items.length);
            }
            _this2.$emit('loaded');
          }).catch(function (err) {
            console.error(err);
            _this2.$emit('loaded-error');
          });
        }, debounce);
      } else if (this.asyncFunction) {
        var cb = function cb(data) {
          if (_this2.inputEl.matches(':focus')) {
            _this2.prepareItems(data, true);
            _this2.open = Boolean(_this2.items.length);
          }
          _this2.$emit('loaded');
        };
        this.timeoutID = setTimeout(function () {
          _this2.$emit('loading');
          _this2.asyncFunction(value, cb);
        }, debounce);
      }
    },
    inputChanged: function inputChanged() {
      var value = this.inputEl.value;
      this.fetchItems(value, this.debounce);
      this.$emit('input', this.forceSelect ? undefined : value);
    },
    inputFocused: function inputFocused() {
      if (this.openOnFocus) {
        var value = this.inputEl.value;
        this.fetchItems(value, 0);
      }
    },
    inputBlured: function inputBlured() {
      var _this3 = this;

      if (!this.dropdownMenuEl.matches(':hover')) {
        this.open = false;
      }
      if (this.inputEl && this.forceClear) {
        this.$nextTick(function () {
          if (typeof _this3.value === 'undefined') {
            _this3.inputEl.value = '';
          }
        });
      }
    },
    inputKeyPressed: function inputKeyPressed(event) {
      if (this.open) {
        switch (event.keyCode) {
          case 13:
            if (this.activeIndex >= 0) {
              this.selectItem(this.items[this.activeIndex]);
            } else {
              this.open = false;
            }
            break;
          case 27:
            this.open = false;
            break;
          case 38:
            this.activeIndex = this.activeIndex > 0 ? this.activeIndex - 1 : 0;
            break;
          case 40:
            var maxIndex = this.items.length - 1;
            this.activeIndex = this.activeIndex < maxIndex ? this.activeIndex + 1 : maxIndex;
            break;
        }
      }
    },
    selectItem: function selectItem(item) {
      this.$emit('input', item);
      this.open = false;
    },
    highlight: function highlight(item) {
      var value = this.itemKey ? item[this.itemKey] : item;
      var inputValue = this.inputEl.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      return value.replace(new RegExp('' + inputValue, this.regexOptions), '<b>$&</b>');
    }
  }
};

var ProgressBarStack = {
  functional: true,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data;

    return h('div', mergeData(data, {
      class: defineProperty({
        'progress-bar': true,
        'progress-bar-striped': props.striped,
        'active': props.striped && props.active
      }, 'progress-bar-' + props.type, Boolean(props.type)),
      style: {
        minWidth: props.minWidth ? '2em' : null,
        width: props.value + '%'
      },
      attrs: {
        role: 'progressbar',
        'aria-valuemin': 0,
        'aria-valuenow': props.value,
        'aria-valuemax': 100
      }
    }), props.label ? props.labelText ? props.labelText : props.value + '%' : null);
  },

  props: {
    value: {
      type: Number,
      required: true,
      validator: function validator(value) {
        return value >= 0 && value <= 100;
      }
    },
    labelText: String,
    type: String,
    label: {
      type: Boolean,
      default: false
    },
    minWidth: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    }
  }
};

var ProgressBar = {
  functional: true,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h('div', mergeData(data, { class: 'progress' }), children && children.length ? children : [h(ProgressBarStack, { props: props })]);
  }
};

var BreadcrumbItem = {
  functional: true,
  mixins: [linkMixin],
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    var slot = void 0;
    if (props.active) {
      slot = children;
    } else if (props.to) {
      slot = [h('router-link', {
        props: {
          to: props.to,
          replace: props.replace,
          append: props.append,
          exact: props.exact
        }
      }, children)];
    } else {
      slot = [h('a', {
        attrs: {
          href: props.href,
          target: props.target
        }
      }, children)];
    }
    return h('li', mergeData(data, { class: { active: props.active } }), slot);
  },

  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
};

var Breadcrumbs = {
  functional: true,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    var slot = [];
    if (children && children.length) {
      slot = children;
    } else if (props.items) {
      slot = props.items.map(function (item, index) {
        return h(BreadcrumbItem, {
          key: item.hasOwnProperty('key') ? item.key : index,
          props: {
            active: item.hasOwnProperty('active') ? item.active : index === props.items.length - 1,
            href: item.href,
            target: item.target,
            to: item.to,
            replace: item.replace,
            append: item.append,
            exact: item.exact
          }
        }, item.text);
      });
    }
    return h('ol', mergeData(data, { class: 'breadcrumb' }), slot);
  },

  props: {
    items: Array
  }
};

var BtnToolbar = {
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data;

    return h('div', mergeData(data, {
      class: {
        'btn-toolbar': true
      },
      attrs: {
        role: 'toolbar'
      }
    }), children);
  }
};

var MultiSelect = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('dropdown', { ref: "dropdown", style: _vm.containerStyles, attrs: { "not-close-elements": _vm.els, "append-to-body": _vm.appendToBody, "disabled": _vm.disabled }, nativeOn: { "keydown": function keydown($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27, $event.key)) {
            return null;
          }_vm.showDropdown = false;
        } }, model: { value: _vm.showDropdown, callback: function callback($$v) {
          _vm.showDropdown = $$v;
        }, expression: "showDropdown" } }, [_c('div', { staticClass: "form-control dropdown-toggle clearfix", class: _vm.selectClasses, attrs: { "disabled": _vm.disabled, "tabindex": "0" }, on: { "click": function click($event) {
          _vm.showDropdown = true;
        }, "focus": function focus($event) {
          _vm.$emit('focus', $event);
        }, "blur": function blur($event) {
          _vm.$emit('blur', $event);
        }, "keydown": [function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "down", 40, $event.key)) {
            return null;
          }$event.preventDefault();_vm.goNextOption($event);
        }, function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "up", 38, $event.key)) {
            return null;
          }$event.preventDefault();_vm.goPrevOption($event);
        }, function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
            return null;
          }$event.preventDefault();_vm.selectOption($event);
        }] } }, [_c('div', { class: _vm.selectTextClasses, staticStyle: { "display": "inline-block", "vertical-align": "middle" } }, [_vm._v(_vm._s(_vm.selectedText))]), _vm._v(" "), _c('div', { staticClass: "pull-right", staticStyle: { "display": "inline-block", "vertical-align": "middle" } }, [_c('span', [_vm._v(" ")]), _vm._v(" "), _c('span', { staticClass: "caret" })])]), _vm._v(" "), _c('template', { slot: "dropdown" }, [_vm.filterable ? _c('li', { staticStyle: { "padding": "4px 8px" } }, [_c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.filterInput, expression: "filterInput" }], ref: "filterInput", staticClass: "form-control input-sm", attrs: { "type": "text", "placeholder": _vm.filterPlaceholder || _vm.t('uiv.multiSelect.filterPlaceholder') }, domProps: { "value": _vm.filterInput }, on: { "keydown": [function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "down", 40, $event.key)) {
            return null;
          }$event.preventDefault();_vm.goNextOption($event);
        }, function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "up", 38, $event.key)) {
            return null;
          }$event.preventDefault();_vm.goPrevOption($event);
        }, function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
            return null;
          }$event.preventDefault();_vm.selectOption($event);
        }], "input": function input($event) {
          if ($event.target.composing) {
            return;
          }_vm.filterInput = $event.target.value;
        } } })]) : _vm._e(), _vm._v(" "), _vm._l(_vm.groupedOptions, function (item) {
      return [item.$group ? _c('li', { staticClass: "dropdown-header", domProps: { "textContent": _vm._s(item.$group) } }) : _vm._e(), _vm._v(" "), _vm._l(item.options, function (_item) {
        return [_c('li', { class: _vm.itemClasses(_item), on: { "click": function click($event) {
              _vm.toggle(_item);
            }, "mouseenter": function mouseenter($event) {
              _vm.currentActive = -1;
            } } }, [_vm.isItemSelected(_item) ? _c('a', { attrs: { "role": "button" } }, [_c('b', [_vm._v(_vm._s(_item[_vm.labelKey]))]), _vm._v(" "), _vm.selectedIcon ? _c('span', { class: _vm.selectedIconClasses }) : _vm._e()]) : _c('a', { attrs: { "role": "button" } }, [_c('span', [_vm._v(_vm._s(_item[_vm.labelKey]))])])])];
      })];
    })], 2)], 2);
  }, staticRenderFns: [],
  mixins: [Local],
  components: { Dropdown: Dropdown },
  props: {
    value: {
      type: Array,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    limit: {
      type: Number,
      default: 0
    },
    size: String,
    placeholder: String,
    split: {
      type: String,
      default: ', '
    },
    disabled: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    collapseSelected: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    filterAutoFocus: {
      type: Boolean,
      default: true
    },
    filterFunction: Function,
    filterPlaceholder: String,
    selectedIcon: {
      type: String,
      default: 'glyphicon glyphicon-ok'
    },
    itemSelectedClass: String
  },
  data: function data() {
    return {
      showDropdown: false,
      els: [],
      filterInput: '',
      currentActive: -1
    };
  },

  computed: {
    containerStyles: function containerStyles() {
      return {
        width: this.block ? '100%' : ''
      };
    },
    filteredOptions: function filteredOptions() {
      var _this = this;

      if (this.filterable && this.filterInput) {
        if (this.filterFunction) {
          return this.filterFunction(this.filterInput);
        } else {
          var filterInput = this.filterInput.toLowerCase();
          return this.options.filter(function (v) {
            return v[_this.valueKey].toString().toLowerCase().indexOf(filterInput) >= 0 || v[_this.labelKey].toString().toLowerCase().indexOf(filterInput) >= 0;
          });
        }
      } else {
        return this.options;
      }
    },
    groupedOptions: function groupedOptions() {
      var _this2 = this;

      return this.filteredOptions.map(function (v) {
        return v.group;
      }).filter(onlyUnique).map(function (v) {
        return {
          options: _this2.filteredOptions.filter(function (option) {
            return option.group === v;
          }),
          $group: v
        };
      });
    },
    flatternGroupedOptions: function flatternGroupedOptions() {
      if (this.groupedOptions && this.groupedOptions.length) {
        var result = [];
        this.groupedOptions.forEach(function (v) {
          result = result.concat(v.options);
        });
        return result;
      } else {
        return [];
      }
    },
    selectClasses: function selectClasses() {
      return defineProperty({}, 'input-' + this.size, this.size);
    },
    selectedIconClasses: function selectedIconClasses() {
      var _ref2;

      return _ref2 = {}, defineProperty(_ref2, this.selectedIcon, true), defineProperty(_ref2, 'pull-right', true), _ref2;
    },
    selectTextClasses: function selectTextClasses() {
      return {
        'text-muted': this.value.length === 0
      };
    },
    labelValue: function labelValue() {
      var _this3 = this;

      var optionsByValue = this.options.map(function (v) {
        return v[_this3.valueKey];
      });
      return this.value.map(function (v) {
        var index = optionsByValue.indexOf(v);
        return index >= 0 ? _this3.options[index][_this3.labelKey] : v;
      });
    },
    selectedText: function selectedText() {
      if (this.value.length) {
        var labelValue = this.labelValue;
        if (this.collapseSelected) {
          var str = labelValue[0];
          str += labelValue.length > 1 ? this.split + '+' + (labelValue.length - 1) : '';
          return str;
        } else {
          return labelValue.join(this.split);
        }
      } else {
        return this.placeholder || this.t('uiv.multiSelect.placeholder');
      }
    }
  },
  watch: {
    showDropdown: function showDropdown(v) {
      var _this4 = this;

      // clear filter input when dropdown toggles
      this.filterInput = '';
      this.currentActive = -1;
      this.$emit('visible-change', v);
      if (v && this.filterable && this.filterAutoFocus) {
        this.$nextTick(function () {
          _this4.$refs.filterInput.focus();
        });
      }
    }
  },
  mounted: function mounted() {
    this.els = [this.$el];
  },

  methods: {
    goPrevOption: function goPrevOption() {
      if (!this.showDropdown) {
        return;
      }
      this.currentActive > 0 ? this.currentActive-- : this.currentActive = this.flatternGroupedOptions.length - 1;
    },
    goNextOption: function goNextOption() {
      if (!this.showDropdown) {
        return;
      }
      this.currentActive < this.flatternGroupedOptions.length - 1 ? this.currentActive++ : this.currentActive = 0;
    },
    selectOption: function selectOption() {
      var index = this.currentActive;
      var options = this.flatternGroupedOptions;
      if (!this.showDropdown) {
        this.showDropdown = true;
      } else if (index >= 0 && index < options.length) {
        this.toggle(options[index]);
      }
    },
    itemClasses: function itemClasses(item) {
      var result = {
        disabled: item.disabled,
        active: this.currentActive === this.flatternGroupedOptions.indexOf(item)
      };
      if (this.itemSelectedClass) {
        result[this.itemSelectedClass] = this.isItemSelected(item);
      }
      return result;
    },
    isItemSelected: function isItemSelected(item) {
      return this.value.indexOf(item[this.valueKey]) >= 0;
    },
    toggle: function toggle(item) {
      if (item.disabled) {
        return;
      }
      var value = item[this.valueKey];
      var index = this.value.indexOf(value);
      if (this.limit === 1) {
        var newValue = index >= 0 ? [] : [value];
        this.$emit('input', newValue);
        this.$emit('change', newValue);
      } else {
        if (index >= 0) {
          this.value.splice(index, 1);
          this.$emit('change', this.value);
        } else if (this.limit === 0 || this.value.length < this.limit) {
          this.value.push(value);
          this.$emit('change', this.value);
        } else {
          this.$emit('limit-exceed');
        }
      }
    }
  }
};

var Navbar = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('nav', { class: _vm.navClasses }, [_c('div', { class: _vm.fluid ? 'container-fluid' : 'container' }, [_c('div', { staticClass: "navbar-header" }, [_vm._t("collapse-btn", [_c('button', { staticClass: "navbar-toggle collapsed", attrs: { "type": "button" }, on: { "click": _vm.toggle } }, [_c('span', { staticClass: "sr-only" }, [_vm._v("Toggle navigation")]), _vm._v(" "), _c('span', { staticClass: "icon-bar" }), _vm._v(" "), _c('span', { staticClass: "icon-bar" }), _vm._v(" "), _c('span', { staticClass: "icon-bar" })])]), _vm._v(" "), _vm._t("brand")], 2), _vm._v(" "), _vm._t("default"), _vm._v(" "), _c('collapse', { staticClass: "navbar-collapse", model: { value: _vm.show, callback: function callback($$v) {
          _vm.show = $$v;
        }, expression: "show" } }, [_vm._t("collapse")], 2)], 2)]);
  }, staticRenderFns: [],
  components: { Collapse: Collapse },
  props: {
    value: Boolean,
    fluid: {
      type: Boolean,
      default: true
    },
    fixedTop: Boolean,
    fixedBottom: Boolean,
    staticTop: Boolean,
    inverse: Boolean
  },
  data: function data() {
    return {
      show: false
    };
  },

  computed: {
    navClasses: function navClasses() {
      return {
        navbar: true,
        'navbar-default': !this.inverse,
        'navbar-inverse': this.inverse,
        'navbar-static-top': this.staticTop,
        'navbar-fixed-bottom': this.fixedBottom,
        'navbar-fixed-top': this.fixedTop
      };
    }
  },
  mounted: function mounted() {
    this.show = !!this.value;
  },

  watch: {
    value: function value(v) {
      this.show = v;
    }
  },
  methods: {
    toggle: function toggle() {
      this.show = !this.show;
      this.$emit('input', this.show);
    }
  }
};

var NavbarNav = {
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data,
        props = _ref.props;

    return h('ul', mergeData(data, {
      class: {
        nav: true,
        'navbar-nav': true,
        'navbar-left': props.left,
        'navbar-right': props.right
      }
    }), children);
  },

  props: {
    left: Boolean,
    right: Boolean
  }
};

var NavbarForm = {
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data,
        props = _ref.props;

    return h('form', mergeData(data, {
      class: {
        'navbar-form': true,
        'navbar-left': props.left,
        'navbar-right': props.right
      }
    }), children);
  },

  props: {
    left: Boolean,
    right: Boolean
  }
};

var NavbarText = {
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data,
        props = _ref.props;

    return h('p', mergeData(data, {
      class: {
        'navbar-text': true,
        'navbar-left': props.left,
        'navbar-right': props.right
      }
    }), children);
  },

  props: {
    left: Boolean,
    right: Boolean
  }
};



var components = Object.freeze({
	Carousel: Carousel,
	Slide: Slide,
	Collapse: Collapse,
	Dropdown: Dropdown,
	Modal: Modal,
	Tab: Tab,
	Tabs: Tabs,
	DatePicker: DatePicker,
	Affix: Affix,
	Alert: Alert,
	Pagination: Pagination,
	Tooltip: Tooltip,
	Popover: Popover,
	TimePicker: TimePicker,
	Typeahead: Typeahead,
	ProgressBar: ProgressBar,
	ProgressBarStack: ProgressBarStack,
	Breadcrumbs: Breadcrumbs,
	BreadcrumbItem: BreadcrumbItem,
	Btn: Btn,
	BtnGroup: BtnGroup,
	BtnToolbar: BtnToolbar,
	MultiSelect: MultiSelect,
	Navbar: Navbar,
	NavbarNav: NavbarNav,
	NavbarForm: NavbarForm,
	NavbarText: NavbarText
});

var INSTANCE = '_uiv_tooltip_instance';

var bind$1 = function bind(el, binding) {
  // console.log('bind')
  unbind$1(el);
  var Constructor = vue__WEBPACK_IMPORTED_MODULE_0__["default"].extend(Tooltip);
  var vm = new Constructor({
    propsData: {
      target: el,
      appendTo: binding.arg && '#' + binding.arg,
      text: binding.value && binding.value.toString()
    }
  });
  var options = [];
  for (var key in binding.modifiers) {
    if (binding.modifiers.hasOwnProperty(key) && binding.modifiers[key]) {
      options.push(key);
    }
  }
  options.forEach(function (option) {
    if (/(top)|(left)|(right)|(bottom)/.test(option)) {
      vm.placement = option;
    } else if (/(hover)|(focus)|(click)/.test(option)) {
      vm.trigger = option;
    } else if (/unenterable/.test(option)) {
      vm.enterable = false;
    }
  });
  vm.$mount();
  el[INSTANCE] = vm;
};

var unbind$1 = function unbind(el) {
  // console.log('unbind')
  var vm = el[INSTANCE];
  if (vm) {
    vm.$destroy();
  }
  delete el[INSTANCE];
};

var update$1 = function update(el, binding) {
  // console.log('update')
  if (binding.value !== binding.oldValue) {
    bind$1(el, binding);
  }
};

var tooltip = { bind: bind$1, unbind: unbind$1, update: update$1 };

var INSTANCE$1 = '_uiv_popover_instance';

var bind$2 = function bind(el, binding) {
  // console.log('bind')
  unbind$2(el);
  var Constructor = vue__WEBPACK_IMPORTED_MODULE_0__["default"].extend(Popover);
  var vm = new Constructor({
    propsData: {
      target: el,
      appendTo: binding.arg && '#' + binding.arg,
      title: binding.value && binding.value.title && binding.value.title.toString(),
      content: binding.value && binding.value.content && binding.value.content.toString()
    }
  });
  var options = [];
  for (var key in binding.modifiers) {
    if (binding.modifiers.hasOwnProperty(key) && binding.modifiers[key]) {
      options.push(key);
    }
  }
  options.forEach(function (option) {
    if (/(top)|(left)|(right)|(bottom)/.test(option)) {
      vm.placement = option;
    } else if (/(hover)|(focus)|(click)/.test(option)) {
      vm.trigger = option;
    } else if (/unenterable/.test(option)) {
      vm.enterable = false;
    }
  });
  vm.$mount();
  el[INSTANCE$1] = vm;
};

var unbind$2 = function unbind(el) {
  // console.log('unbind')
  var vm = el[INSTANCE$1];
  if (vm) {
    vm.$destroy();
  }
  delete el[INSTANCE$1];
};

var update$2 = function update(el, binding) {
  // console.log('update')
  if (binding.value !== binding.oldValue) {
    bind$2(el, binding);
  }
};

var popover = { bind: bind$2, unbind: unbind$2, update: update$2 };

function ScrollSpy(element) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'body';
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  this.el = element;
  this.opts = _extends({}, ScrollSpy.DEFAULTS, options);
  this.opts.target = target;
  if (target === 'body') {
    this.scrollElement = window;
  } else {
    this.scrollElement = document.querySelector('[id=' + target + ']');
  }
  this.selector = 'li > a';
  this.offsets = [];
  this.targets = [];
  this.activeTarget = null;
  this.scrollHeight = 0;
  if (this.scrollElement) {
    this.refresh();
    this.process();
  }
}

ScrollSpy.DEFAULTS = {
  offset: 10,
  callback: function callback(ele) {
    return 0;
  }
};

ScrollSpy.prototype.getScrollHeight = function () {
  return this.scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
};

ScrollSpy.prototype.refresh = function () {
  var _this = this;

  this.offsets = [];
  this.targets = [];
  this.scrollHeight = this.getScrollHeight();
  var list = nodeListToArray(this.el.querySelectorAll(this.selector));
  var isWindow = this.scrollElement === window;
  list.map(function (ele) {
    var href = ele.getAttribute('href');
    if (/^#./.test(href)) {
      var doc = document.documentElement;
      var rootEl = isWindow ? document : _this.scrollElement;
      var hrefEl = rootEl.querySelector('[id=\'' + href.slice(1) + '\']');
      var windowScrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
      var offset = isWindow ? hrefEl.getBoundingClientRect().top + windowScrollTop : hrefEl.offsetTop + _this.scrollElement.scrollTop;
      return [offset, href];
    } else {
      return null;
    }
  }).filter(function (item) {
    return item;
  }).sort(function (a, b) {
    return a[0] - b[0];
  }).forEach(function (item) {
    _this.offsets.push(item[0]);
    _this.targets.push(item[1]);
  });
  // console.log(this.offsets, this.targets)
};

ScrollSpy.prototype.process = function () {
  var isWindow = this.scrollElement === window;
  var scrollTop = (isWindow ? window.pageYOffset : this.scrollElement.scrollTop) + this.opts.offset;
  var scrollHeight = this.getScrollHeight();
  var scrollElementHeight = isWindow ? getViewportSize().height : this.scrollElement.getBoundingClientRect().height;
  var maxScroll = this.opts.offset + scrollHeight - scrollElementHeight;
  var offsets = this.offsets;
  var targets = this.targets;
  var activeTarget = this.activeTarget;
  var i = void 0;
  if (this.scrollHeight !== scrollHeight) {
    this.refresh();
  }
  if (scrollTop >= maxScroll) {
    return activeTarget !== (i = targets[targets.length - 1]) && this.activate(i);
  }
  if (activeTarget && scrollTop < offsets[0]) {
    this.activeTarget = null;
    return this.clear();
  }
  for (i = offsets.length; i--;) {
    activeTarget !== targets[i] && scrollTop >= offsets[i] && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) && this.activate(targets[i]);
  }
};

ScrollSpy.prototype.activate = function (target) {
  this.activeTarget = target;
  this.clear();
  var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
  var activeCallback = this.opts.callback;
  var active = nodeListToArray(this.el.querySelectorAll(selector));
  active.forEach(function (ele) {
    getParents(ele, 'li').forEach(function (item) {
      addClass(item, 'active');
      activeCallback(item);
    });
    if (getParents(ele, '.dropdown-menu').length) {
      addClass(getClosest(ele, 'li.dropdown'), 'active');
    }
  });
};

ScrollSpy.prototype.clear = function () {
  var _this2 = this;

  var list = nodeListToArray(this.el.querySelectorAll(this.selector));
  list.forEach(function (ele) {
    getParents(ele, '.active', _this2.opts.target).forEach(function (item) {
      removeClass(item, 'active');
    });
  });
};

var INSTANCE$2 = '_uiv_scrollspy_instance';
var events$1 = [EVENTS.RESIZE, EVENTS.SCROLL];

var bind$3 = function bind(el, binding) {
  // console.log('bind')
  unbind$3(el);
};

var inserted = function inserted(el, binding) {
  var scrollSpy = new ScrollSpy(el, binding.arg, binding.value);
  if (scrollSpy.scrollElement) {
    scrollSpy.handler = function () {
      scrollSpy.process();
    };
    events$1.forEach(function (event) {
      on(scrollSpy.scrollElement, event, scrollSpy.handler);
    });
  }
  el[INSTANCE$2] = scrollSpy;
};

var unbind$3 = function unbind(el) {
  // console.log('unbind')
  var instance = el[INSTANCE$2];
  if (instance && instance.scrollElement) {
    events$1.forEach(function (event) {
      off(instance.scrollElement, event, instance.handler);
    });
    delete el[INSTANCE$2];
  }
};

var update$3 = function update(el, binding) {
  // console.log('update')
  if (binding.value !== binding.oldValue) {
    bind$3(el, binding);
    inserted(el, binding);
  }
};

var scrollspy = { bind: bind$3, unbind: unbind$3, update: update$3, inserted: inserted };



var directives = Object.freeze({
	tooltip: tooltip,
	popover: popover,
	scrollspy: scrollspy
});

var TYPES = {
  ALERT: 0,
  CONFIRM: 1,
  PROMPT: 2
};

var MessageBox = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('modal', { ref: "modal", class: _vm.customClass, attrs: { "auto-focus": "", "size": _vm.size, "title": _vm.title, "header": !!_vm.title, "backdrop": _vm.closeOnBackdropClick, "cancel-text": _vm.cancelText, "ok-text": _vm.okText }, on: { "hide": _vm.cb }, model: { value: _vm.show, callback: function callback($$v) {
          _vm.show = $$v;
        }, expression: "show" } }, [_vm.html ? _c('div', { domProps: { "innerHTML": _vm._s(_vm.content) } }) : _c('p', [_vm._v(_vm._s(_vm.content))]), _vm._v(" "), _vm.type === _vm.TYPES.PROMPT ? _c('div', [_c('div', { staticClass: "form-group", class: { 'has-error': _vm.inputNotValid } }, [_c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.input, expression: "input" }], ref: "input", staticClass: "form-control", attrs: { "type": "text", "required": "", "data-action": "auto-focus" }, domProps: { "value": _vm.input }, on: { "change": function change($event) {
          _vm.dirty = true;
        }, "keyup": function keyup($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
            return null;
          }_vm.validate($event);
        }, "input": function input($event) {
          if ($event.target.composing) {
            return;
          }_vm.input = $event.target.value;
        } } }), _vm._v(" "), _c('span', { directives: [{ name: "show", rawName: "v-show", value: _vm.inputNotValid, expression: "inputNotValid" }], staticClass: "help-block" }, [_vm._v(_vm._s(_vm.inputError))])])]) : _vm._e(), _vm._v(" "), _vm.type === _vm.TYPES.ALERT ? _c('template', { slot: "footer" }, [_c('btn', { attrs: { "type": _vm.okType, "data-action": "auto-focus" }, on: { "click": function click($event) {
          _vm.toggle(false, 'ok');
        } } }, [_vm._v(_vm._s(_vm.okBtnText))])], 1) : _c('template', { slot: "footer" }, [_c('btn', { attrs: { "type": _vm.cancelType }, on: { "click": function click($event) {
          _vm.toggle(false, 'cancel');
        } } }, [_vm._v(_vm._s(_vm.cancelBtnText))]), _vm._v(" "), _vm.type === _vm.TYPES.CONFIRM ? _c('btn', { attrs: { "type": _vm.okType, "data-action": "auto-focus" }, on: { "click": function click($event) {
          _vm.toggle(false, 'ok');
        } } }, [[_vm._v(_vm._s(_vm.okBtnText))]], 2) : _c('btn', { attrs: { "type": _vm.okType }, on: { "click": _vm.validate } }, [_vm._v(_vm._s(_vm.okBtnText))])], 1)], 2);
  }, staticRenderFns: [],
  mixins: [Local],
  components: { Modal: Modal, Btn: Btn },
  props: {
    backdrop: null,
    title: String,
    content: String,
    html: {
      type: Boolean,
      default: false
    },
    okText: String,
    okType: {
      type: String,
      default: 'primary'
    },
    cancelText: String,
    cancelType: {
      type: String,
      default: 'default'
    },
    type: {
      type: Number,
      default: TYPES.ALERT
    },
    size: {
      type: String,
      default: 'sm'
    },
    cb: {
      type: Function,
      required: true
    },
    validator: {
      type: Function,
      default: function _default() {
        return null;
      }
    },
    customClass: null
  },
  data: function data() {
    return {
      TYPES: TYPES,
      show: false,
      input: '',
      dirty: false
    };
  },

  computed: {
    closeOnBackdropClick: function closeOnBackdropClick() {
      // use backdrop prop if exist
      // otherwise, only not available if render as alert
      return isExist(this.backdrop) ? Boolean(this.backdrop) : this.type !== TYPES.ALERT;
    },
    inputError: function inputError() {
      return this.validator(this.input);
    },
    inputNotValid: function inputNotValid() {
      return this.dirty && this.inputError;
    },
    okBtnText: function okBtnText() {
      return this.okText || this.t('uiv.modal.ok');
    },
    cancelBtnText: function cancelBtnText() {
      return this.cancelText || this.t('uiv.modal.cancel');
    }
  },
  methods: {
    toggle: function toggle(show, msg) {
      this.$refs.modal.toggle(show, msg);
    },
    validate: function validate() {
      this.dirty = true;
      if (!isExist(this.inputError)) {
        this.toggle(false, { value: this.input });
      }
    }
  }
};

var queue = [];

var destroy = function destroy(instance) {
  // console.log('destroyModal')
  removeFromDom(instance.$el);
  instance.$destroy();
  spliceIfExist(queue, instance);
};

// handel cancel or ok for confirm & prompt
var shallResolve = function shallResolve(type, msg) {
  if (type === TYPES.CONFIRM) {
    // is confirm
    return msg === 'ok';
  } else {
    // is prompt
    return isExist(msg) && isString(msg.value);
  }
};

var init = function init(type, options, _cb) {
  var resolve = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var reject = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  var i18n = this.$i18n;
  var instance = new vue__WEBPACK_IMPORTED_MODULE_0__["default"]({
    extends: MessageBox,
    i18n: i18n,
    propsData: _extends({
      type: type
    }, options, {
      cb: function cb(msg) {
        destroy(instance);
        if (isFunction(_cb)) {
          if (type === TYPES.CONFIRM) {
            shallResolve(type, msg) ? _cb(null, msg) : _cb(msg);
          } else if (type === TYPES.PROMPT) {
            shallResolve(type, msg) ? _cb(null, msg.value) : _cb(msg);
          } else {
            _cb(msg);
          }
        } else if (resolve && reject) {
          if (type === TYPES.CONFIRM) {
            shallResolve(type, msg) ? resolve(msg) : reject(msg);
          } else if (type === TYPES.PROMPT) {
            shallResolve(type, msg) ? resolve(msg.value) : reject(msg);
          } else {
            resolve(msg);
          }
        }
      }
    })
  });
  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.show = true;
  queue.push(instance);
};

var initModal = function initModal(type) {
  var _this = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var cb = arguments[2];

  if (isPromiseSupported()) {
    return new Promise(function (resolve, reject) {
      init.apply(_this, [type, options, cb, resolve, reject]);
    });
  } else {
    init.apply(this, [type, options, cb]);
  }
};

var alert = function alert(options, cb) {
  return initModal.apply(this, [TYPES.ALERT, options, cb]);
};

var confirm = function confirm(options, cb) {
  return initModal.apply(this, [TYPES.CONFIRM, options, cb]);
};

var prompt = function prompt(options, cb) {
  return initModal.apply(this, [TYPES.PROMPT, options, cb]);
};

var messageBox = { alert: alert, confirm: confirm, prompt: prompt };

var TYPES$1 = {
  SUCCESS: 'success',
  INFO: 'info',
  DANGER: 'danger',
  WARNING: 'warning'
};

var PLACEMENTS$1 = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right'
};

var IN_CLASS$1 = 'in';
var ICON = 'glyphicon';
var WIDTH = 300;
var TRANSITION_DURATION = 300;

var Notification = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('alert', { staticClass: "fade", class: _vm.customClass, style: _vm.styles, attrs: { "type": _vm.type, "duration": _vm.duration, "dismissible": _vm.dismissible }, on: { "dismissed": _vm.onDismissed } }, [_c('div', { staticClass: "media", staticStyle: { "margin": "0" } }, [_vm.icons ? _c('div', { staticClass: "media-left" }, [_c('span', { class: _vm.icons, staticStyle: { "font-size": "1.5em" } })]) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "media-body" }, [_vm.title ? _c('div', { staticClass: "media-heading" }, [_c('b', [_vm._v(_vm._s(_vm.title))])]) : _vm._e(), _vm._v(" "), _vm.html ? _c('div', { domProps: { "innerHTML": _vm._s(_vm.content) } }) : _c('div', [_vm._v(_vm._s(_vm.content))])])])]);
  }, staticRenderFns: [],
  components: { Alert: Alert },
  props: {
    title: String,
    content: String,
    html: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 5000
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    type: String,
    placement: String,
    icon: String,
    customClass: null,
    cb: {
      type: Function,
      required: true
    },
    queue: {
      type: Array,
      required: true
    },
    offsetY: {
      type: Number,
      default: 15
    },
    offsetX: {
      type: Number,
      default: 15
    },
    offset: {
      type: Number,
      default: 15
    }
  },
  data: function data() {
    return {
      height: 0,
      top: 0,
      horizontal: this.placement === PLACEMENTS$1.TOP_LEFT || this.placement === PLACEMENTS$1.BOTTOM_LEFT ? 'left' : 'right',
      vertical: this.placement === PLACEMENTS$1.TOP_LEFT || this.placement === PLACEMENTS$1.TOP_RIGHT ? 'top' : 'bottom'
    };
  },
  created: function created() {
    // get prev notifications total height in the queue
    this.top = this.getTotalHeightOfQueue(this.queue);
  },
  mounted: function mounted() {
    var _this = this;

    var el = this.$el;
    el.style[this.vertical] = this.top + 'px';
    this.$nextTick(function () {
      el.style[_this.horizontal] = '-' + WIDTH + 'px';
      _this.height = el.offsetHeight;
      el.style[_this.horizontal] = _this.offsetX + 'px';
      addClass(el, IN_CLASS$1);
    });
  },

  computed: {
    styles: function styles() {
      var _ref;

      var queue = this.queue;
      var thisIndex = queue.indexOf(this);
      return _ref = {
        position: 'fixed'
      }, defineProperty(_ref, this.vertical, this.getTotalHeightOfQueue(queue, thisIndex) + 'px'), defineProperty(_ref, 'width', WIDTH + 'px'), defineProperty(_ref, 'transition', 'all ' + TRANSITION_DURATION / 1000 + 's ease-in-out'), _ref;
    },
    icons: function icons() {
      if (isString(this.icon)) {
        return this.icon;
      }
      switch (this.type) {
        case TYPES$1.INFO:
        case TYPES$1.WARNING:
          return ICON + ' ' + ICON + '-info-sign';
        case TYPES$1.SUCCESS:
          return ICON + ' ' + ICON + '-ok-sign';
        case TYPES$1.DANGER:
          return ICON + ' ' + ICON + '-remove-sign';
        default:
          return null;
      }
    }
  },
  methods: {
    getTotalHeightOfQueue: function getTotalHeightOfQueue(queue) {
      var lastIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : queue.length;

      var totalHeight = this.offsetY;
      for (var i = 0; i < lastIndex; i++) {
        totalHeight += queue[i].height + this.offset;
      }
      return totalHeight;
    },
    onDismissed: function onDismissed() {
      removeClass(this.$el, IN_CLASS$1);
      setTimeout(this.cb, TRANSITION_DURATION);
    }
  }
};

var _queues;

var queues = (_queues = {}, defineProperty(_queues, PLACEMENTS$1.TOP_LEFT, []), defineProperty(_queues, PLACEMENTS$1.TOP_RIGHT, []), defineProperty(_queues, PLACEMENTS$1.BOTTOM_LEFT, []), defineProperty(_queues, PLACEMENTS$1.BOTTOM_RIGHT, []), _queues);

var destroy$1 = function destroy(queue, instance) {
  // console.log('destroyNotification')
  removeFromDom(instance.$el);
  instance.$destroy();
  spliceIfExist(queue, instance);
};

var init$1 = function init(options, _cb) {
  var resolve = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var reject = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var placement = options.placement;
  var queue = queues[placement];
  // check if placement is valid
  if (!isExist(queue)) {
    return;
  }
  var instance = new vue__WEBPACK_IMPORTED_MODULE_0__["default"]({
    extends: Notification,
    propsData: _extends({
      queue: queue,
      placement: placement
    }, options, {
      cb: function cb(msg) {
        destroy$1(queue, instance);
        if (isFunction(_cb)) {
          _cb(msg);
        } else if (resolve && reject) {
          resolve(msg);
        }
      }
    })
  });
  instance.$mount();
  document.body.appendChild(instance.$el);
  queue.push(instance);
};

var notify = function notify() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var cb = arguments[1];

  // simplify usage: pass string as option.content
  if (isString(options)) {
    options = {
      content: options
    };
  }
  // set default placement as top-right
  if (!isExist(options.placement)) {
    options.placement = PLACEMENTS$1.TOP_RIGHT;
  }
  if (isPromiseSupported()) {
    return new Promise(function (resolve, reject) {
      init$1(options, cb, resolve, reject);
    });
  } else {
    init$1(options, cb);
  }
};

var notification = { notify: notify };



var services = Object.freeze({
	MessageBox: messageBox,
	Notification: notification
});

var install = function install(Vue$$1) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // Setup language, en-US for default
  locale.use(options.locale);
  locale.i18n(options.i18n);
  // Register components
  Object.keys(components).forEach(function (key) {
    var _key = options.prefix ? options.prefix + key : key;
    Vue$$1.component(_key, components[key]);
  });
  // Register directives
  Object.keys(directives).forEach(function (key) {
    var _key = options.prefix ? options.prefix + '-' + key : key;
    Vue$$1.directive(_key, directives[key]);
  });
  // Register services
  Object.keys(services).forEach(function (key) {
    var service = services[key];
    Object.keys(service).forEach(function (serviceKey) {
      var _key = options.prefix ? options.prefix + '_' + serviceKey : serviceKey;
      Vue$$1.prototype['$' + _key] = service[serviceKey];
    });
  });
};


//# sourceMappingURL=uiv.esm.js.map


/***/ }),
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })
]]);