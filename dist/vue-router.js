/*!
  * vue-router v1.0.0
  * (c) 2021 Evan You
  * @license MIT
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.MyVueRouter = factory());
}(this, (function () { 'use strict';

    var View = {
        name: 'RouterView',
        functional: true,
        props: {
            name: {
                type: String,
                default: 'default'
            }
        },
        render (h, {props, parent, data, children}) {
            data.routerView = true;
            const name = props.name;
            const route = parent.$route;
            let depth = 0;
            // <div><aa><rv><rv><rv></rv></rv></rv></aa></div>
            while (parent && parent._routerRoot !== parent) {
                const vnodeData = parent.$vnode ? parent.$vnode.data : {};
                if (vnodeData.routerView) {
                    depth++;
                }
                parent = parent.$parent;
            }
            data.routerViewDepth = depth;
            const matched = route.matched[depth];
            const component = matched && matched.components[name];
            return h(component, data, children)
        }
    };

    var Link = {
        name: 'RouterLink',
        props: {
            to: {
                type: String,
                required: true
            },
            tag: {
                type: String,
                default: 'a'
            }
        },
        render (h) {
            const classes = {};
            const data = { class: classes };
            const href = '#' + this.to;
            if (this.tag === 'a') {
                data.attrs = { href };
            }
            return h(this.tag, data, ['RouterLink'])
        }
    };

    let _Vue;
    function install (Vue) {
        if (install.installed && _Vue === Vue) return
        install.installed = true;
        _Vue = Vue;
        const isDef = v => v !== undefined;
        Vue.mixin({
            beforeCreate () {
                if (isDef(this.$options.router)) {
                    this._routerRoot = this;
                    this._router = this.$options.router;
                    this._router.init(this);
                    Vue.util.defineReactive(this, '_route', this._router.history.current);
                } else {
                    this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
                }
                // TODO
            },
            destroyed () {
            }
        });
        Object.defineProperty(Vue.prototype, '$router', {
            get () { return this._routerRoot._router }
        });
        Object.defineProperty(Vue.prototype, '$route', {
            get () { return this._routerRoot._route }
        });
        Vue.component('RouterView', View);
        Vue.component('RouterLink', Link);
        // TODO
    }

    const inBrowser = typeof window !== 'undefined';

    const supportsPushState =
        inBrowser &&
        (function () {
            const ua = window.navigator.userAgent; // ????????????user-agent??????

            if (
                (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
                ua.indexOf('Mobile Safari') !== -1 &&
                ua.indexOf('Chrome') === -1 &&
                ua.indexOf('Windows Phone') === -1
            ) {
                return false
            }

            return window.history && 'pushState' in window.history
        })();

    function formatMatch (record) {
        const res = [];
        while (record) {
            res.unshift(record);
            record = record.parent;
        }
        return res
    }

    function createRoute (record,location,redirectedFrom,router) {
        const route = {
            path: location.path || '/',
            matched: record ? formatMatch(record) : []
        };
        return Object.freeze(route)
    }

    const START = createRoute(null, {
        path: '/'
    });

    class History {
        constructor (router, base) {
            this.router = router;
            this.current = START;
        }
        transitionTo (location, onComplete, onAbort) {
            const route = this.router.match(location, this.current);
            /*const route = {
                "path":"/foo/foochild",
                "fullPath":"/foo/foochild",
                "matched":[
                    {
                        "path":"/foo",
                        "components":{
                            "default":{
                                "template":"<div><div>foo</div><router-view></router-view></div>"
                            }
                        }
                    },
                    {
                        "path":"/foo/foochild",
                        "components":{
                            "default":{
                                "template":"<div>fooChild</div>"
                            }
                        },
                        "parent":{
                            "path":"/foo",
                            "components":{
                                "default":{
                                    "template":"<div><div>foo</div><router-view></router-view></div>"
                                }
                            }
                        }
                    }
                ]
            }*/
            console.log('gsdroute', route);
            this.confirmTransition(route,() => {
                this.updateRoute(route);
                onComplete && onComplete(route);
            }, err => {

            });
        }
        confirmTransition (route, onComplete, onAbort) {
            onComplete();
        }
        updateRoute (route) {
            console.log('gsdupdateRoute', route);
            this.current = route;
            this.cb && this.cb(route);
        }
        listen (cb) {
            this.cb = cb;
        }
    }

    class HashHistory extends History {
        constructor (router, base, fallback) {
            super(router, base);
        }
        getCurrentLocation () {
            return getHash()
        }
        setupListeners () {
            window.addEventListener('hashchange', ()=> {
                console.log('gsd');
                this.transitionTo(getHash()); // TODO
            });
        }
    }

    function getHash () {
        let href = window.location.href;
        const index = href.indexOf('#');
        href = href.slice(index + 1);
        return href
    }

    class HTML5History extends History {
        constructor (router, base) {
            super(router, base);
        }
        getCurrentLocation () {
            return getLocation(this.base)
        }
    }

    function getLocation (base) {
        return ''
    }

    class AbstractHistory extends History {
        constructor (router, base) {
            super(router, base);
        }
    }

    function createRouteMap (routes) {
        const pathList = [];
        // $flow-disable-line
        const pathMap= Object.create(null);
        // $flow-disable-line
        const nameMap= Object.create(null);
        routes.forEach(route => {
            addRouteRecord(pathList, pathMap, nameMap, route);
        });
        return {
            pathList,
            pathMap,
            nameMap
        }
    }

    function addRouteRecord (pathList,pathMap,nameMap,route,parent) {
        const { path, name } = route;
        const normalizedPath = normalizePath(path, parent);
        const record = {
            path: normalizedPath,
            components: route.components || { default: route.component },
            parent
        };
        if (route.children) {
            route.children.forEach(child => {
                addRouteRecord(pathList, pathMap, nameMap, child, record);
            });
        }
        if (!pathMap[record.path]) {
            pathList.push(record.path);
            pathMap[record.path] = record;
        }
    }

    function normalizePath (path,parent) {
        if (parent == null) return path
        return `${parent.path}/${path}`
    }

    function normalizeLocation (raw,current,append,router) {
        let next = typeof raw === 'string' ? { path: raw } : raw;
        return next
    }

    function createMatcher (routes, router) {
        console.log('gsdcreateMatcher', routes, router);
        // pathList ["/foo", "/bar"]
        // pathMap ["/bar": {path: "/bar", components: {default: {template: "<div>bar</div>"}}}]
        const { pathList, pathMap, nameMap } = createRouteMap(routes);
        console.log('gsdcreateRouteMap', pathList, pathMap, nameMap);
        function match(raw, currentRoute, redirectedFrom) {
            console.log('gsdraw', raw);
            // {hash: "", params: {},path: "/bar",query: {}, _normalized: true}
            const location = normalizeLocation(raw);
            const { name } = location;
            if (name) ; else if (location.path) {
                const record = pathMap[location.path];
                { // TODO
                    return _createRoute(record, location)
                }
            }
        }
        function addRoutes() {
        }
        function _createRoute (record,location,redirectedFrom) {
            return createRoute(record, location)
        }
        return {
            match,
            addRoutes
        }
    }

    class MyVueRouter {
        constructor (options = {}) {
            this.app = null;
            this.apps = [];
            this.options = options;
            console.log('gsdoptions', options);
            this.matcher = createMatcher(options.routes || [], this);
            let mode = options.mode || 'hash';
            this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
            if (this.fallback) {
                mode = 'hash';
            }
            this.mode = mode;
            switch (mode) {
                case 'history':
                    this.history = new HTML5History(this, options.base);
                    break
                case 'hash':
                    this.history = new HashHistory(this, options.base, this.fallback);
                    break
                case 'abstract':
                    this.history = new AbstractHistory(this, options.base);
                    break
                    // TODO
            }
        }
        init (app) {
            this.apps.push(app);
            // TODO
            this.app = app;
            const history = this.history;
            if (history instanceof HTML5History) {
                history.transitionTo(history.getCurrentLocation());
            } else if (history instanceof HashHistory) {
                const setupHashListener = () => {
                    history.setupListeners();
                };
                history.transitionTo(
                    history.getCurrentLocation(),
                    setupHashListener,
                    setupHashListener
                );
            }
            history.listen(route => {
                this.apps.forEach((app) => {
                    app._route = route;
                });
            });
        }
        match (raw,current,redirectedFrom) {
            return this.matcher.match(raw, current, redirectedFrom)
        }
    }

    MyVueRouter.install = install;

    if (inBrowser && window.Vue) {
        window.Vue.use(MyVueRouter);
    }

    return MyVueRouter;

})));
