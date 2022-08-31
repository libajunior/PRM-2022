import dotenv from 'dotenv';
import { initializeApp, FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

//Carregar variaveis de ambiente
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Atutenticação
const signInAdmin = (email: string, password: string) => (signInWithEmailAndPassword(getAuth(), email, password));

export {FirebaseError, signInAdmin}