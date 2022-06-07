import React from 'react'


// aqui llamamos para acceder a la tienda y obtener los metodos y acciones
import { useSelector, useDispatch } from 'react-redux'
// import { actualizarDisplayNameAccion } from '../redux/usuarioDucks'





const Perfil = () => {



    // para poder usar mis acciones(metodos)
    const dispatch = useDispatch()


    // para poder obtener de mi tienda mi usuario con propiedad de user
    const usuario = useSelector(store => store.usuario.user)
    // aqui obtenemos todo el objeto del usuario
    // console.log(usuario)
    // para poder obtener de mi tienda mi usuario si estoy en pantalla de carga
    const loading = useSelector(store => store.usuario.loading)
    // aqui obtenemos todo el objeto del usuario
    // console.log(loading)




    // hago un Estado para poder miestrar el nombre
    // por defecto traiga el nombre que tiene del usuario
    const [displayName, setDisplayName] = React.useState(usuario.displayName)
    // hago un Estado para poder visualizar el formulario --->
    const [activarFormulario, setActivarFormulario] = React.useState(false)



    // creo mi metodo para poder saber si mi campo esta vacio
    const botonACtualizarUsuario = () => {
        if (!displayName.trim()) {
            // muestro el error en consola
            // FATLA HACER EL ERROR EN UN DIV que muestre
            console.log('nombre vacío')
            // saga de la funcion
            return
        }
        // dispatch(actualizarDisplayNameAccion(displayName))
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
                </div>


                {/* Hago la condicion si mi formulario esta en cargando--->  si esta cargando */}
                {
                    loading &&
                    // muestre este body par que cargue cuando tenga contenido
                    <div className="card-body">
                        <div
                            // centro todo su contenido
                            className="d-flex justify-content-center my-2">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                }



                {/* Hago la condicion que me muestre el formulario si esta editando */}
                {
                    // MUESTRE EL FORMULARIO CUANDO ESTE EN VERDADERO
                    setActivarFormulario &&
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
                                        // muestre dentro el valor de displayName
                                        value={displayName}
                                        // toma un evento
                                        // guarda en el estado lo que escriba el usuario
                                        onChange={e => setDisplayName(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            // clase
                                            className="btn btn-dark"
                                            // boton de tipo boton
                                            type="button"
                                            // funcion que me comprueba si el campo esta vacio
                                            onClick={() => botonACtualizarUsuario()}
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