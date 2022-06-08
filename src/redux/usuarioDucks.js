// importo mi archivo de firebase para poder usar los servicios
import { auth, firebase, db, storage } from "../firebase";








// data inicial
const dataInicial = {
    // para deshabilitar botones cuando el usuario este deslogeandose
    loading: false,
    // si el usuario esta activo o no
    activo: false
}



// types
const LOADING = 'LOADING'
const USER_EXITO = 'USER_EXITO'
const USER_ERROR = 'USER_ERROR'
const CERRAR_SESION = 'CERRAR_SESION'




// reducer
// tomamos el estado -> que es nuestro dataInicial
export default function usuarioReducer(state = dataInicial, action) {

    switch (action.type) {
        case LOADING:
            // retornamos nuestro estado, y el loading lo pasamos a true
            return { ...state, loading: true }
        case USER_ERROR:
            // en caso de que existe este usuario error
            // retorno directamente nuestra dataInicial
            // trae loading y activo en false 
            return { ...dataInicial }
        case USER_EXITO:
            // retorna el estado, y ademas el loading en false porque ya termino de pensar, y si el usuario esta activo, la data la pasamos directamente
            return { ...state, loading: false, activo: true, user: action.payload.user }
        case CERRAR_SESION:
            // retorno nuestra data incial
            return { ...dataInicial }
        // accion por defecto
        default:
            // retorna nuestro estado, sin los datos de mi usuario
            return { ...state }
    }

}



// acciones
export const ingresoUsuarioAccion = () => async (dispatch) => {


    // el dispatch se ejecuta independiente si se registro el usuario o 
    dispatch({
        // si enviamos loading
        type: LOADING
    })

    try {
        // solicitud a una base de datos
        // LOGEAMOS EL USUARIO CON GOOGLE

        // para poder usar la autenticacion de firebase
        // auth no lleva () ---> porque ya esta inicializado
        const provider = new firebase.auth.GoogleAuthProvider()
        // nos da la respuesta de nuestro Popup
        // signInWithPopup(provider)--> acceda con nuestra provedor
        const res = await auth.signInWithPopup(provider)

        // muestro la respuesta que tiene un usuario
        console.log(res.user)

        // Ahora voy a extraer las props de res.user ----> toda esa informacion viene de google
        const usuario = {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL
        }


        // usuarioDB --> viene de nuestra coleccion
        // cuando el usuario se logee por primera o segunda ves ---> por si hay cambios de nombre o foto
        // preguntamos, si existe le usuario en db ya guardado
        // .doc(usuario.email) ---> preguntamos por el usuario por su email
        const usuarioDB = await db.collection('usuarios').doc(usuario.email).get()
        console.log(usuarioDB)



        // como nos devuelve falso la propiedad exists --> de mi respuesta de usuarioDB
        if (usuarioDB.exists) {

            // CUANDO EL USUARIO SI EXISTA ---> deberiamos leer de la base de datos
            // y guardarlo el el dispatch y en el localStorage
            // para que nos muestre que el usuario fue exitoso
            dispatch({
                type: USER_EXITO,
                // mi payload es mi usuarioDB ahora --> porque ya esta cargado en mi peticion
                // .data() ---> accede al objeto
                payload: usuarioDB.data()

            })

            // guardamos ese usuario en el localStorage
            // 'usuario' ---> es mi key
            // JSON.stringify({ ----> lo convierto 
            localStorage.setItem('usuario', JSON.stringify(
                // guardo mi usuarioDB.data() ---> que es lo que tiene mi peticion
                // .data() ---> accede al objeto
                usuarioDB.data()
            ))

        } else {

            // CUANDO EL USUARIO NO EXISTA EN FIRESTORE

            // en caso de que el usuario no exista en firestore
            // guardamos ese usaario en la base de datos
            // con su id en especifico ---> .doc(usuario.email)
            // pero colocamos su set() -->  este es un objeto pero como ya lo tenemos construido lo pasamos directamente
            await db.collection('usuarios').doc(usuario.email).set(usuario)

            // para que nos muestre que el usuario fue exitoso
            dispatch({
                type: USER_EXITO,
                // mi payload es mi usuario ahora --> por eso construimos el objeto
                payload: usuario

            })

            // guardamos ese usuario en el localStorage
            // 'usuario' ---> es mi key
            // JSON.stringify({ ----> lo convierto 
            localStorage.setItem('usuario', JSON.stringify(
                // guardo mi usuario ---> que por primera ves lo estamos guardando
                usuario
            ))

        }


    } catch (error) {
        // muestro el error
        console.log(error)
        // cuando falle mostramos el error de usuario
        dispatch({
            // le hacemos un type, que nos ayude a mostrar el error de usuario
            type: USER_ERROR
        })
    }
}



// acciones
export const leerUsuarioActivoAccion = () => async (dispatch) => {

    // recuperamos ese usuario activo
    // si en localStorage existe una llave con la key usuario
    if (localStorage.getItem('usuario')) {
        // haz un dispatch
        dispatch({
            // del type USUARIO_EXITO
            type: USER_EXITO,
            // en el payload viene
            // payload lo parseo, todo lo que venga del localStorage, con eso usamos la misma informacion que tiene el estado
            payload: {
                // regreso mi usuario
                user: JSON.parse(localStorage.getItem('usuario'))
            }
        })
    }

}

// accion
export const cerrarSesionAccion = () => (dispatch) => {
    // el auth tiene un metodo que me cierra session
    auth.signOut()

    // remuevo de mi localStorage la llave 'usuario'
    localStorage.removeItem('usuario')

    // ejecuto mi dispatch 
    dispatch({
        // uso el tipo de cerrar secion para poder usarlo en mi caso
        type: CERRAR_SESION
    })
}


// accion
// como parametro recibo el nombre ---> nombreActualizado
export const actualizarUsuarioAccion = (nombreActualizado) => async (dispatch, getState) => {


    // operacion al consumir una base de datos
    dispatch({
        type: LOADING
    })


    // accedo al estado del usuario, usuario --> viene de store.js en redux
    const { user } = getState().usuario
    // muestro el usuario, tiene todas las propiedades de usuario
    console.log(user)



    try {

        // espero que se actualice en mi firestore y mi localStorage
        // .doc(user.email) ---> esa es mi llave
        await db.collection('usuarios').doc(user.email).update({
            // actualizo mi displayName
            displayName: nombreActualizado
        })


        // creo usuario que es nuestro
        const usuarioEditado = {
            // le paso todo el mismo objeto de user
            ...user,
            // y cambio mi nombre por el actualizado
            displayName: nombreActualizado
        }

        // AQUI ACTUALIZO LA TIENDA --> store.js
        // ejecuto la accion de usuario exito, 
        dispatch({
            // recibe el tipo
            type: USER_EXITO,
            // mi payload es mi usuario construido
            payload: usuarioEditado
        })


        // lo guardo en mi localStorage
        localStorage.setItem('usuario', JSON.stringify(usuarioEditado))


    } catch (error) {
        // muestro mi error si lo hay
        console.log(error)
    }
}



// accion
export const actualizarFotoAccion = (imagenEditada) => async (dispatch, getState) => {


    // como es un async
    dispatch({
        type: LOADING
    })

    // reutilizo mi usuario
    const { user } = getState().usuario




    try {

        // imagen que vamos a referenciar de nuestro back-end
        // storage.ref() ---> donde va a estar guardada nuestra imagen
        // ref().child(user.email) ---> indicar la el nombre de la carpeta que vamos a guardar, en este caso con el email del usuario
        // .child('foto perfil') ---> nombre del archivo
        const refImagen = await storage.ref().child(user.email).child('foto perfil')

        // ahi viene nuestra imagen ---> aqui la guardamos
        await refImagen.put(imagenEditada)

        // para decirle que esto viene de nuestro BACKEND
        // getDownloadURL() --> nos trae la url donde nosotros estamos guardando la imagen
        const urlDescarga = await refImagen.getDownloadURL()


        // actualizamos en la base de datos
        await db.collection('usuarios').doc(user.email).update({
            // actualizamos la foto actualizada
            photoURL: urlDescarga
        })


        // creamos el objeto nuevo
        const usuarioEditado = {
            // toda la informacion no actualizada
            ...user,
            // le pasamos la nueva imagen
            photoURL: urlDescarga
        }


        // 
        dispatch({
            // nuestro tipo
            type: USER_EXITO,
            // le enviamos el nuevo ebjeto
            payload: usuarioEditado
        })

        // actualizamos el localStorage
        localStorage.setItem('usuario', JSON.stringify(usuarioEditado))


    } catch (error) {
        // muestro el error
        console.log(error)
    }

}