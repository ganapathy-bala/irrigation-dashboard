import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCiy7_i5-DsnDxwE2oTdaFH6ahjVW1UhSY",
  authDomain: "irrigation-dashboard-ff361.firebaseapp.com",
  projectId: "irrigation-dashboard-ff361",
  storageBucket: "irrigation-dashboard-ff361.firebasestorage.app",
  messagingSenderId: "933176357908",
  appId: "1:933176357908:web:460fdd620fba8c0cb8e301"
};
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);