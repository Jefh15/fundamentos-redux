import React from 'react'
// importo dos hooks useDispatch y useSelector ya configuradps en react-redux

// hooks react redux
// useDispatch ---> sirve para consumir nuestra accion
// useSelector --> para leer el array(que es toda la lista del array) de mi API
import { useDispatch, useSelector } from 'react-redux'

// importamos la acción
import {
    obtenerPokemonesAccion,
    siguientePokemonAccion
} from '../redux/pokeDucks'


const Pokemones = () => {

    // declaramos displach para llamar a la acción o acciones
    // para ello importamos la accion --> obtenerPokemonesAccion
    const dispatch = useDispatch()

    // crearmos el state utilizando nuestra tienda
    // store.pokemones lo sacamos de la tienda
    const pokemones = useSelector(
        // devuelve una funcion de flecha a nuestro store
        // como queremos solo acceder al results --> results
        store => store.pokemones.results
    )
    // imprimo los el array de pokemones
    console.log(pokemones)



    return (
        <div className='container mt-2'>
            <h1>Pokemones!</h1>
            {/* Me creo un boton */}
            <button
                className='btn btn-info'
                // on click
                onClick={
                    // dispatch( llama la funcion especifica)
                    () => dispatch(obtenerPokemonesAccion())}>Obtener pokemones</button>
            {/* Me creo otro boton siguiente */}
            <button
                className='btn btn-info'
                // on click
                onClick={
                    // dispatch( llama la funcion especifica)
                    // siguientePokemonAccion(RECIBE UN NUMERO)
                    () => dispatch(siguientePokemonAccion(20))}>Siguiente</button>
            {/* hago una lista */}
            <ul>
                {
                    // recorro mis pokemones
                    pokemones.map((item, index) => (
                        <li
                            // le paso mi key
                            key={item.name}>{item.name}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Pokemones