import React from 'react'
import ReactDOM from 'react-dom/client'
import { Layout } from './features/layout/Layout';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>,
)
