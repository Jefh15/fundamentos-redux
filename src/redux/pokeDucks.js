// TRABAJO DE FORMA ORDENADA
// ESTO TIPO DE DUCK PIDE --->
// 1 - CONSTANTES --> con esta contante o estado puedo consumirlo en un componente
// 2 - REDUCER  ----> acptar la lista de pokemones y lo envio al estado o contante
// 3 - ACCIONES  ---> consume la api
// -----------------------------------------------
// LLAMO la dependencia axios para poder obtener peticiones de mi API
import axios from 'axios'


// CONSTANTES
const dataInitial = {
    // nuestro estado que inicial limpio
    array: []
}

// MIS TYPE
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'


// REDUCER
// (nuestro estado---> siempre es igual a la data inicial y nuestra action)
export default function pokeReducer(state = dataInitial, action) {

    // para pasar de accion en accion que cambia
    switch (action.type) {
        case OBTENER_POKEMONES_EXITO:

            // abrimos un objeto
            return {
                // el state tiene que ser copiado de su data inicial
                state,
                // le decimos que ese array va a ser a la accion de mi payload
                array: action.payload
            }

        // en caso de que no se lea ninguna de nuestro state
        default:
            // devuelva nuestro state inicial o ya modificado
            return state

    }

}




// ACCIONES
// devuelve dos funciones de flecha
// () ---> dentro van los paramtros
// () ---> necesita un dispath y un getState
// dispatch -> activamos el reducer
// getState -> obtenemos la data inicial en el state
// como es un llamado de un api es async
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {

    try {

        // guardo la respuesta de la espera de axios
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
        // para obtener el resultado
        // res.data.results

        // para poder activar nuestro switch ocupamos el dispath
        dispatch(
            // hago un objeto
            {
                // senalamos el type
                type: OBTENER_POKEMONES_EXITO,
                // tiene la respuesta
                payload:
                    // para obtener la lista de los pokemones
                    res.data.results
            })


    } catch (error) {
        console.log(error)
    }


}