import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCZIHhpdQ0IhuE1GVclQHDW51-ymAK4VpI",
  authDomain: "clone-netflix-f7e88.firebaseapp.com",
  projectId: "clone-netflix-f7e88",
  storageBucket: "clone-netflix-f7e88.appspot.com",
  messagingSenderId: "768014566589",
  appId: "1:768014566589:web:0eeb6cb9fff4d655c1e3d4",
  measurementId: "G-BX9H8G1W7P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 

export {db};
