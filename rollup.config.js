export default {
    input: "lib/index.js",
    output: {
        file: "lib/index.umd.js",
        format: "umd",
        name: "VueApolloDecorators",
        exports: "named",
        globals: {
            "vue-class-component": "VueClassComponent",
        },
    },
    external: [
        "vue-class-component",
    ],
};
