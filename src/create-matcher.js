import { createRouteMap } from './create-route-map'
export function createMatcher (routes, router) {
    console.log('gsdcreateMatcher', routes, router)
    // pathList ["/foo", "/bar"]
    // pathMap ["/bar": {path: "/bar", components: {default: {template: "<div>bar</div>"}}}]
    const { pathList, pathMap, nameMap } = createRouteMap(routes)
    console.log('gsdcreateRouteMap', pathList, pathMap, nameMap)

    function match(raw, currentRoute, redirectedFrom) {
        console.log('gsdraw', raw)

    }
    function addRoutes() {
    }
    return {
        match,
        addRoutes
    }
}
