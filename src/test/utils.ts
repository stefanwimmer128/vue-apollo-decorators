import gql from "graphql-tag";

export const NORMALIZED_OPTIONS = {
    subscribeToMore: [],
};

export function getTestGql() {
    return gql`query {
        test
    }`;
}
