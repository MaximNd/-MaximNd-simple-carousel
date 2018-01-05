'use strict';

/**
 * 
 * @param {*} val 
 * @param {*} def 
 */
export function getDef(val, def) {
    return val == null ? def : val;
}

/**
 * 
 * @param {HTMLElement} elem 
 * @param {Object} styles 
 */
export function setStyles(elem, styles) {
    Object.keys(styles).forEach(function (key) {
        elem.style[key] = styles[key];
    });
}