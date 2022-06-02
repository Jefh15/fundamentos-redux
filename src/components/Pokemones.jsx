import React from 'react'
// importo dos hooks useDispatch y useSelector ya configuradps en react-redux

// hooks react redux
// useDispatch ---> sirve para consumir nuestra accion
// useSelector --> para leer el array(que es toda la lista del array) de mi API
import { useDispatch, useSelector } from 'react-redux'

// importamos la acción
import {
    anteriorPokemonAccion,
    obtenerPokemonesAccion,
    siguientePokemonAccion,
    unpokeDetalleAccion
} from '../redux/pokeDucks'
// importo mi componente
import Detalle from './Detalle'


const Pokemones = () => {

    // declaramos displach para llamar a la acción o acciones
    // para ello importamos la accion --> obtenerPokemonesAccion
    const dispatch = useDispatch()

    // crearmos el state utilizando nuestra tienda
    // store.pokemones lo sacamos de la tienda
    // AQUI TRABAJO LA LISTA DE POKEMONES
    const pokemones = useSelector(
        // devuelve una funcion de flecha a nuestro store
        // como queremos solo acceder al results --> results
        store => store.pokemones.results
    )
    // imprimo los el array de pokemones
    // console.log(pokemones)

    // para la paginacion, si existe el next
    const next = useSelector(
        // devuelve una funcion de flecha a nuestro store
        // como queremos solo acceder al results --> results
        store => store.pokemones.next
    )

    // para la paginacion, si existe previous
    const previous = useSelector(
        // devuelve una funcion de flecha a nuestro store
        // como queremos solo acceder al results --> results
        store => store.pokemones.previous
    )


    return (
        <div
            className='row'
        >

            {/* trabajamos con el sistema de columnas */}
            <div className="col-md-6">

                <h3>Pokemones!</h3>

                <br />


                {/* para separar los botones */}
                <div className="d-flex justify-content-between">
                    {/* HAGO UNA CONDICION PARA LOS BOTONES */}
                    {
                        // SI POKEMONES.lenght es igual a 0 ---> mostramos el boton de pokemones
                        pokemones.length === 0 && (
                            // muestro el boton de obtener pokemones
                            // {/* Me creo un boton */ }
                            < button
                                className='btn btn-warning mr-2'
                                // on click
                                onClick={
                                    // dispatch( llama la funcion especifica)
                                    () => dispatch(obtenerPokemonesAccion())}>Obtener pokemones</button>
                        )
                    }


                    {/* HAGO UNA CONDICION PARA EL BOTON DE NEXT */}
                    {
                        // SI EL NEXT NO ES NULL --> SI next existe pintemos el boton
                        next && (
                            // {/* Me creo otro boton siguiente */ }
                            < button
                                className='btn btn-info mr-2'
                                // on click
                                onClick={
                                    // dispatch( llama la funcion especifica)
                                    // siguientePokemonAccion(RECIBE UN NUMERO)
                                    () => dispatch(siguientePokemonAccion())}>Siguiente →</button>
                        )

                    }

                    {/* HAGO UNA CONDICION PARA EL BOTON DE PREVIOUS */}
                    {
                        // SI EL PREVIOUS NO ES NULL --> SI previous existe pintemos el boton
                        previous && (
                            // {/* Me creo otro boton anterior */ }
                            < button
                                className='btn btn-danger mr-2'
                                // on click
                                onClick={
                                    // dispatch( llama la funcion especifica)
                                    // anteriorPokemonAccion(RECIBE UN NUMERO)
                                    () => dispatch(anteriorPokemonAccion())}>← Anterior</button>
                        )
                    }
                </div>





                {/* hago una lista */}
                <ul className='list-group mt-3'>
                    {
                        // recorro mis pokemones
                        pokemones.map((item, index) => (
                            <li
                                // le paso mi key
                                key={item.name}
                                // clases
                                className='list-group-item text-uppercase'
                            >
                                {item.name}
                                {/* hago un boton dentro */}
                                <button
                                    className="btn btn-success btn-sm float-right"
                                    // funcion
                                    // url -> viene de --> item.url
                                    onClick={() => dispatch(unpokeDetalleAccion(item.url))}
                                >Info</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="col-md-6">
                <h3>Detalle Pokemon</h3>
                <Detalle />
            </div>
        </div >
    )
}

export default Pokemones