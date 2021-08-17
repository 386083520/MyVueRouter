import { install } from "./install";

export default class MyVueRouter {
    constructor (options = {}) {
        this.options = options
        console.log('gsdoptions', options)
    }
    init (app) {
        console.log('gsdapp', app)
    }
}

MyVueRouter.install = install
