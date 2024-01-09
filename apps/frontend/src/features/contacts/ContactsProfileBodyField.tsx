import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { GraphQLTaggedNode, OperationType } from "relay-runtime";

type ProfileBodyFieldQueryResult = { 
    getProfileWithContacts: { 
        username: string, 
        bio: string 
    } 
};

const ContactsProfileBodyField = (props: {
    selection: 'username' | 'bio', 
    query: GraphQLTaggedNode, 
    queryReference: PreloadedQuery<OperationType, Record<string, unknown>>
}) => {
    const data = usePreloadedQuery(props.query, props.queryReference) as ProfileBodyFieldQueryResult;
    return data.getProfileWithContacts[props.selection];
}

export { ContactsProfileBodyField }