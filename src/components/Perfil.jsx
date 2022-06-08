import React, { useState } from 'react'


// aqui llamamos para acceder a la tienda y obtener los metodos y acciones
import { useSelector, useDispatch } from 'react-redux'



// importo el nombre de la accion --> que es mi metodo para actualizar
import { actualizarFotoAccion, actualizarUsuarioAccion } from '../redux/usuarioDucks'




const Perfil = () => {






    // para poder obtener de mi tienda mi usuario con propiedad de user
    const usuario = useSelector(store => store.usuario.user)
    // aqui obtenemos todo el objeto del usuario
    console.log(usuario)




    // para poder obtener de mi tienda mi usuario si estoy en pantalla de carga
    const loading = useSelector(store => store.usuario.loading)
    // aqui obtenemos todo el objeto del usuario
    // console.log(loading)



    // hago un Estado para poder miestrar el nombre
    // por defecto traiga el nombre que tiene del usuario
    const [nombreUsuario, setNombreUsuario] = useState(usuario.displayName)
    // hago un Estado para poder visualizar el formulario --->
    const [activarFormulario, setActivarFormulario] = useState(false)


    // para poder usar mis acciones(metodos)
    const dispatch = useDispatch()

    // estado para mi errro de mi imagen
    const [error, setError] = useState(false)


    // me creo la funcion para poder subir la imagen
    // recibe un evento
    const seleccionarArchivo = (e) => {

        // e.target.files[0] --> pinto la imagen, porque [0] porque quiere que solo se seleccione solo una imagen
        console.log(e.target.files[0])
        // guardo en esta imagen esta constante
        const imagenCliente = e.target.files[0]

        // si no hay imagen seleccionada o cierra la ventana sin ninguna imagen
        if (imagenCliente === undefined) {
            // muestre el error de consola
            console.log('Sin imagen')
            // salga del if
            return
        }

        // si mi imagen es de tipo jpeg 
        // o --> || 
        // png
        if (imagenCliente.type === 'image/jpeg' || imagenCliente.type === 'image/png') {

            // uso mi accion
            dispatch(actualizarFotoAccion(imagenCliente))
            // pase el error a false
            setError(false)
        } else {
            // si no es de alguno de esos tipos jpeg o png, muestre ese error en consola
            console.log('Archivo no válido')
            // si tiene un error
            setError(true)
            // salga de la funcion
            return
        }
    }




    // creo mi metodo para poder saber si mi campo esta vacio
    const actualizarUsuario = () => {

        // pregunto si nuestro state esta vacio
        // osea leemos nuestro input
        if (!nombreUsuario.trim()) {

            // muestro el error en consola
            // FATLA HACER EL ERROR EN UN DIV que muestre
            console.log('Nombre vacío')
            // salga de la funcion
            return
        }

        // llamo el dispatch() --> que me ayuda a usar el metodo de mi clase
        // actualizo la tienda ---> store.js
        // actualizarUsuarioAccion(nombreUsuario) ---> lo recibe de 
        dispatch(actualizarUsuarioAccion(nombreUsuario))
        // lo paso a false par que vuelva a su estado normal
        // desaparecemos el formulario
        setActivarFormulario(false)
    }






    return (

        <div className="mt-5 text-center">
            {/* creo una card */}
            <div className="card">
                {/* todo lo de interior */}
                <div className="card-body">
                    {/* muestro la foto de perfil */}
                    <img
                        // ruta de mi imagen
                        src={usuario.photoURL}
                        // la hacemos mas pequena
                        width="100"
                        // clase para que sean responsive con bootstrap v4.1
                        className="img-fluid rounded"
                        // si no carga la imagen dele este nombre
                        alt='imagen de perfil' />
                    {/* muestro el nombre de usuario */}
                    <h5 className="card-title">Nombre: {usuario.displayName}</h5>
                    {/* muestro el email */}
                    <p className="card-text">Email: {usuario.email}</p>
                    <button
                        className='btn btn-dark'
                        // Metodo que me cambia al formulario a true ---> me muestra mi formulario para editar
                        onClick={() => setActivarFormulario(true)}
                    >
                        Editar Nombre
                    </button>

                    {/* Boton para subir mi imagen */}
                    <div className="custom-file mt-2">
                        {/* Hago la condicion si mi archivo no es una foto de .png o .jpg */}
                        {
                            // si tiene un error
                            error && (
                                <div className="alert alert-danger mt-3">
                                    [Error] <br />
                                    Solo archivos en .png o .jpg
                                </div>
                            )
                        }
                        <input
                            // para subir archivos
                            type="file"
                            // clase para que parezca un input
                            className="custom-file-input"
                            // este id tiene que ser igual al del id del label
                            id="validatedCustomFile"
                            // para detectar esa imagen
                            // e -> evento
                            // seleccionarArchivo(e) --> metodo
                            onChange={e => seleccionarArchivo(e)}
                            // requerido
                            required
                            // desactivado el boton si esta cargando
                            disabled={loading}
                            // le agrego estos estilos de linea --> para decirle que no se muestre
                            style={{ display: 'none' }}
                        />
                        <label
                            // clase
                            className=
                            // si esta cargando tenga este estilo de deshabilitado, pero si no dejalo en negro
                            {loading ? "btn btn-dark disabled" : "btn btn-dark"}
                            // tome el valor del nombre del archivo
                            htmlFor="validatedCustomFile"
                        >
                            Cambiar foto perfil
                        </label>
                    </div>


                </div>


                {/* Hago la condicion si mi formulario esta verdadero --->  haga esta animacion y muestre el formulario */}
                {
                    loading &&
                    // muestre este body par que cargue cuando tenga contenido
                    <div className="card-body">
                        {/* HAGO UN SPINNER DE BOOTSTRAP v4.1 */}
                        <div
                            // centro todo su contenido
                            className="d-flex justify-content-center my-3">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                }



                {/* Hago la condicion que me muestre el formulario si esta editando */}
                {
                    // MUESTRE EL FORMULARIO CUANDO ESTE EN VERDADERO
                    activarFormulario &&
                    // muestre otro body para editar el nombre ---> es un formulario
                    <div className="card-body">
                        <div
                            // centro todo su contenido
                            className="row justify-content-center">
                            <div
                                // columnas de 5 en pantallas medianas
                                className="col-md-5">
                                <div
                                    // creo un grupo de input 
                                    className="input-group mb-3">
                                    <input
                                        // de tipo texto
                                        type="text"
                                        // clase par que se vea bonito
                                        className="form-control"
                                        aria-label="Recipient's username"
                                        // cuando se presina el input de actualizar usuario
                                        // muestre dentro el valor de nombreUsuario
                                        value={nombreUsuario}
                                        // toma un evento
                                        // guarda en el estado lo que escriba el usuario
                                        onChange={e => setNombreUsuario(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            // clase
                                            className="btn btn-dark"
                                            // boton de tipo boton
                                            type="button"
                                            // funcion que me comprueba si el campo esta vacio
                                            onClick={() => actualizarUsuario()}
                                        >
                                            Actualizar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }






            </div>
        </div>
    )
}

export default Perfil