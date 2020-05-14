import {
    createDecorator,
    VueDecorator,
} from "vue-class-component";

import {
    Many,
    SubscribeToMoreOptionsPatched,
} from "./types";

import {
    extend,
    merge,
} from "./utils";

export default function SubscribeToMore<C = any, R = any, SV = any, SD = any>(options: Many<SubscribeToMoreOptionsPatched<C, R, SV, SD>>): VueDecorator {
    return createDecorator((componentOptions: any, key: string) => {
        componentOptions.apollo = extend(componentOptions.apollo || {}, {
            [key]: extend(componentOptions.apollo[key] || {}, {
                subscribeToMore: merge([], componentOptions.apollo[key].subscribeToMore || [], options),
            }),
        });
    });
}
