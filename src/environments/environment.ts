// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

import { initializeApp } from "firebase/app";
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyA7kYK6hum31vn_G4rBXdu0F3JLMkX15ko",
  authDomain: "projeto-senac-3ano.firebaseapp.com",
  databaseURL: "https://projeto-senac-3ano-default-rtdb.firebaseio.com",
  projectId: "projeto-senac-3ano",
  storageBucket: "projeto-senac-3ano.firebasestorage.app",
  messagingSenderId: "78363783716",
  appId: "1:78363783716:web:1ae468348e479e095cdeb1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);