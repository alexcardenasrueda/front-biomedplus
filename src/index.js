import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppRouter } from './AppRouter';
import Menu from './components/menu/menu';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    < Menu />
    < AppRouter />
  </React.StrictMode>
);
