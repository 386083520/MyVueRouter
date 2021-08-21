export default {
    name: 'RouterView',
    functional: true,
    props: {
        name: {
            type: String,
            default: 'default'
        }
    },
    render (h, {props, parent, data, children}) {
        data.routerView = true
        const name = props.name
        const route = parent.$route
        let depth = 0
        // <div><aa><rv><rv><rv></rv></rv></rv></aa></div>
        while (parent && parent._routerRoot !== parent) {
            const vnodeData = parent.$vnode ? parent.$vnode.data : {}
            if (vnodeData.routerView) {
                depth++
            }
            parent = parent.$parent
        }
        data.routerViewDepth = depth
        const matched = route.matched[depth]
        const component = matched && matched.components[name]
        return h(component, data, children)
    }
}
