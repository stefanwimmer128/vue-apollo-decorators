import sourcemaps from "rollup-plugin-sourcemaps";

export default {
    input: "lib/index.js",
    output: {
        file: "lib/index.umd.js",
        format: "umd",
        name: "VueApolloDecorators",
        sourcemap: true,
        globals: {
            "vue-class-component": "VueClassComponent",
        },
    },
    plugins: [
        sourcemaps(),
    ],
    external: [
        "vue-class-component",
    ],
};
