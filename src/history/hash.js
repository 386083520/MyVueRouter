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
        })
    }
}

export function getHash () {
    return ''
}
