export function createRouteMap (routes) {
    const pathList = []
    // $flow-disable-line
    const pathMap= Object.create(null)
    // $flow-disable-line
    const nameMap= Object.create(null)
    routes.forEach(route => {
        addRouteRecord(pathList, pathMap, nameMap, route)
    })
    return {
        pathList,
        pathMap,
        nameMap
    }
}

function addRouteRecord (pathList,pathMap,nameMap,route) {
    const { path, name } = route
    const record = {
        path: path,
        components: route.components || { default: route.component },
    }
    if (!pathMap[record.path]) {
        pathList.push(record.path)
        pathMap[record.path] = record
    }
}
