import firebase from 'firebase/app'
import 'firebase/firestore'

export const firebaseConfig = firebase
    .initializeApp({
        apiKey: "AIzaSyBRevbyRCw0lZcncxbGtAFDCEz0dxT5haQ",
        authDomain: "tibusystem-prueba.firebaseapp.com",
        projectId: "tibusystem-prueba",
        storageBucket: "tibusystem-prueba.appspot.com",
        messagingSenderId: "713683119616",
        appId: "1:713683119616:web:7183ee998132b3168632e5" });