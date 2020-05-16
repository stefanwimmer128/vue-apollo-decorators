import {
    expect,
} from "chai";
import {
    it,
    describe,
} from "mocha";

import {
    getTestGql,
    NORMALIZED_OPTIONS,
} from "./test/utils";

import {
    isDocumentNode,
    normalizeOptions,
    mergeOptions,
} from "./utils";

describe("./utils", () => {
    describe("isDocumentNode()", () => {
        it("check false positive", () => {
            expect(isDocumentNode("test")).to.be.false;
        });
        
        it("check false negative", () => {
            expect(isDocumentNode(getTestGql())).to.be.true;
        });
    });
    
    describe("normalizeOptions()", () => {
        it("check for gql", () => {
            const testGql = getTestGql();
            expect(normalizeOptions(getTestGql())).to.deep.equal({
                ...NORMALIZED_OPTIONS,
                query: testGql,
            });
        });
        
        it("check for empty", () => {
            expect(normalizeOptions({})).to.deep.equal({
                ...NORMALIZED_OPTIONS,
            });
        })
        
        describe("check with subscribeToMore", () => {
            it("for single value", () => {
                expect(normalizeOptions({
                    subscribeToMore: {} as any,
                })).to.deep.equal({
                    ...NORMALIZED_OPTIONS,
                    subscribeToMore: [
                        {},
                    ],
                });
            });
            
            it("check for multiple values", () => {
                expect(normalizeOptions({
                    subscribeToMore: [
                        {id: 0} as any,
                        {id: 1} as any,
                        {id: 2} as any,
                    ],
                })).to.deep.equal({
                    ...NORMALIZED_OPTIONS,
                    subscribeToMore: [
                        {id: 0},
                        {id: 1},
                        {id: 2},
                    ],
                });
            })
        });
    });
    
    describe("mergeOptions()", () => {
        it("merge of empty objects", () => {
            expect(mergeOptions({}, {})).to.deep.equal({
                ...NORMALIZED_OPTIONS,
            });
        });
        
        it("merge with override", () => {
            expect(mergeOptions({
                test: 0,
                var: 1,
            } as any, {
                var: 2
            } as any)).to.deep.equal({
                ...NORMALIZED_OPTIONS,
                test: 0,
                var: 2,
            });
        });
        
        it("merge with concat", () => {
            expect(mergeOptions({
                subscribeToMore: {id: 0} as any,
            }, {
                subscribeToMore: {id: 1} as any,
            })).to.deep.equal({
                ...NORMALIZED_OPTIONS,
                subscribeToMore: [
                    {id: 0},
                    {id: 1},
                ],
            });
        });
    });
});
