import {
    VueApolloQueryDefinition,
    VueApolloSubscribeToMoreOptions,
} from "vue-apollo/types/options";

/**
 * Type to allow a single or an array of a type
 * @param T Type of wrap
 * @since 1.1.0
 */
export type Many<T> = T | T[];

/**
 * Override this for functions
 * @param F Possible function
 * @param T Type to bind to
 * @since 1.1.0
 */
export type OverrideThis<F, T> = F extends (...args: infer A) => infer B ? (this: T, ...args: A) => B : F;

/**
 * Override this for all functions in an object type
 * @param O Object type to operate on
 * @param T Type to bind to
 * @since 1.1.0
 */
export type OverrideAllThis<O, T> = {
    [key in keyof O]: OverrideThis<O[key], T>;
};

/**
 * Type of subscibe to more options
 * @param C Vue Component
 * @param R Type of returned value
 * @param SV Type of subscription values
 * @param SD Type of subscription data
 * @since 1.1.0
 */
export interface SubscribeToMoreOptionsPatched<C = any, R = any, SV = any, SD = any> extends OverrideAllThis<Omit<VueApolloSubscribeToMoreOptions<R, SV>, "updateQuery" | "variables">, C> {
    variables?: (this: C) => SV;
    updateQuery?: (this: C, previousQueryResult: R, options: {
        subscriptionData: {
            data: SD;
        };
        variables?: SV;
    }) => R;
}

/**
 * Type of smart query options
 * @param C Vue Component
 * @param R Type of returned value
 * @param V Type of query values
 * @param D Type of query data
 * @param SV Type of subscription values
 * @param SD Type of subscription data
 * @since 1.1.0
 */
export interface VueApolloQueryDefinitionPatched<C = any, R = any, V = any, D = any, SV = any, SD = any> extends OverrideAllThis<Omit<VueApolloQueryDefinition<R, V>, "variables" | "update" | "subscribeToMore">, C> {
    variables?: (this: C) => V | V;
    update?: (this: C, data: D) => R;
    subscribeToMore?: Many<SubscribeToMoreOptionsPatched<C, R, SV, SD>>;
}
