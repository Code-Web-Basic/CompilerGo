// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCLcP4fYfCGmK26J-XQYBXU4QOoW-IIiag',
    authDomain: 'compiler-login-app.firebaseapp.com',
    projectId: 'compiler-login-app',
    storageBucket: 'compiler-login-app.appspot.com',
    messagingSenderId: '753706079792',
    appId: '1:753706079792:web:2efdaae984ae766ab4fff5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
