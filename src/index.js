import React from "react";
import ReactDOM from "react-dom";
import "./index.module.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyC56_U8Gh6clNYOenHyI1ngA2rrARQf-Pk",
  authDomain: "personal-account-3a595.firebaseapp.com",
  databaseURL: "https://personal-account-3a595.firebaseio.com",
  projectId: "personal-account-3a595",
  storageBucket: "personal-account-3a595.appspot.com",
  messagingSenderId: "677682895617",
  appId: "1:677682895617:web:8616549d7f9e2105aa9900",
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

serviceWorker.unregister();
