import { Variables } from "relay-runtime";
import fetch from "isomorphic-fetch";

async function fetchGraphQL(text: string, variables: Variables) {
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        body: JSON.stringify({
        query: text,
        variables,
        }),
    });

    return await response.json();
}
  
export default fetchGraphQL;