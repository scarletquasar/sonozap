import { Observable } from "relay-runtime";

const fetchFunction = ((params: { text: string }, variables: Record<string, string>) => {
    console.log(variables);
    const response = fetch("http://127.0.0.1:4000/graphql", {
      mode: 'cors',
      method: "POST",
      headers: [["Content-Type", "application/json"]],
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
    });
  
    return Observable.from(response.then((data) => data.json()));
});

export { fetchFunction }