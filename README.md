# Vue Apollo Decorators

Use decorators to create Vue Apollo smart queries

[Documentation](https://stefanwimmer128.github.io/vue-apollo-decorators/)

## Install

```bash
yarn add vue-apollo-decorators
npm i vue-apollo-decorators
```

``` html
<script src="https://unpkg.com/vue-apollo-decorators@2.0.0"></script>
```

## Usage

There is currently 1 decorator.

- [`@SmartQuery`](#SmartQuery)
- [`@SubscribeToMore`](#SubscribeToMore)

### <a name="SmartQuery"></a> `@SmartQuery(options: DocumentNode | VueApolloQueryDefinition)` decorator

``` ts
import gql from "graphql-tag";
import { SmartQuery } from "vue-apollo-decorator";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class YourComponent extends Vue {
    @SmartQuery<YourComponent, Todo.Query, Todo.Variables>({
        query: gql`
            query Todo($id: String!) {
                todo(id: $id) {
                    id
                    title
                }
            }
        `,
        variables() {
            return {
                id: this.id,
            };
        },
    })
    todo: Todo;
    
    id: number = 0;
}
```

is equivalent to

``` js
export default {
    apollo: {
        todo: {
            query: gql`
                query Todo($id: String!) {
                    todo(id: $id) {
                        id
                        title
                    }
                }
            `,
            variables() {
                return {
                    id: this.id,
                };
            },
        },
    },
};
```

### <a name="SubscribeToMore"></a> `@SubscribeToMore(options: SubscribeToMoreOptions)` decorator

``` ts
import gql from "graphql-tag";
import { SmartQuery, SubscribeToMore } from "vue-apollo-decorator";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class YourComponent extends Vue {
    @SmartQuery(gql`{ todos { id, title } }`) todo: Todo;
    @SubscribeToMore({
        document: gql`
            subscription TodoSubscription {
                todo {
                    id,
                    title,
                }
            }
        `,
        updateQuery(prevData, { subscriptionData }) {
            return [...prevData, ...subscriptionData];
        },
    })
    todos: Todo;
}
```

is equivalent to

``` js
export default {
    apollo: {
        todos: {
            query: gql`{ todos { id, title } }`,
            subscribeToMore: [
                {
                    document: gql`
                        subscription TodoSubscription {
                            todo {
                                id
                                title
                            }
                        }
                    `,
                    updateQuery(prevData, { subscriptionData }) {
                        return [...prevData, ...subscriptionData];
                    },
                },
            ],
        },
    },
};
```

## License

ISC License
