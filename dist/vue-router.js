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

    let _Vue;
    function install (Vue) {
        if (install.installed && _Vue === Vue) return
        install.installed = true;
        _Vue = Vue;
        const isDef = v => v !== undefined;
        Vue.mixin({
            beforeCreate () {
                if (isDef(this.$options.router)) {
                    this._routerRoot = this;
                    this._router = this.$options.router;
                    this._router.init(this);
                }
                // TODO
            },
            destroyed () {
            }
        });
        // TODO
    }

    class MyVueRouter {
        constructor (options = {}) {
            this.options = options;
            console.log('gsdoptions', options);
        }
        init (app) {
            console.log('gsdapp', app);
        }
    }

    MyVueRouter.install = install;

    return MyVueRouter;

})));
