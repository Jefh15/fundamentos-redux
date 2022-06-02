import React from 'react'
// para poder hacer las rutas y redirigir
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
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
                        className="btn btn-dark"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar