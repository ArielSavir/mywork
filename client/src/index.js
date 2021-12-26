import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// REDUX
import adminStore from './redux/adminStore/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={adminStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
