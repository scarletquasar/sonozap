import {
    Environment,
    Network,
    RecordSource,
    Store,
    RequestParameters,
    Variables
} from "relay-runtime";

import fetch from "isomorphic-fetch";
  
function fetchQuery(operation: RequestParameters, variables: Variables) {
    return fetch('TODO', {
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        },
        body: JSON.stringify({
        query: operation.text,
        variables,
        }),
    }).then((response: Response) => {
        return response.json()
    });
}

const network = Network.create(fetchQuery);

const env = new Environment({
    network,
    store: new Store(new RecordSource(), {
        gcReleaseBufferSize: 10,
    }),
});

export default env;