// para usar los servicios
import firebase from 'firebase/app'
// para la autenticacion
import 'firebase/auth'
// importo firebase/para firestore para imagenes
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyD2V56XyL8uzi8mSxC2Wt77D1NNLNPCbTQ",
    authDomain: "redux-udemy-react.firebaseapp.com",
    projectId: "redux-udemy-react",
    storageBucket: "redux-udemy-react.appspot.com",
    messagingSenderId: "103710591472",
    appId: "1:103710591472:web:79db015f018f1de1f5f535"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// tomo la autenticacion en modo funcion
const auth = firebase.auth()

// tomo el almacenamiento en modo funcion
const db = firebase.firestore()


// exportamos el auth y firebase y db
export { auth, firebase, db }