// es nuestra tienda, todos nuestros estados disponibles de nuestra aplicacion
// UNE LOS DUCKS PARA TRABAJAR MAS FACIL

import { createStore, combineReducers, applyMiddleware } from 'redux'
// para hacer promesas con redux
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
// importo mi archivo por defecto
import pokesReducer from './pokesDucks'


// combinar todos nuestros patos
const rootReducer = combineReducers({
    // toma un objeto
    // pokemones --> nombre descriptivo para consumir
    pokemones: pokesReducer,
    // AQUI VAN TODOS NUESTROS PATOS EJ:
    // usuarios: usuarioReducer
})

// pregunta si tenemos instalada la extencion en caso contrario ocupamos conpose
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// exporto la funcion
export default function generateStore() {

    // configuro mi middleware, creo la tienda(paso nuestro root resucer, luego paso la extension( que recibe en su interior paso el middlware que el thunk))
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
    // la configurada la veolvemos
    return store
}