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

/**
 * Smart Query Decorator
 * @param query GraphQL Query
 * @return Decorator
 * @since 1.0.0
 */
export default function SmartQuery(query: DocumentNode): VueDecorator;

/**
 * Smart Query Decorator
 * @param C Vue Component
 * @param R Type of returned value
 * @param V Type of query variables
 * @param D Type of query data
 * @param SV Type of subscription variables
 * @param SD Type of subscription data
 * @param options Vue Apollo Options
 * @return Decorator
 * @since 1.0.0
 */
export default function SmartQuery<C = any, R = any, V = any, D = any, SV = any, SD = any>(options: VueApolloQueryDefinitionPatched<C, R, V, D, SV, SD>): VueDecorator;

export default function SmartQuery<C = any, R = any, V = any, D = any, SV = any, SD = any>(options: DocumentNode | VueApolloQueryDefinitionPatched<C, R, V, D, SV, SD>): VueDecorator {
    return createDecorator((componentOptions: ComponentOptions<Vue>, key: string) => {
        const apollo = componentOptions.apollo = componentOptions.apollo || {};
        
        apollo[key] = mergeOptions(apollo[key] as any, options);
    });
}
