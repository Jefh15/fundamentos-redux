import React, { useEffect } from 'react'


import { useDispatch, useSelector } from 'react-redux'
// llamo la accion
import { unpokeDetalleAccion } from '../redux/pokeDucks'


const Detalle = () => {

    const dispatch = useDispatch()


    // para cuando la pagina se abra por primera vez
    useEffect(() => {

        // creo una funcion de flecha
        const fetchData = () => {
            // llamo la accion
            dispatch(unpokeDetalleAccion())
        }

        // llamo la funcion que cree
        fetchData()

        //   para que se ejecute solo una vez
    }, [dispatch])




    // creo la constante para pintar el pokemon
    // abra la tienda -> store ---> use la propiedad ---> pokemon ----> y use la propiedad que tiene --> unPokemon
    const pokemon = useSelector(store => store.pokemones.unPokemon)
    // muestro el pokemon
    // console.log(pokemon)



    // le digo si el pokemon existe pinte la data

    return pokemon ? (
        <div className='card mt-4 text-center'>
            <div className="card-body">
                <img
                    src={pokemon.foto}
                    alt="imagen"
                    className='img-fluid'
                />
                <div
                    className="card-title text-uppercase">
                    {pokemon.nombre}
                </div>
                <p
                    className="card-text">
                    Alto: {pokemon.alto} | Ancho: {pokemon.ancho}
                </p>
            </div>
        </div>
        // caso contrario devuelva null
    ) : (
        null
    )
}

export default Detalle