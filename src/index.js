'use strict';

import config from './../config/config';
import { getDef, setStyles } from './helpers/helpers';

export default class Slider {
    constructor(options = config) {
        // Selectors
        const sliderSelector = getDef(options.slider, config.slider);
        const slidesContainerSelector = getDef(options.slidesContainer, config.slidesContainer);
        // DOM
        this.slider = getDef(document.querySelector(sliderSelector), document.querySelector(config.slider));
        this.slidesContainer = getDef(document.querySelector(`${sliderSelector} ${slidesContainerSelector}`), document.querySelector(`${sliderSelector} ${config.slidesContainer}`));
        this.slides = this.slidesContainer.children;
        this.buttonNext = getDef(document.querySelector(`${sliderSelector} ${options.next}`), document.querySelector(`${sliderSelector} ${config.next}`));
        this.buttonPrev = getDef(document.querySelector(`${sliderSelector} ${options.prev}`), document.querySelector(`${sliderSelector} ${config.prev}`));
        this.indicators = getDef(document.querySelector(`${sliderSelector} ${options.indicators}`), document.querySelector(`${sliderSelector} ${config.indicators}`)).children;
        // Data
        this.slideSpeed = getDef(options.slideSpeed, config.slideSpeed);
        this.isSliding = false;
        this.total = this.slides.length - 1;
        this.oldSlide = this.total;
        this.currentSlide = 0;
        this.autoPlay = getDef(options.autoPlay, config.autoPlay);
        this.delay = getDef(options.delay, config.delay);
        this.interval = null;
        if (this.autoPlay)
            this.pauseOnHover = getDef(options.pauseOnHover, config.pauseOnHover);
        this.reverse = getDef(options.reverse, config.reverse);
        this.activeClass = getDef(options.activeClass, config.activeClass);

        this.initialize();
    }

    initialize() {
        this.initializeSlider();
        this.initializeSlidesContainer();
        this.initializeSlides();
        this.initializeAutoPlay();
        this.initializeButtons();
        this.initializeIndicators();
        setStyles(this.slides[this.currentSlide], {
            display: 'block'
        });
    }

    initializeSlider() {
        setStyles(this.slider, {
            position: 'relative'
        });
    }

    initializeSlidesContainer() {
        setStyles(this.slidesContainer, {
            position: 'relative',
            width: '100%',
            overflow: 'hidden'
        });
    }

    initializeSlides() {
        Array.prototype.forEach.call(this.slides, (slide) => setStyles(slide, {
            position: 'relative',
            display: 'none',
            alignItems: 'center',
            width: '100%',
            transition: `transform ${this.slideSpeed / 1000}s`
        }));
    }

    initializeIndicators() {
        this.indicators[this.currentSlide].classList.add(this.activeClass);
        Array.prototype.forEach.call(this.indicators, (el, i) => {
            el.addEventListener('click', () => {
                if (this.isSliding) return;
                if (this.currentSlide === i) return;
                this.oldSlide = this.currentSlide;
                this.currentSlide = i;
                const type = this.currentSlide > this.oldSlide ? 'next' : 'prev';
                this.switchSlide(this.currentSlide, this.oldSlide, type);
            }, false);
        });
    }

    initializeButtons() {
        if (this.buttonNext !== null) {
            this.buttonNext.addEventListener('click', () => {
                this.nextSlide();
            });
        }
        if (this.buttonPrev !== null) {
            this.buttonPrev.addEventListener('click', () => {
                this.prevSlide();
            });
        }
    }

    initializeAutoPlay() {
        let intervalFunc = this.reverse ? this.prevSlide.bind(this) : this.nextSlide.bind(this);
        if (this.autoPlay) {
            this.interval = setInterval(intervalFunc, this.delay);
            if (this.pauseOnHover) {
                this.slider.addEventListener('mouseover', () => {
                    clearInterval(this.interval);        
                }, false);
                this.slider.addEventListener('mouseleave', () => {
                    this.interval = setInterval(intervalFunc, this.delay);
                }, false);
            }
        }
    }

    nextSlide() {
        if (this.isSliding) return;
        this.oldSlide = this.currentSlide;
        ++this.currentSlide
        if (this.currentSlide > this.total) {
            this.currentSlide = 0;
        }
        this.switchSlide(this.currentSlide, this.oldSlide, 'next');
    }

    prevSlide() {
        if (this.isSliding) return;
        this.oldSlide = this.currentSlide;
        --this.currentSlide
        if (this.currentSlide < 0) {
            this.currentSlide = this.total;
        }
        this.switchSlide(this.currentSlide, this.oldSlide, 'prev');
    }

    switchSlide(newIndex, oldIndex, type) {
        if (this.isSliding) return;
        if (newIndex < 0 || newIndex > this.total) throw new Error(`Slider index(${newIndex}) out of range`);
        this.isSliding = true;

        this.indicators[newIndex].classList.add(this.activeClass);
        if (this.indicators[oldIndex].classList.contains(this.activeClass)) {
            this.indicators[oldIndex].classList.remove(this.activeClass);
        }
        

        setStyles(this.slides[newIndex], {
            display: 'block',
            position: 'absolute',
            top: '0'
        });
        setTimeout(() => {
            setStyles(this.slides[newIndex], {
                transform: 'translateX(0%)',
                webkitTransform: 'translateX(0%)'
            });
        }, 16);
        if (type === 'next') {
            setStyles(this.slides[newIndex], {
                transform: 'translateX(100%)',
                webkitTransform: 'translateX(100%)'
            });
            setStyles(this.slides[oldIndex], {
                transform: 'translateX(-100%)',
                webkitTransform: 'translateX(-100%)'
            });
        } else if (type === 'prev') {
            setStyles(this.slides[newIndex], {
                transform: 'translateX(-100%)',
                webkitTransform: 'translateX(-100%)'
            });
            setStyles(this.slides[oldIndex], {
                transform: 'translateX(100%)',
                webkitTransform: 'translateX(100%)'
            });
        }
        setTimeout(() => {
            setStyles(this.slides[oldIndex], {
                display: 'none',
                transform: '',
                webkitTransform: ''
            });
            
            setStyles(this.slides[newIndex], {
                display: 'block',
                position: '',
                top: '',
                transform: '',
                webkitTransform: ''
            });

            this.isSliding = false;
        }, this.slideSpeed);
    }
}