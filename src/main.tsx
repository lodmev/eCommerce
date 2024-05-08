import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './Variables.module.css';

const root = document.createElement('div');
root.id = 'root';
document.body.append(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
