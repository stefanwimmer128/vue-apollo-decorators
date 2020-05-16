import {
    expect,
} from "chai";
import {
    it,
    describe,
} from "mocha";

import Vue from "vue";
import Component from "vue-class-component";

import {
    getTestGql,
    NORMALIZED_OPTIONS,
} from "./test/utils";

import SmartQuery from "./SmartQuery";

describe("./SmartQuery", () => {
    describe("SmartQuery()", () => {
        it("use with gql", () => {
            const gql = getTestGql();
            @Component
            class TestSmartQueryWithGql extends Vue {
                @SmartQuery(gql)
                private test!: any;
            }
            expect(new TestSmartQueryWithGql().$options.apollo).to.deep.equal({
                test: {
                    ...NORMALIZED_OPTIONS,
                    query: gql,
                },
            });
        });
        
        it("use with object", () => {
            const gql = getTestGql();
            @Component
            class TestSmartQueryWithObject extends Vue {
                @SmartQuery({
                    query: gql,
                    subscribeToMore: {} as any,
                })
                private test!: string;
            }
            expect(new TestSmartQueryWithObject().$options.apollo).to.deep.equal({
                test: {
                    ...NORMALIZED_OPTIONS,
                    query: gql,
                    subscribeToMore: [
                        {},
                    ],
                },
            });
        });
    });
});
