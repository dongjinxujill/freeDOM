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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


const DOMNodeCollection = __webpack_require__(1);

function $l(selector){
  if (selector instanceof HTMLElement) {
    let htmlEls = [selector];
    return new DOMNodeCollection(htmlEls);
  } else if (typeof selector === 'function'){
    document.addEventListener('DOMContentLoaded', selector);
  } else{
    const el = document.querySelectorAll(selector);
    let els = Array.from(el);
    return new DOMNodeCollection(els);
  }
}


$l.extend = function (...objects) {
  return Object.assign({}, ...objects);
};

$l.ajax = function(obj) {
  const defaults = {
    'success': (e) => {console.log(e);},
    'contentType': 'application/x-www-form-urlencoded; charset=UTF-8',
    'method': 'GET',
    'data':  '',
    'url': '/',
    'error': (e) => {console.log(e);}
  };
  const options = $l.extend(defaults, obj);
  const xhr = new XMLHttpRequest();

  xhr.open(options.method, options.url);

  xhr.onload = function () {
    if (xhr.status === 200) {
      options.success(JSON.parse(xhr.response));
    } else {
      options.error(xhr.status);
    }
  };

  const optionalData = options.data;
  xhr.send(optionalData);
};

window.$l = $l;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlEl) {
    this.nodes = htmlEl;
    this.returnSelf();
  }

  returnSelf() {
    return this;
  }

  html(arg){
    if (arg || arg === ''){
      for (let i = 0; i < this.nodes.length; i++){
        this.nodes[i].innerHTML = arg;
      }
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  val(newVal){
    if (newVal !== undefined){
      for (let i = 0; i < this.nodes.length; i++){
        this.nodes[i].value = newVal;
      }
    } else {
      for (let i = 0; i < this.nodes.length; i++){
        return this.nodes[i].value;
      }
    }
  }

  empty(){
    this.html('');
  }

  append(arg){
    if (this.nodes.length === 0) return;

    if (typeof arg === "string") {
      this.nodes.forEach( (node) => {
        node.innerHTML += arg;
      });
    } else if (arg instanceof DOMNodeCollection) {
      this.nodes.forEach( (node) => {
        arg.nodes.forEach( (argNode) => {
          node.appendChild(argNode.cloneNode(true));
        });
      });
    }
  }

  attr(name, value) {
    if (typeof value === "string") {
      this.nodes.forEach(node => node.setAttribute(name, value));
    } else {
      return this.nodes[0].getAttribute(name);
    }
  }

  addClass(className) {
    this.nodes.forEach(node => {
      node.classList.add(className);
    });
  }

  removeClass(className) {
    this.nodes.forEach(node => {
      node.classList.remove(className);
    });
  }

  children() {
    let childrenNodes = [];
    for (var i = 0; i < this.nodes.length; i++) {
      for (var j = 0; j < this.nodes[i].children.length; j++) {
        childrenNodes.push(this.nodes[i].children[j]);
      }
    }
    return new DOMNodeCollection(childrenNodes);
  }

  parent() {
    let parentNode = [];
    for (var i = 0; i < this.nodes.length; i++) {
      parentNode.push(this.nodes[i].parentNode);
    }
    return new DOMNodeCollection(parentNode);
  }

  toggleClass(toggleClass) {
    this.each(node => node.classList.toggle(toggleClass));
  }

  find(selector){
    let res = [];
    if (this.children().length === 0) {
      return undefined;
    }
    this.nodes.forEach((el) => {
      res.push(el.querySelectorAll(selector));
    });
    return new DOMNodeCollection(res);
  }

  remove() {
    this.nodes.forEach((el) => {
      el.parentNode.removeChild(el);
    });
  }

  on(type, callback) {
    this.nodes.forEach((el) => {
      el.addEventListener(type, callback);
      el.callback = callback;
    });
  }

  off(type) {
    this.nodes.forEach((el) => {
      el.removeEventListener(type, el.callback);
    });
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
//# sourceMappingURL=freeDOM.js.map