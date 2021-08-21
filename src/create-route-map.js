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

function addRouteRecord (pathList,pathMap,nameMap,route,parent) {
    const { path, name } = route
    const normalizedPath = normalizePath(path, parent)
    const record = {
        path: normalizedPath,
        components: route.components || { default: route.component },
    }
    if (route.children) {
        route.children.forEach(child => {
            addRouteRecord(pathList, pathMap, nameMap, child, record)
        })
    }
    if (!pathMap[record.path]) {
        pathList.push(record.path)
        pathMap[record.path] = record
    }
}

function normalizePath (path,parent) {
    if (parent == null) return path
    return `${parent.path}/${path}`
}
