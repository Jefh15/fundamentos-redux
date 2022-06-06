import React from 'react'
// para poder hacer las rutas y redirigir
import { Link, NavLink } from 'react-router-dom'

// para poder usar mis acciones de mi store
import { useDispatch } from 'react-redux'

// para poder empujar al usuario para login
import { withRouter } from 'react-router-dom'

// importo mi clase para poder cerrar la seccion
import { cerrarSesionAccion } from '../redux/usuarioDucks'




// utilizo las props por mi withRouter --> que me ayuda empujar a mi usuario a otra ruta
const Navbar = (props) => {

    // creo el dispath
    const dispatch = useDispatch()


    // me creo la funcion de cerrar session -> para que me empuje a la pagina de login
    const cerrarSesion = () => {
        // llamo mi accion para cerrar sesion
        dispatch(cerrarSesionAccion())
        // envio al usuario al login
        props.history.push('/login')
    }


    return (
        <div className="navbar navbar-dark bg-dark">
            {/* para poder moverme a ese link, dando clic al nombre */}
            <Link
                // envienos a la pagina de inicio
                to="/"
                className="navbar-brand">Poke API</Link>

            <div>
                <div className="d-flex">
                    {/* NavLink --> para pintar la clase active */}
                    <NavLink
                        className="btn btn-dark mr-2"
                        // envianos al inicio o ruta raiz
                        to="/"
                        // con el exact --> coloca el active cuando este en la ruta
                        exact
                    >
                        Inicio
                    </NavLink>
                    <NavLink
                        className="btn btn-dark mr-2"
                        // envianos al login
                        to="/login"
                        // con el exact --> coloca el active cuando este en la ruta
                        exact
                    >
                        Login
                    </NavLink>
                    <button
                        className="btn btn-danger"
                        // llamo mi metodo 
                        onClick={() => cerrarSesion()}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)