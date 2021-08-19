import { START } from "../util/route";

export class History {
    constructor (router, base) {
        this.router = router
        this.current = START
    }
    transitionTo (location, onComplete, onAbort) {
        const route = this.router.match(location, this.current)
        console.log('gsdroute', route)
        this.confirmTransition(route,() => {
            this.updateRoute(route)
            onComplete && onComplete(route)
        }, err => {

        })
    }
    confirmTransition (route, onComplete, onAbort) {
        onComplete()
    }
    updateRoute (route) {
        console.log('gsdupdateRoute', route)
        this.current = route
    }
    listen (cb) {
        this.cb = cb
    }
}
