import { History } from "./base";

export class HashHistory extends History {
    constructor (router, base, fallback) {
        super(router, base)
    }
    getCurrentLocation () {
        return getHash()
    }
    setupListeners () {
        window.addEventListener('hashchange', ()=> {
            console.log('gsd')
            this.transitionTo(getHash()) // TODO
        })
    }
}

export function getHash () {
    let href = window.location.href
    const index = href.indexOf('#')
    href = href.slice(index + 1)
    return href
}
