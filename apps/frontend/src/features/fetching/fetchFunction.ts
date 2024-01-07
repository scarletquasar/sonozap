import { Observable } from "relay-runtime";

const fetchFunction = ((params: { text: string }, variables: Record<string, string>) => {
    const response = fetch("http://my-graphql/api", {
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