// es nuestra tienda, todos nuestros estados disponibles de nuestra aplicacion
// UNE LOS DUCKS PARA TRABAJAR MAS FACIL

import { createStore, combineReducers, applyMiddleware } from 'redux'
// para hacer promesas con redux
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// importo mis reducers
import pokesReducer from './pokeDucks'
import usuarioReducer, { leerUsuarioActivoAccion } from './usuarioDucks'





// combinar todos nuestros patos
const rootReducer = combineReducers({
    // toma un objeto
    // pokemones --> nombre descriptivo para consumir
    pokemones: pokesReducer,
    // nuestro otro reducer
    usuario: usuarioReducer
})

// pregunta si tenemos instalada la extencion en caso contrario ocupamos conpose
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// exporto la funcion
export default function generateStore() {
    // eslint-disable no-underscore-dangle
    // configuro mi middleware, creo la tienda(paso nuestro root resucer, luego paso la extension( que recibe en su interior paso el middlware que el thunk))
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
    /* eslint-enable */

    // antes de que se retorne el store, ejecutamos la accion
    // como recibe un dispath ---> accedo al store que ya esta inicializado store.dispatch, para que pueda ejecutar el dispatch correspodiente
    // cada vez que se inicie o refresque la tienda, lee si existe el usuario de localStorage
    leerUsuarioActivoAccion()(store.dispatch)

    // la configurada la devolvemos
    return store
}