import sourcemaps from "rollup-plugin-sourcemaps";

export default {
    input: "lib/index.js",
    output: {
        file: "lib/index.umd.js",
        format: "umd",
        name: "VueApolloDecorators",
        sourcemap: true,
        globals: {
            "lodash": "_",
            "vue-class-component": "VueClassComponent",
        },
    },
    plugins: [
        sourcemaps(),
    ],
    external: [
        "lodash",
        "vue-class-component",
    ],
};
