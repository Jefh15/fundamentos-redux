// importo mi componente
import Pokemones from "./components/Pokemones";

// para poder usar rutas
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// importo mis componentes
import Navbar from "./components/Navbar";
import Login from "./components/Login";


function App() {


  // const store = generateStore()



  return (
    // para usar mis rutas
    <Router>
      <div className="container mt-3">
        {/* creo mi componente Navbar */}
        <Navbar />

        {/* para poder cambiar las rutas */}
        <Switch>
          {/* AQUI VAN LAS RUTAS */}
          {/* exact ---> para pagina principal */}
          <Route
            // component={Pokemones} ---> componente a usar
            component={Pokemones}
            path="/"
            exact />
          <Route component={Login} path="/login" exact />
        </Switch>
      </div >
    </Router>
  );
}

export default App;
