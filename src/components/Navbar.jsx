import React from 'react'
// para poder hacer las rutas y redirigir
import { Link, NavLink } from 'react-router-dom'

// para poder usar mis acciones de mi store
import { useDispatch, useSelector } from 'react-redux'

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


    // creo esta constante para obtener si tengo un usuario activo
    const activo = useSelector(store => store.usuario.activo)







    return (
        <div className="navbar navbar-dark bg-dark">
            {/* para poder moverme a ese link, dando clic al nombre */}
            <Link
                // envienos a la pagina de inicio
                to="/"
                className="navbar-brand">Poke API</Link>

            <div>
                <div className="d-flex">

                    {/* condiciono si mi usuario esta activo para poder ocultar los botones y si no mostrarlos */}
                    {
                        activo ? (

                            // SI ESTA ACTIVO MUESTRE LOS BOTONES DE HOME Y CERRAR SESION

                            // uso fragment como es mas de un elemento
                            <>
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
                                {/* NavLink --> para pintar la clase active */}
                                <NavLink
                                    className="btn btn-info mr-2"
                                    // envianos al inicio o ruta raiz
                                    to="/perfil"
                                    // con el exact --> coloca el active cuando este en la ruta
                                    exact
                                >
                                    Perfil
                                </NavLink>
                                <button
                                    className="btn btn-danger"
                                    // llamo mi metodo 
                                    onClick={() => cerrarSesion()}
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            // SI NO ESTA ACTIVO MUESTRO SOLO EL BOTON DE LOGIN 
                            <NavLink
                                className="btn btn-dark mr-2"
                                // envianos al login
                                to="/login"
                                // con el exact --> coloca el active cuando este en la ruta
                                exact
                            >
                                Login
                            </NavLink>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)