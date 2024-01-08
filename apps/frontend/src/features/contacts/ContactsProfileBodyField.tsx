import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { GraphQLTaggedNode, OperationType } from "relay-runtime";

const ContactsProfileBodyField = (props: {
    selection: 'username' | 'bio', 
    query: GraphQLTaggedNode, 
    queryReference: PreloadedQuery<OperationType, Record<string, unknown>>
}) => {
    const data = usePreloadedQuery(props.query, props.queryReference) as { username: string, bio: string };
    return data[props.selection];
}

export { ContactsProfileBodyField }