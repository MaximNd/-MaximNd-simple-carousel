'use strict';

import config from './../config/config';

function getDef(val, def) {
    return val == null ? def : val;
}

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
        this.currentSlide = 0;
        // this.slidesToShow = getDef(options.slidesToShow, config.slidesToShow);
        this.total = this.slides.length - 1;
        this.autoPlay = getDef(options.autoPlay, config.autoPlay);
        this.delay = getDef(options.delay, config.delay);
        this.interval = null;
        this.pauseOnHover = getDef(options.pauseOnHover, config.pauseOnHover);
        this.reverse = getDef(options.reverse, config.reverse);
        this.activeClass = getDef(options.activeClass, config.activeClass);

        this.initialize();
    }

    initialize() {
        this.initializeAutoPlay();
        this.initializeButtons();
        this.initializeIndicators();
        this.switchSlide();
    }

    initializeIndicators() {
        Array.prototype.forEach.call(this.indicators, (el, i) => {
            el.addEventListener('click', () => {
                this.currentSlide = i;
                this.switchSlide();
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
        let intervalFunc = () => this.reverse ? this.prevSlide() : this.nextSlide();
        if (this.autoPlay) {
            this.interval = setInterval(intervalFunc, this.delay);
        }
        if (this.pauseOnHover) {
            this.slider.addEventListener('mouseover', () => {
                clearInterval(this.interval);        
            }, false);
            this.slider.addEventListener('mouseleave', () => {
                this.interval = setInterval(intervalFunc, this.delay);
            }, false);
        }
    }

 

    nextSlide() {
        ++this.currentSlide;
        if (this.currentSlide > this.total) {
            this.currentSlide = 0;
        }
        this.switchSlide();
    }

    prevSlide() {
        --this.currentSlide;
        if (this.currentSlide < 0) {
            this.currentSlide = this.total;
        }
        this.switchSlide();
    }

    switchSlide() {
        if (this.currentSlide < 0 || this.currentSlide > this.total) throw new Error(`Slider index(${this.currentSlide}) out of range`);
        Array.prototype.forEach.call(this.slides, (el, i) => {
            if (i === this.currentSlide) {
                this.indicators[i].classList.add(this.activeClass);
                el.style.display = "inline-block";
            } else {
                if (this.indicators[i].classList.contains(this.activeClass)) {
                    this.indicators[i].classList.remove(this.activeClass);
                }
                el.style.display = 'none';
            }
        });
    }
}