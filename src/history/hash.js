import { History } from "./base";

export class HashHistory extends History {
    constructor (router, base, fallback) {
        super(router, base)
    }
    getCurrentLocation () {
        return getHash()
    }
    setupListeners () {

    }
}

export function getHash () {
    return ''
}
