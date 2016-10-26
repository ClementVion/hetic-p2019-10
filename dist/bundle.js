/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(5);
	var content = __webpack_require__(7);
	content.checkName('nader', 'dabit');


/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _exports = module.exports = {};

	_exports.checkName = function (firstName, lastName) {
	    if (firstName !== 'nader' || lastName !== 'dabit') {
	        console.log('You are not Nader Dabit');
	    } else {
	        console.log('You are Nader Dabit');
	        document.write('lol');
	        document.write('<a href="assets/html/page1.html">a</a>');
	    }
	};

	var Person = function () {
	    function Person() {
	        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'John';
	        var age = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	        var gender = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '?';

	        _classCallCheck(this, Person);

	        this.name = name;
	        this.age = age;
	        this.gender = gender;
	    }

	    _createClass(Person, [{
	        key: 'greet',
	        value: function greet() {
	            alert('Hello ' + this.name + '!');
	        }
	    }]);

	    return Person;
	}();

	var John = new Person('John', 21, 'M');
	console.log(John.greet()); // Hello John!

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map