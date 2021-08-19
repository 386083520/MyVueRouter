export function createMatcher (routes, router) {
    function match() {
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
    }
    function addRoutes() {
    }
    return {
        match,
        addRoutes
    }
}
