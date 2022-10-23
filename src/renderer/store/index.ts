import { initializeApp } from "firebase/app";
import { config } from "./firebaseConfig.secret"
export const store = initializeApp(config);