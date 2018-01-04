(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("maximndSimpleCarousel", [], factory);
	else if(typeof exports === 'object')
		exports["maximndSimpleCarousel"] = factory();
	else
		root["maximndSimpleCarousel"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/lib";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(1);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getDef(val, def) {
    return val == null ? def : val;
}

var Slider = function () {
    function Slider() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _config2.default;

        _classCallCheck(this, Slider);

        // Selectors
        var sliderSelector = getDef(options.slider, _config2.default.slider);
        var slidesContainerSelector = getDef(options.slidesContainer, _config2.default.slidesContainer);
        // DOM
        this.slider = getDef(document.querySelector(sliderSelector), document.querySelector(_config2.default.slider));
        this.slidesContainer = getDef(document.querySelector(sliderSelector + ' ' + slidesContainerSelector), document.querySelector(sliderSelector + ' ' + _config2.default.slidesContainer));
        this.slides = this.slidesContainer.children;
        this.buttonNext = getDef(document.querySelector(sliderSelector + ' ' + options.next), document.querySelector(sliderSelector + ' ' + _config2.default.next));
        this.buttonPrev = getDef(document.querySelector(sliderSelector + ' ' + options.prev), document.querySelector(sliderSelector + ' ' + _config2.default.prev));
        this.indicators = getDef(document.querySelector(sliderSelector + ' ' + options.indicators), document.querySelector(sliderSelector + ' ' + _config2.default.indicators)).children;
        // Data
        this.currentSlide = 0;
        // this.slidesToShow = getDef(options.slidesToShow, config.slidesToShow);
        this.total = this.slides.length - 1;
        this.autoPlay = getDef(options.autoPlay, _config2.default.autoPlay);
        this.delay = getDef(options.delay, _config2.default.delay);
        this.interval = null;
        if (this.autoPlay) this.pauseOnHover = getDef(options.pauseOnHover, _config2.default.pauseOnHover);
        this.reverse = getDef(options.reverse, _config2.default.reverse);
        this.activeClass = getDef(options.activeClass, _config2.default.activeClass);

        this.initialize();
    }

    _createClass(Slider, [{
        key: 'initialize',
        value: function initialize() {
            this.initializeAutoPlay();
            this.initializeButtons();
            this.initializeIndicators();
            this.switchSlide();
        }
    }, {
        key: 'initializeIndicators',
        value: function initializeIndicators() {
            var _this = this;

            Array.prototype.forEach.call(this.indicators, function (el, i) {
                el.addEventListener('click', function () {
                    _this.currentSlide = i;
                    _this.switchSlide();
                }, false);
            });
        }
    }, {
        key: 'initializeButtons',
        value: function initializeButtons() {
            var _this2 = this;

            if (this.buttonNext !== null) {
                this.buttonNext.addEventListener('click', function () {
                    _this2.nextSlide();
                });
            }
            if (this.buttonPrev !== null) {
                this.buttonPrev.addEventListener('click', function () {
                    _this2.prevSlide();
                });
            }
        }
    }, {
        key: 'initializeAutoPlay',
        value: function initializeAutoPlay() {
            var _this3 = this;

            var intervalFunc = function intervalFunc() {
                return _this3.reverse ? _this3.prevSlide() : _this3.nextSlide();
            };
            if (this.autoPlay) {
                this.interval = setInterval(intervalFunc, this.delay);
                if (this.pauseOnHover) {
                    this.slider.addEventListener('mouseover', function () {
                        clearInterval(_this3.interval);
                    }, false);
                    this.slider.addEventListener('mouseleave', function () {
                        _this3.interval = setInterval(intervalFunc, _this3.delay);
                    }, false);
                }
            }
        }
    }, {
        key: 'nextSlide',
        value: function nextSlide() {
            ++this.currentSlide;
            if (this.currentSlide > this.total) {
                this.currentSlide = 0;
            }
            this.switchSlide();
        }
    }, {
        key: 'prevSlide',
        value: function prevSlide() {
            --this.currentSlide;
            if (this.currentSlide < 0) {
                this.currentSlide = this.total;
            }
            this.switchSlide();
        }
    }, {
        key: 'switchSlide',
        value: function switchSlide() {
            var _this4 = this;

            if (this.currentSlide < 0 || this.currentSlide > this.total) throw new Error('Slider index(' + this.currentSlide + ') out of range');
            Array.prototype.forEach.call(this.slides, function (el, i) {
                if (i === _this4.currentSlide) {
                    _this4.indicators[i].classList.add(_this4.activeClass);
                    el.style.display = "inline-block";
                } else {
                    if (_this4.indicators[i].classList.contains(_this4.activeClass)) {
                        _this4.indicators[i].classList.remove(_this4.activeClass);
                    }
                    el.style.display = 'none';
                }
            });
        }
    }]);

    return Slider;
}();

exports.default = Slider;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = {
    slider: '#slider',
    slidesContainer: '#slides',
    next: '#next',
    prev: '#prev',
    indicators: '#indicators',
    // slidesToShow: 1,
    autoPlay: true,
    delay: 4000,
    pauseOnHover: true,
    reverse: false,
    activeClass: 'active'
};

exports.default = config;

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.bundle.js.map