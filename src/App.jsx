// importo mi componente
import Pokemones from "./components/Pokemones";

// para poder usar rutas
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // si el usuario no existe usamos el redirect
  Redirect
} from "react-router-dom";
// importo mis componentes
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Perfil from "./components/Perfil";


// Recuerde hacer la importación de firebase
import { auth } from './firebase'
import { useEffect, useState } from "react";

function App() {


  // const store = generateStore()



  const [firebaseUser, setFirebaseUser] = useState(false)


  // cada vez que se inicie o refresque la pagina
  useEffect(() => {

    // me creo una funcion para poder manejar mejor el useEffect
    // esto para cuando se hagan peticions a la api
    // ESTA PETICION VIENE DIRECTAMENTE DEL BACKEND --> DE FIREBASE
    const fetchUser = () => {

      // lee la informacion del usuario
      // user ---> se guarda en mi estado firebaseUser
      auth.onAuthStateChanged(user => {
        // muestra al usuario
        // console.log(user)
        // si el usuario existe
        if (user) {
          // agrego al state el usuario
          setFirebaseUser(user)
        } else {
          // si no el usuario no existe, ponga el usuario en null
          setFirebaseUser(null)
        }
      })
    }

    // llamo la funcion
    fetchUser()


  }, [])



  // para darle seguridad a mis rutas PRIVADAS
  //  me creo esta funcion
  const RutaPrivada = ({ component, path, ...rest }) => {

    // si existe efectivamente el usuario en el usuario en el localStorage
    if (localStorage.getItem('usuario')) {

      // si el usuario tiene uid
      const usuarioStorage = JSON.parse(localStorage.getItem('usuario'))

      // si el usuario que sabemos que tiene un uid --> es igual al usuario que viene de la base de datos
      if (usuarioStorage.uid === firebaseUser.uid) {

        // creo el componente en caso de que sean componente
        return (<Route
          component={component}
          path={path}
          {...rest} />)
      } else {
        // EN CASO DE QUE NO COINCIDAN ESOS UID de localStorage y Firebase de mi backend
        // LO REDIRIGIMOS AL LOGIN
        return (<Redirect
          // lo enviamos al login
          to="/login"
          // le pasamos el resto de cosas
          {...rest}
        />)
      }

    } else {
      // si el usuario no existe

      return (<Redirect
        // lo enviamos al login
        to="/login"
        // le pasamos el resto de cosas
        {...rest}
      />)
    }

  }




  // si mi firebaseUser es distinto a falso osea hay un usuario, pinte todo eso
  return firebaseUser !== false ? (
    // para usar mis rutas
    <Router>
      <div className="container mt-3">
        {/* creo mi componente Navbar */}
        <Navbar />

        {/* para poder cambiar las rutas */}
        <Switch>
          {/* AQUI VAN LAS RUTAS */}
          {/* exact ---> para pagina principal */}

          {/* ESTA ES UN RUTA PRIVADA */}
          <RutaPrivada
            // component={Pokemones} ---> componente a usar
            component={Pokemones}
            path="/"
            exact />

          {/* ESTA ES UN RUTA PRIVADA */}
          <RutaPrivada
            // component={Pokemones} ---> componente a usar
            component={Perfil}
            path="/perfil"
            exact />

          {/* UNA RUTA NORMAL */}
          <Route component={Login} path="/login" exact />
        </Switch>
      </div >
    </Router>
  ) : (
    // pero si es falso y mientras se ejecuta la accion, no se deberia pintar nada en el sitio web
    <div>Cargando...</div>
  )
}

export default App;
