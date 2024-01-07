import React from 'react'
import ReactDOM from 'react-dom/client'
import { Layout } from './features/layout/Layout';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import './main.css';
import {
  Store,
  RecordSource,
  Environment,
  Network,
  FetchFunction
} from 'relay-runtime';
import { RelayEnvironmentProvider } from 'react-relay';
import { fetchFunction } from './features/fetching/fetchFunction';

function createEnvironment() {
  const network = Network.create(fetchFunction as FetchFunction);
  const store = new Store(new RecordSource());
  return new Environment({ store, network });
}

const environment = createEnvironment();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <Layout />
    </RelayEnvironmentProvider>
  </React.StrictMode>,
)
