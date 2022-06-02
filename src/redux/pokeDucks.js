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
    // array: [],
    // offset---> para que inicie en 0 para poder hacer la paginacion
    // offset: 0

    // como vamos a paginar
    count: 0,
    next: null,
    previous: null,
    results: []
}




// MIS TYPE
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO'
const ANTERIOR_POKEMONES_EXITO = 'ANTERIOR_POKEMONES_EXITO'
const POKE_INFO_EXITO = 'POKE_INFO_EXITO'






// REDUCER
// (nuestro estado---> siempre es igual a la data inicial y nuestra action)
export default function pokeReducer(state = dataInitial, action) {

    // para pasar de accion en accion que cambia
    switch (action.type) {
        // boton de obtener
        case OBTENER_POKEMONES_EXITO:
            // abrimos un objeto
            return {
                // el state tiene que ser copiado de su data inicial
                ...state,
                // le decimos que reemplace lo que haya cambiado
                ...action.payload
            }

        // boton de siguiente
        case SIGUIENTE_POKEMONES_EXITO:
            // abrimos un objeto
            return {
                // el state tiene que ser copiado de su data inicial
                ...state,
                // le decimos que reemplace lo que haya cambiado
                ...action.payload
            }

        // boton de anterior
        case ANTERIOR_POKEMONES_EXITO:
            // abrimos un objeto
            return {
                // el state tiene que ser copiado de su data inicial
                ...state,
                // le decimos que reemplace lo que haya cambiado
                ...action.payload
            }

        // boton de anterior
        case POKE_INFO_EXITO:
            // abrimos un objeto
            return {
                // el state tiene que ser copiado de su data inicial
                ...state,
                // le decimos tome lo que tenga el payload
                unPokemon: action.payload
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

    // getState().pokemones ---> acccedemos a los pokemones 
    // console.log('getState', getState().pokemones.offset)

    // accedemos al offset de mi estado initialState
    // Hago destructuring para obtener la propiedad offset
    // const { offset } = getState().pokemones


    // CUANDO OBTENEMOS POKEMONES POR PRIMERA VEZ, podemos preguntar si es necesario hacer la peticion de nuevo
    // 'offset=0' ----> esta en mi key en mi localstorage
    if (localStorage.getItem('offset=0')) {
        // si eso existe
        console.log('datos guardados')


        // como ya tenemos la data simplemente hacemos el dispatch
        // para poder activar nuestro switch ocupamos el dispath
        dispatch(
            // hago un objeto
            {
                // senalamos el type
                type: OBTENER_POKEMONES_EXITO,
                // tiene la respuesta
                payload:
                    // LO SACAMOS DE LOCALSTORAGE
                    // COMO VIENE EN STRING ---> TENEMOS QUE TRASFORMARLO A ARRAY con ---> JSON.parse()
                    JSON.parse(localStorage.getItem('offset=0'))

            })

        // HAGO EL RETURN para que salga del if
        return
    }



    try {
        console.log('datos desde la api')

        // guardo la respuesta de la espera de axios
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=4`)
        // para obtener el resultado
        // res.data.results
        // console.log(res.data) // aqui viene toda la informacion de la API
        // podemos utilizar previus

        // para poder activar nuestro switch ocupamos el dispath
        dispatch(
            // hago un objeto
            {
                // senalamos el type
                type: OBTENER_POKEMONES_EXITO,
                // tiene la respuesta
                payload:
                    // para obtener la lista de los pokemones
                    // data lo proporcion axios
                    res.data

            })

        // guardamos en localStorage el res
        // como es un array y debo guardarlo en localStorage que solo permite string lo tranformo a string con JSON.stringify(propiedad)
        // 'offset=0' ----> esta en mi key en mi localstorage
        localStorage.setItem('offset=0', JSON.stringify(res.data))



    } catch (error) {
        console.log(error)
    }

}


// ACCIONES
// devuelve dos funciones de flecha
// () ---> dentro van los paramtros
// () ---> necesita un dispath y un getState
// dispatch -> activamos el reducer
// getState -> obtenemos la data inicial en el state
// como es un llamado de un api es async
export const siguientePokemonAccion = () => async (dispatch, getState) => {

    // getState().pokemones ---> acccedemos a los pokemones 
    // console.log('getState', getState().pokemones.offset)

    // accedemos al offset de mi estado initialState
    // Hago destructuring para obtener la propiedad offset
    // const { offset } = getState().pokemones
    // // le sumo 20 a la peticion
    // const siguiente = offset + numero


    // accedo 
    const { next } = getState().pokemones
    // console.log(next)


    // next ----> esta en mi key en mi localstorage
    if (localStorage.getItem(next)) {
        // si eso existe
        console.log('datos guardados')


        // como ya tenemos la data simplemente hacemos el dispatch
        // para poder activar nuestro switch ocupamos el dispath
        dispatch(
            // hago un objeto
            {
                // senalamos el type
                type: OBTENER_POKEMONES_EXITO,
                // tiene la respuesta
                payload:
                    // LO SACAMOS DE LOCALSTORAGE
                    // COMO VIENE EN STRING ---> TENEMOS QUE TRASFORMARLO A ARRAY con ---> JSON.parse()
                    JSON.parse(localStorage.getItem(next))

            })

        // HAGO EL RETURN para que salga del if
        return
    }



    try {

        console.log('datos desde la api')
        // guardo la respuesta de la espera de axios
        // next es toda nuestra url
        const res = await axios.get(next)
        // para obtener el resultado
        // res.data.results

        // para poder activar nuestro switch ocupamos el dispath
        dispatch(
            // hago un objeto
            {
                // senalamos el type
                type: SIGUIENTE_POKEMONES_EXITO,
                // tiene la respuesta
                payload:
                    // para obtener la lista de los pokemones
                    // data lo proporcion axios
                    res.data

                // {
                // ahora es un objeto en mi payload
                // array: res.data.results,
                // offset: siguiente

                // }
            })

        // guardamos en localStorage el res
        // como es un array y debo guardarlo en localStorage que solo permite string lo tranformo a string con JSON.stringify(propiedad)
        // next ----> esta en mi key en mi localstorage
        localStorage.setItem(next, JSON.stringify(res.data))




    } catch (error) {
        console.log(error)
    }


}

// ACCIONES
// devuelve dos funciones de flecha
// () ---> dentro van los paramtros
// () ---> necesita un dispath y un getState
// dispatch -> activamos el reducer
// getState -> obtenemos la data inicial en el state
// como es un llamado de un api es async
export const anteriorPokemonAccion = () => async (dispatch, getState) => {

    // getState().pokemones ---> acccedemos a los pokemones 
    // console.log('getState', getState().pokemones.offset)

    // accedemos al offset de mi estado initialState
    // Hago destructuring para obtener la propiedad offset
    // const { offset } = getState().pokemones
    // // le sumo 20 a la peticion
    // const siguiente = offset + numero


    // accedo 
    const { previous } = getState().pokemones
    // console.log(previous)
    // saco la cantidad de pokemones
    // console.log(getState().pokemones.count)


    // previous ----> esta en mi key en mi localstorage
    if (localStorage.getItem(previous)) {
        // if (localStorage.getItem(previous) && localStorage.getItem(previous).length === getState().pokemones) {
        // si eso existe
        console.log('datos guardados')


        // como ya tenemos la data simplemente hacemos el dispatch
        // para poder activar nuestro switch ocupamos el dispath
        dispatch(
            // hago un objeto
            {
                // senalamos el type
                type: OBTENER_POKEMONES_EXITO,
                // tiene la respuesta
                payload:
                    // LO SACAMOS DE LOCALSTORAGE
                    // COMO VIENE EN STRING ---> TENEMOS QUE TRASFORMARLO A ARRAY con ---> JSON.parse()
                    JSON.parse(localStorage.getItem(previous))


            })

        // HAGO EL RETURN para que salga del if
        return
    }

    try {

        console.log('datos desde la api')

        // guardo la respuesta de la espera de axios
        // next es toda nuestra url
        const res = await axios.get(previous)
        // para obtener el resultado
        // res.data.results

        // para poder activar nuestro switch ocupamos el dispath
        dispatch(
            // hago un objeto
            {
                // senalamos el type
                type: ANTERIOR_POKEMONES_EXITO,
                // tiene la respuesta
                payload:
                    // para obtener la lista de los pokemones
                    // data lo proporcion axios
                    res.data

                // {
                // ahora es un objeto en mi payload
                // array: res.data.results,
                // offset: siguiente

                // }
            })

        // guardamos en localStorage el res
        // como es un array y debo guardarlo en localStorage que solo permite string lo tranformo a string con JSON.stringify(propiedad)
        // previous ----> esta en mi key en mi localstorage
        localStorage.setItem(previous, JSON.stringify(res.data))



    } catch (error) {
        console.log(error)
    }

}




// ACCIONES
// devuelve dos funciones de flecha
// () ---> dentro van los paramtros
// () ---> necesita un dispath y un getState
// dispatch -> activamos el reducer
// getState -> obtenemos la data inicial en el state
// como es un llamado de un api es async
export const unpokeDetalleAccion = (url = 'https://pokeapi.co/api/v2/pokemon/1/') => async (dispatch, getState) => {

    // // cuando abra la aplicacion por primera ves, y no le mandamos una url
    // // si la url es igual undefined, osea no esta definida
    // if (url === undefined) {
    //     // cuando abra la aplicacion por primera ves, y no le mandamos una url
    //     // traiga esta por defecto
    //     url = 'https://pokeapi.co/api/v2/pokemon/1/'

    // }

    // url ----> esta en mi key en mi localStorage
    if (localStorage.getItem(url)) {

        // si eso existe
        console.log('datos guardados')


        // como ya tenemos la data simplemente hacemos el dispatch
        // para poder activar nuestro switch ocupamos el dispath
        dispatch(
            // hago un objeto
            {
                // senalamos el type
                type: POKE_INFO_EXITO,
                // tiene la respuesta
                payload:
                    // LO SACAMOS DE LOCALSTORAGE
                    // COMO VIENE EN STRING ---> TENEMOS QUE TRASFORMARLO A ARRAY con ---> JSON.parse()
                    JSON.parse(localStorage.getItem(url))
            })

        // HAGO EL RETURN para que salga del if
        return
    }



    try {

        console.log('datos desde la api')

        // guardo la respuesta de la espera de axios
        // next es toda nuestra url
        const res = await axios.get(url)
        // para obtener el resultado
        // console.log(res.data)
        // res.data.results

        // para poder activar nuestro switch ocupamos el dispath
        dispatch(
            // hago un objeto
            {
                // senalamos el type
                type: POKE_INFO_EXITO,
                // tiene la respuesta
                payload:
                // para obtener la lista de los pokemones
                // data lo proporcion axios
                // res.data

                {
                    // ahora es un objeto en mi payload
                    // de mi peticion de mi payload tomamos
                    nombre: res.data.name,
                    ancho: res.data.weight,
                    alto: res.data.height,
                    foto: res.data.sprites.front_default
                }
            })

        // guardamos en localStorage el res
        // como es un array y debo guardarlo en localStorage que solo permite string lo tranformo a string con JSON.stringify(propiedad)
        // url ----> esta en mi key en mi localstorage ---> para que sea siempre distinta
        localStorage.setItem(url, JSON.stringify({
            // contruimos el string para no pasar todo el res.data --> pasar solo lo necesario
            nombre: res.data.name,
            ancho: res.data.weight,
            alto: res.data.height,
            foto: res.data.sprites.front_default
        }))


    } catch (error) {
        console.log(error)
    }

}