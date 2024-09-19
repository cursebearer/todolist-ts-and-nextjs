import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "todolist-892a3.firebaseapp.com",
    projectId: "todolist-892a3",
    storageBucket: "todolist-892a3.appspot.com",
    messagingSenderId: "1057290557209",
    appId: process.env.APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };