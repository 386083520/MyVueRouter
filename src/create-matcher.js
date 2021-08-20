import { createRouteMap } from './create-route-map'
import { normalizeLocation } from './util/location'
import { createRoute } from './util/route'
export function createMatcher (routes, router) {
    console.log('gsdcreateMatcher', routes, router)
    // pathList ["/foo", "/bar"]
    // pathMap ["/bar": {path: "/bar", components: {default: {template: "<div>bar</div>"}}}]
    const { pathList, pathMap, nameMap } = createRouteMap(routes)
    console.log('gsdcreateRouteMap', pathList, pathMap, nameMap)
    function match(raw, currentRoute, redirectedFrom) {
        console.log('gsdraw', raw)
        // {hash: "", params: {},path: "/bar",query: {}, _normalized: true}
        const location = normalizeLocation(raw, currentRoute, false, router)
        const { name } = location
        if (name) {
            // TODO
        } else if (location.path) {
            const record = pathMap[location.path]
            if (matchRoute()) { // TODO
                return _createRoute(record, location, redirectedFrom)
            }
        }
    }
    function addRoutes() {
    }
    function _createRoute (record,location,redirectedFrom) {
        return createRoute(record, location, redirectedFrom, router)
    }
    return {
        match,
        addRoutes
    }
}

function matchRoute () {
    return true
}
