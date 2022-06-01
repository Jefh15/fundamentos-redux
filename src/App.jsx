// importo mi componente
import Pokemones from "./components/Pokemones";

// importo mi provedor de redux
import { Provider } from 'react-redux'
// importo la store de redux
import generateStore from './redux/store'

function App() {

  // hago la contante que me ayuda a poder generar y usar mis patos
  const store = generateStore()

  return (
    // {/* envuelvo mis componentes en un provider para poder usar esos archivos de redux */ }
    // le envio al provedor el store(la tienda)
    < Provider store={store}>
      <Pokemones />
    </Provider >
  );
}

export default App;
