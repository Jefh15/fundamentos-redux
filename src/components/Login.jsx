import React, { useEffect } from 'react'

// importo el useDispatch
import { useDispatch, useSelector } from 'react-redux'
// importo la accion para poder usuarla en el boton
import { ingresoUsuarioAccion } from '../redux/usuarioDucks'

// ahora  vamos a empujar al usuario si esta logeado
import { withRouter } from 'react-router-dom'


// uso props porque el empujar mi usuario al home si esta activo
const Login = (props) => {

    // inicializo el dispatch
    const dispatch = useDispatch()

    // con el useSelector --> podemos llamar a nuestra tienda
    // useSelector( llamamos a toda nuestra tienda que retorne nuestra tienda pero que retorne nuestro usuario, pero que lea nuestro loading)
    const loading = useSelector(store => store.usuario.loading)
    // nos muestra si el boton esta cerrado o no
    // console.log(loading)

    // con el useSelector --> podemos llamar a nuestra tienda
    // useSelector( llamamos a toda nuestra tienda que retorne nuestra tienda pero que retorne nuestro usuario, pero que lea nuestro activo)
    const activo = useSelector(store => store.usuario.activo)
    // nos muestra si el usuario esta activo o no
    // console.log(loading)


    // cuando cargue la pagina
    useEffect(() => {
        // muestre que esta activo para ver si hay un loop
        // console.log(activo)


        // si esta activo esta en verdadero
        if (activo) {
            // empujo al usuario al inicio
            props.history.push('/')
        }
        // [activo] --> ejecute una sola vez 
    }, [activo])




    return (

        <div className="mt-5 text-center">
            <h3>Ingreso de usuarios</h3>
            <hr />
            {/* creo el boton */}
            <button
                // clases
                className="btn btn-dark"
                // metodo para poder poder crear usar la accion
                onClick={() => dispatch(ingresoUsuarioAccion())}
                // boton esta desactivado cuando el pop up esta abierto
                disabled={loading}
            >
                Ingresar con Google
            </button>
        </div>
    )
}

export default withRouter(Login)