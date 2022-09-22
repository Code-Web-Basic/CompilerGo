// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInWithRedirect } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBIKRIen4gt5gbNGw7oaKTg0cdCYgjF_CY',
    authDomain: 'compiler-go.firebaseapp.com',
    projectId: 'compiler-go',
    storageBucket: 'compiler-go.appspot.com',
    messagingSenderId: '78654796130',
    appId: '1:78654796130:web:f3fde04b0afea7c47bbc3b',
    measurementId: 'G-QZ252PJ0DB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

export default auth;
