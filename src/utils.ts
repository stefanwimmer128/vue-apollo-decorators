import {
    DocumentNode,
} from "graphql";
import {
    concat,
    isArray,
    isObject,
    mergeWith,
} from "lodash";

import {
    VueApolloQueryDefinitionPatched,
} from "./types";

/**
 * Check if a value is a DocumentNode
 * @param value Value to check
 * @return Whether value is a DocumentNode
 * @since 1.2.0
 */
export function isDocumentNode(value: any) {
    return isObject(value) && (value as DocumentNode).kind === "Document";
}

/**
 * Normalize Vue Apollo options
 * @param options Options to normalize
 * @return Normalized options
 * @since 1.2.0
 */
export function normalizeOptions(options: DocumentNode | Partial<VueApolloQueryDefinitionPatched> = {}) {
    const query: Partial<VueApolloQueryDefinitionPatched> = isDocumentNode(options) ? {
        query: options as DocumentNode,
    } : options as any;
    
    query.subscribeToMore = concat([], isDocumentNode(options) ? [] : (options as VueApolloQueryDefinitionPatched).subscribeToMore || []);
    
    return query;
}

/**
 * Merge Vue Apollo options
 * @param original Options to merge into
 * @param options Options to merge
 * @return Merged options
 * @since 1.2.0
 */
export function mergeOptions(original: DocumentNode | Partial<VueApolloQueryDefinitionPatched>, options: DocumentNode | Partial<VueApolloQueryDefinitionPatched>) {
    return mergeWith(normalizeOptions(original), normalizeOptions(options), (origVal, option) => {
        if (isArray(origVal))
            return concat(origVal, option);
    });
}
