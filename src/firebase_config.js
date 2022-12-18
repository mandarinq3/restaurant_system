import { initializeApp } from "firebase/app";
import {initializeFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB9FgtDi7jk210FOUrawOb6lUPbH58B16Q",
  authDomain: "restaurant-system-9fac6.firebaseapp.com",
  projectId: "restaurant-system-9fac6",
  storageBucket: "restaurant-system-9fac6.appspot.com",
  messagingSenderId: "428097162553",
  appId: "1:428097162553:web:fdee8af0ac3a1430a3ace8"
};

export const app = initializeApp(firebaseConfig);
export const db =  initializeFirestore(app,{experimentalForceLongPolling:true});
