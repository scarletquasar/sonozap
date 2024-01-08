import { Network, FetchFunction, Store, RecordSource, Environment } from "relay-runtime";
import { fetchFunction } from "./features/fetching/fetchFunction";

function createEnvironment() {
    const network = Network.create(fetchFunction as FetchFunction);
    const store = new Store(new RecordSource());
    return new Environment({ store, network });
}
  
const environment = createEnvironment();

export { environment }