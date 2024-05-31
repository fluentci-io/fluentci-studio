import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebase = {
  apiKey: "AIzaSyDppXXSi_IXoCl8f2i2frbV3FSXTfFJ1Y8",
  authDomain: "app.fluentci.io",
  projectId: "fluentci-2e5f3",
  storageBucket: "fluentci-2e5f3.appspot.com",
  messagingSenderId: "119904170524",
  appId: "1:119904170524:web:e14f49598f7b422977a5d9",
  measurementId: "G-VGDL6KM7PT",
};

// Initialize Firebase
const app = initializeApp(firebase);

export const auth = getAuth(app);

// auth.onAuthStateChanged(async (user) => await user?.getIdToken());

export default app;
