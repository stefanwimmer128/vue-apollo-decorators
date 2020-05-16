import Vue, {
    ComponentOptions,
} from "vue";
import {
    createDecorator,
    VueDecorator,
} from "vue-class-component";

import {
    Many,
    SubscribeToMoreOptionsPatched,
} from "./types";

import {
    mergeOptions,
} from "./utils";

export default function SubscribeToMore<C = any, R = any, SV = any, SD = any>(options: Many<SubscribeToMoreOptionsPatched<C, R, SV, SD>>): VueDecorator {
    return createDecorator((componentOptions: ComponentOptions<Vue>, key: string) => {
        const apollo = componentOptions.apollo = componentOptions.apollo || {};
        
        apollo[key] = mergeOptions(apollo[key] as any, {
            subscribeToMore: options,
        });
    });
}
