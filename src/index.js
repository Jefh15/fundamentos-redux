import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';


// importo mi provedor de redux
import { Provider } from 'react-redux'
// importo la store de redux
import generateStore from './redux/store'


// hago la contante que me ayuda a poder generar y usar mis patos
const store = generateStore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  // {/* envuelvo mis componentes en un provider para poder usar esos archivos de redux */ }
  // le envio al provedor el store(la tienda)
  < Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

