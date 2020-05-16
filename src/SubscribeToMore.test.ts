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

import SubscribeToMore from "./SubscribeToMore";

describe("./SubscribeToMore", () => {
    describe("SubscribeToMore()", () => {
        it("with single subsciption", () => {
            @Component
            class TestSubscribeToMoreWithSingleSubscription extends Vue {
                @SubscribeToMore({} as any)
                private test: any;
            }
            expect(new TestSubscribeToMoreWithSingleSubscription().$options.apollo).to.deep.equal({
                test: {
                    ...NORMALIZED_OPTIONS,
                    subscribeToMore: [
                        {},
                    ],
                },
            });
        });
        
        it("with multiple subsciptions", () => {
            @Component
            class TestSubscribeToMoreWithMultipleSubscriptions extends Vue {
                @SubscribeToMore([
                    {id: 1} as any,
                    {id: 2} as any,
                ])
                @SubscribeToMore({id: 0} as any)
                private test: any;
            }
            expect(new TestSubscribeToMoreWithMultipleSubscriptions().$options.apollo).to.deep.equal({
                test: {
                    ...NORMALIZED_OPTIONS,
                    subscribeToMore: [
                        {id: 0},
                        {id: 1},
                        {id: 2},
                    ],
                },
            });
        });
    });
});
