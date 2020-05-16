import {
    VueApolloQueryDefinition,
    VueApolloSubscribeToMoreOptions,
} from "vue-apollo/types/options";

export type Many<T> = T | T[];

export type OverrideThis<F, T> = F extends (...args: infer A) => infer B ? (this: T, ...args: A) => B : F;

export type OverrideAllThis<O, T> = {
    [key in keyof O]: OverrideThis<O[key], T>;
};

export type VueApolloQueryDefinitionWithoutVariablesUpdateAndSubscribeToMore<R = any, V = any> = Omit<VueApolloQueryDefinition<R, V>, "variables" | "update" | "subscribeToMore">;

export type SubscribeToMoreOptionsPatched<C = any, R = any, SV = any, SD = any> = OverrideAllThis<Omit<VueApolloSubscribeToMoreOptions<R, SV>, "updateQuery" | "variables">, C> & {
    variables?: (this: C) => SV;
    updateQuery?: UpdateQueryFn<C, R, SV, SD>;
};

export type UpdateQueryFn<C = any, R = any, SV = any, SD = any> = (this: C, previousQueryResult: R, options: {
    subscriptionData: {
        data: SD;
    };
    variables?: SV;
}) => R;

export type UpdateFn<C = any, R = any, D = any> = (this: C, data: D) => R;

export interface VueApolloQueryDefinitionPatched<C = any, R = any, V = any, D = any, SV = any, SD = any> extends OverrideAllThis<VueApolloQueryDefinitionWithoutVariablesUpdateAndSubscribeToMore<R, V>, C> {
    variables?: (this: C) => V | V;
    update?: UpdateFn<C, R, D>;
    subscribeToMore?: Many<SubscribeToMoreOptionsPatched<C, R, SV, SD>>;
}
