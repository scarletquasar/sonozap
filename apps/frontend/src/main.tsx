import React from 'react'
import ReactDOM from 'react-dom/client'
import { Layout } from './features/layout/Layout';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import 'react-toastify/dist/ReactToastify.css';
import './main.css';
import { RelayEnvironmentProvider } from 'react-relay';
import { environment } from './environment';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <Layout />
    </RelayEnvironmentProvider>
  </React.StrictMode>,
)
