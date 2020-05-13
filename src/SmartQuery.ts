import {
    DocumentNode,
} from "graphql";
import {
    createDecorator,
    VueDecorator,
} from "vue-class-component";

import {
    VueApolloQueryDefinitionPatched,
} from "./types";

import {
    extend,
} from "./utils";

export default function SmartQuery(query: DocumentNode): VueDecorator;
export default function SmartQuery<C = any, R = any, V = any>(options: VueApolloQueryDefinitionPatched<C, R, V>): VueDecorator;
export default function SmartQuery<C = any, R = any, V = any>(options: DocumentNode | VueApolloQueryDefinitionPatched<C, R, V>): VueDecorator {
    return createDecorator((componentOptions: any, key: string) => {
        componentOptions.apollo = extend(componentOptions.apollo || {}, {
            [key]: extend(componentOptions.apollo[key] || {}, options),
        });
    });
}
