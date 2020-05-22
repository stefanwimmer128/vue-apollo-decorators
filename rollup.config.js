import alias from "@rollup/plugin-alias";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import {
    readFile,
} from "fs-extra";
import {
    EOL,
} from "os";
import cleanup from "rollup-plugin-cleanup";
import sourcemaps from "rollup-plugin-sourcemaps";

import pkg from "./package.json";

export default async function () {
    const version = process.env.VERSION || pkg.version,
        banner = `/*!${EOL} * ${pkg.name} v${version}${EOL} * ${EOL}` + (await readFile("LICENSE", {
            encoding: "utf-8",
        })).split(EOL).filter((line, i, lines) => i === lines.length - 1 ? line : true).map(line => ` * ${line}`).join(EOL) + `${EOL} */`;
    
    return {
        input: "lib/index.js",
        output: {
            format: "umd",
            name: "VueApolloDecorators",
            amd: {
                id: "vue-apollo-decorators",
            },
            sourcemap: true,
            globals: {
                "vue-class-component": "VueClassComponent",
            },
            banner,
        },
        plugins: [
            alias({
                entries: [
                    {
                        find: "lodash",
                        replacement: "lodash-es",
                    },
                ],
            }),
            resolve(),
            sourcemaps(),
            replace({
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            }),
            cleanup({
                comments: "none",
            }),
        ],
        external: [
            "vue-class-component",
        ],
    };
}
