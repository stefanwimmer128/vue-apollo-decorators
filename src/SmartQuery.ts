import {
    DocumentNode,
} from "graphql";
import Vue, {
    ComponentOptions,
} from "vue";
import {
    createDecorator,
    VueDecorator,
} from "vue-class-component";

import {
    VueApolloQueryDefinitionPatched,
} from "./types";

import {
    mergeOptions,
} from "./utils";

export default function SmartQuery(query: DocumentNode): VueDecorator;
export default function SmartQuery<C = any, R = any, V = any, D = any, SV = any, SD = any>(options: VueApolloQueryDefinitionPatched<C, R, V, D, SV, SD>): VueDecorator;
export default function SmartQuery<C = any, R = any, V = any, D = any, SV = any, SD = any>(options: DocumentNode | VueApolloQueryDefinitionPatched<C, R, V, D, SV, SD>): VueDecorator {
    return createDecorator((componentOptions: ComponentOptions<Vue>, key: string) => {
        const apollo = componentOptions.apollo = componentOptions.apollo || {};
        
        apollo[key] = mergeOptions(apollo[key] as any, options);
    });
}
