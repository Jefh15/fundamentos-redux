import React from 'react'

// importo el useDispatch
import { useDispatch } from 'react-redux'
// importo la accion para poder usuarla en el boton
import { ingresoUsuarioAccion } from '../redux/usuarioDucks'



const Login = () => {

    // inicializo el dispatch
    const dispatch = useDispatch()


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
            >
                Ingresar con Google
            </button>
        </div>
    )
}

export default Login