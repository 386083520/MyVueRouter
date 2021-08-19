export function createMatcher (routes, router) {
    console.log('gsdcreateMatcher', routes, router)
    function match(raw) {
        console.log('gsdraw', raw)
        if(raw === '/foo') {
            return {
                "meta":{

                },
                "path":"/foo",
                "hash":"",
                "query":{

                },
                "params":{

                },
                "fullPath":"/foo",
                "matched":[
                    {
                        "path":"/foo",
                        "regex":{
                            "keys":[

                            ]
                        },
                        "components":{
                            "default":{
                                "template":"<div>foo</div>"
                            }
                        },
                        "instances":{

                        },
                        "meta":{

                        },
                        "props":{

                        }
                    }
                ]
            }
        }else if(raw === '/bar') {
            return {
                "meta":{

                },
                "path":"/bar",
                "hash":"",
                "query":{

                },
                "params":{

                },
                "fullPath":"/bar",
                "matched":[
                    {
                        "path":"/bar",
                        "regex":{
                            "keys":[

                            ]
                        },
                        "components":{
                            "default":{
                                "template":"<div>bar</div>"
                            }
                        },
                        "instances":{

                        },
                        "meta":{

                        },
                        "props":{

                        }
                    }
                ]
            }
        }
    }
    function addRoutes() {
    }
    return {
        match,
        addRoutes
    }
}
