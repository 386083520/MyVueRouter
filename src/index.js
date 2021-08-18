import { install } from "./install";
import { supportsPushState } from "./util/push-state";
import {HashHistory} from "./history/hash";
import {HTML5History} from "./history/html5";
import {AbstractHistory} from "./history/abstract";
import {createMatcher} from "./create-matcher";

export default class MyVueRouter {
    constructor (options = {}) {
        this.app = null
        this.apps = []
        this.options = options
        console.log('gsdoptions', options)
        this.matcher = createMatcher(options.routes || [], this)
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
            history.transitionTo(history.getCurrentLocation())
        } else if (history instanceof HashHistory) {
            const setupHashListener = () => {
                history.setupListeners()
            }
            history.transitionTo(
                history.getCurrentLocation(),
                setupHashListener,
                setupHashListener
            )
        }
        history.listen(route => {
            this.apps.forEach((app) => {
                app._route = route
            })
        })
    }
    match (raw,current,redirectedFrom) {
        return this.matcher.match(raw, current, redirectedFrom)
    }
}

MyVueRouter.install = install
