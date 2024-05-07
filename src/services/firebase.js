git push -u origin main// firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAX_fm0BkGYorqXvA6VpImrYGo-ZeTqmgs",
  authDomain: "auth-form-9fabd.firebaseapp.com",
  projectId: "auth-form-9fabd",
  storageBucket: "auth-form-9fabd.appspot.com",
  messagingSenderId: "936817402314",
  appId: "1:936817402314:web:361611d24d0b7ddfd2af33"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()

export { auth, googleProvider }
