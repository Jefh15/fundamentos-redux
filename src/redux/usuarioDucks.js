import { auth, firebase } from "../firebase";







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
            return { ...dataInicial }
        // accion por defecto
        default:
            // retorna nuestro estado
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

        // para poder usar la autenticacion de firebase
        // auth no lleva () ---> porque ya esta inicializado
        const provider = new firebase.auth.GoogleAuthProvider()
        // nos da la respuesta de nuestro Popup
        // signInWithPopup(provider)--> acceda con nuestra provedor
        const res = await auth.signInWithPopup(provider)
        // muestro la respuesta que tiene un usuario
        // console.log(res)

        // para que nos muestre que el usuario fue exitoso
        dispatch({
            type: USER_EXITO,
            payload: {
                // creo mi payload
                // venga de res.user.uid
                user: {
                    uid: res.user.uid,
                    email: res.user.email
                }
            }
        })

        // guardamos ese usuario en el localStorage
        // 'usuario' ---> es mi key
        // JSON.stringify({ ----> lo convierto 
        localStorage.setItem('usuario', JSON.stringify({
            // que guardo en mi key 
            uid: res.user.uid,
            email: res.user.email
        }))



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