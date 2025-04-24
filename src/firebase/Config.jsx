import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALKy7yNI-kX84EQZGKiNNerhu5tY0BUg8",
  authDomain: "miniblog-udemy-5d6d2.firebaseapp.com",
  projectId: "miniblog-udemy-5d6d2",
  storageBucket: "miniblog-udemy-5d6d2.firebasestorage.app",
  messagingSenderId: "573654131243",
  appId: "1:573654131243:web:d6f0bb0ec671dfc94cc06e"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };
