import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if(process.env.NODE_ENV === "production") disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
)
