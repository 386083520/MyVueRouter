/*!
  * vue-router v1.0.0
  * (c) 2021 Evan You
  * @license MIT
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.MyVueRouter = factory());
}(this, (function () { 'use strict';

    class MyVueRouter {
        constructor (options = {}) {
            this.options = options;
            console.log('gsdoptions', options);
        }
    }

    return MyVueRouter;

})));
