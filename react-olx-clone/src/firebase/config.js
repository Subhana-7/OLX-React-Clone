import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCvzbI1dfIa2p-I_oLhZnicFGYDvoarci4",
  authDomain: "olx-clone-67cd5.firebaseapp.com",
  projectId: "olx-clone-67cd5",
  storageBucket: "olx-clone-67cd5.firebasestorage.app",
  messagingSenderId: "365274989468",
  appId: "1:365274989468:web:816357d3bc39385d607e59"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db};

export default app;