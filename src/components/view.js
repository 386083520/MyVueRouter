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
        const name = props.name
        let depth = 0
        const route = parent.$route
        const matched = route.matched[depth]
        const component = matched && matched.components[name]
        return h(component, data, children)
    }
}
