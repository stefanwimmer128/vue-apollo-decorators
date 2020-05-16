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


export function isDocumentNode(value: any) {
    return isObject(value) && (value as DocumentNode).kind === "Document";
}

export function normalizeOptions(options: DocumentNode | Partial<VueApolloQueryDefinitionPatched> = {}) {
    const query: Partial<VueApolloQueryDefinitionPatched> = isDocumentNode(options) ? {
        query: options as DocumentNode,
    } : options as any;
    
    query.subscribeToMore = concat([], isDocumentNode(options) ? [] : (options as VueApolloQueryDefinitionPatched).subscribeToMore || []);
    
    return query;
}

export function mergeOptions(original: DocumentNode | Partial<VueApolloQueryDefinitionPatched>, options: DocumentNode | Partial<VueApolloQueryDefinitionPatched>) {
    return mergeWith(normalizeOptions(original), normalizeOptions(options), (origVal, option) => {
        if (isArray(origVal))
            return concat(origVal, option);
    });
}
