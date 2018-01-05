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

var _helpers = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slider = function () {
    function Slider() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _config2.default;

        _classCallCheck(this, Slider);

        // Selectors
        var sliderSelector = (0, _helpers.getDef)(options.slider, _config2.default.slider);
        var slidesContainerSelector = (0, _helpers.getDef)(options.slidesContainer, _config2.default.slidesContainer);
        // DOM
        this.slider = (0, _helpers.getDef)(document.querySelector(sliderSelector), document.querySelector(_config2.default.slider));
        this.slidesContainer = (0, _helpers.getDef)(document.querySelector(sliderSelector + ' ' + slidesContainerSelector), document.querySelector(sliderSelector + ' ' + _config2.default.slidesContainer));
        this.slides = this.slidesContainer.children;
        this.buttonNext = (0, _helpers.getDef)(document.querySelector(sliderSelector + ' ' + options.next), document.querySelector(sliderSelector + ' ' + _config2.default.next));
        this.buttonPrev = (0, _helpers.getDef)(document.querySelector(sliderSelector + ' ' + options.prev), document.querySelector(sliderSelector + ' ' + _config2.default.prev));
        this.indicators = (0, _helpers.getDef)(document.querySelector(sliderSelector + ' ' + options.indicators), document.querySelector(sliderSelector + ' ' + _config2.default.indicators)).children;
        // Data
        this.slideSpeed = (0, _helpers.getDef)(options.slideSpeed, _config2.default.slideSpeed);
        this.isSliding = false;
        this.total = this.slides.length - 1;
        this.oldSlide = this.total;
        this.currentSlide = 0;
        this.autoPlay = (0, _helpers.getDef)(options.autoPlay, _config2.default.autoPlay);
        this.delay = (0, _helpers.getDef)(options.delay, _config2.default.delay);
        this.interval = null;
        if (this.autoPlay) this.pauseOnHover = (0, _helpers.getDef)(options.pauseOnHover, _config2.default.pauseOnHover);
        this.reverse = (0, _helpers.getDef)(options.reverse, _config2.default.reverse);
        this.activeClass = (0, _helpers.getDef)(options.activeClass, _config2.default.activeClass);

        this.initialize();
    }

    _createClass(Slider, [{
        key: 'initialize',
        value: function initialize() {
            this.initializeSlider();
            this.initializeSlidesContainer();
            this.initializeSlides();
            this.initializeAutoPlay();
            this.initializeButtons();
            this.initializeIndicators();
            (0, _helpers.setStyles)(this.slides[this.currentSlide], {
                display: 'block'
            });
        }
    }, {
        key: 'initializeSlider',
        value: function initializeSlider() {
            (0, _helpers.setStyles)(this.slider, {
                position: 'relative'
            });
        }
    }, {
        key: 'initializeSlidesContainer',
        value: function initializeSlidesContainer() {
            (0, _helpers.setStyles)(this.slidesContainer, {
                position: 'relative',
                width: '100%',
                overflow: 'hidden'
            });
        }
    }, {
        key: 'initializeSlides',
        value: function initializeSlides() {
            var _this = this;

            Array.prototype.forEach.call(this.slides, function (slide) {
                return (0, _helpers.setStyles)(slide, {
                    position: 'relative',
                    display: 'none',
                    alignItems: 'center',
                    width: '100%',
                    transition: 'transform ' + _this.slideSpeed / 1000 + 's'
                });
            });
        }
    }, {
        key: 'initializeIndicators',
        value: function initializeIndicators() {
            var _this2 = this;

            this.indicators[this.currentSlide].classList.add(this.activeClass);
            Array.prototype.forEach.call(this.indicators, function (el, i) {
                el.addEventListener('click', function () {
                    if (_this2.isSliding) return;
                    if (_this2.currentSlide === i) return;
                    _this2.oldSlide = _this2.currentSlide;
                    _this2.currentSlide = i;
                    var type = _this2.currentSlide > _this2.oldSlide ? 'next' : 'prev';
                    _this2.switchSlide(_this2.currentSlide, _this2.oldSlide, type);
                }, false);
            });
        }
    }, {
        key: 'initializeButtons',
        value: function initializeButtons() {
            var _this3 = this;

            if (this.buttonNext !== null) {
                this.buttonNext.addEventListener('click', function () {
                    _this3.nextSlide();
                });
            }
            if (this.buttonPrev !== null) {
                this.buttonPrev.addEventListener('click', function () {
                    _this3.prevSlide();
                });
            }
        }
    }, {
        key: 'initializeAutoPlay',
        value: function initializeAutoPlay() {
            var _this4 = this;

            var intervalFunc = this.reverse ? this.prevSlide.bind(this) : this.nextSlide.bind(this);
            if (this.autoPlay) {
                this.interval = setInterval(intervalFunc, this.delay);
                if (this.pauseOnHover) {
                    this.slider.addEventListener('mouseover', function () {
                        clearInterval(_this4.interval);
                    }, false);
                    this.slider.addEventListener('mouseleave', function () {
                        _this4.interval = setInterval(intervalFunc, _this4.delay);
                    }, false);
                }
            }
        }
    }, {
        key: 'nextSlide',
        value: function nextSlide() {
            if (this.isSliding) return;
            this.oldSlide = this.currentSlide;
            ++this.currentSlide;
            if (this.currentSlide > this.total) {
                this.currentSlide = 0;
            }
            this.switchSlide(this.currentSlide, this.oldSlide, 'next');
        }
    }, {
        key: 'prevSlide',
        value: function prevSlide() {
            if (this.isSliding) return;
            this.oldSlide = this.currentSlide;
            --this.currentSlide;
            if (this.currentSlide < 0) {
                this.currentSlide = this.total;
            }
            this.switchSlide(this.currentSlide, this.oldSlide, 'prev');
        }
    }, {
        key: 'switchSlide',
        value: function switchSlide(newIndex, oldIndex, type) {
            var _this5 = this;

            if (this.isSliding) return;
            if (newIndex < 0 || newIndex > this.total) throw new Error('Slider index(' + newIndex + ') out of range');
            this.isSliding = true;

            this.indicators[newIndex].classList.add(this.activeClass);
            if (this.indicators[oldIndex].classList.contains(this.activeClass)) {
                this.indicators[oldIndex].classList.remove(this.activeClass);
            }

            (0, _helpers.setStyles)(this.slides[newIndex], {
                display: 'block',
                position: 'absolute',
                top: '0'
            });
            setTimeout(function () {
                (0, _helpers.setStyles)(_this5.slides[newIndex], {
                    transform: 'translateX(0%)',
                    webkitTransform: 'translateX(0%)'
                });
            }, 16);
            if (type === 'next') {
                (0, _helpers.setStyles)(this.slides[newIndex], {
                    transform: 'translateX(100%)',
                    webkitTransform: 'translateX(100%)'
                });
                (0, _helpers.setStyles)(this.slides[oldIndex], {
                    transform: 'translateX(-100%)',
                    webkitTransform: 'translateX(-100%)'
                });
            } else if (type === 'prev') {
                (0, _helpers.setStyles)(this.slides[newIndex], {
                    transform: 'translateX(-100%)',
                    webkitTransform: 'translateX(-100%)'
                });
                (0, _helpers.setStyles)(this.slides[oldIndex], {
                    transform: 'translateX(100%)',
                    webkitTransform: 'translateX(100%)'
                });
            }
            setTimeout(function () {
                (0, _helpers.setStyles)(_this5.slides[oldIndex], {
                    display: 'none',
                    transform: '',
                    webkitTransform: ''
                });

                (0, _helpers.setStyles)(_this5.slides[newIndex], {
                    display: 'block',
                    position: '',
                    top: '',
                    transform: '',
                    webkitTransform: ''
                });

                _this5.isSliding = false;
            }, this.slideSpeed);
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
    slideSpeed: 800,
    autoPlay: true,
    delay: 4000,
    pauseOnHover: true,
    reverse: false,
    activeClass: 'active'
};

exports.default = config;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 
 * @param {*} val 
 * @param {*} def 
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDef = getDef;
exports.setStyles = setStyles;
function getDef(val, def) {
    return val == null ? def : val;
}

/**
 * 
 * @param {HTMLElement} elem 
 * @param {Object} styles 
 */
function setStyles(elem, styles) {
    Object.keys(styles).forEach(function (key) {
        elem.style[key] = styles[key];
    });
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.bundle.js.map