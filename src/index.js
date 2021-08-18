import { install } from "./install";
import { supportsPushState } from "./util/push-state";
import {HashHistory} from "./history/hash";
import {HTML5History} from "./history/html5";
import {AbstractHistory} from "./history/abstract";

export default class MyVueRouter {
    constructor (options = {}) {
        this.app = null
        this.apps = []
        this.options = options
        console.log('gsdoptions', options)
        let mode = options.mode || 'hash'
        this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false
        if (this.fallback) {
            mode = 'hash'
        }
        this.mode = mode
        switch (mode) {
            case 'history':
                this.history = new HTML5History(this, options.base)
                break
            case 'hash':
                this.history = new HashHistory(this, options.base, this.fallback)
                break
            case 'abstract':
                this.history = new AbstractHistory(this, options.base)
                break
            default:
                // TODO
        }
    }
    init (app) {
        this.apps.push(app)
        // TODO
        this.app = app
        const history = this.history
        if (history instanceof HTML5History) {
            // TODO
        } else if (history instanceof HashHistory) {
            //TODO
        }
        // TODO
    }
}

MyVueRouter.install = install
