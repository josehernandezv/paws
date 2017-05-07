import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyDRkRRrTF8tMnwNv4czqmYwEwWY2xiU2Cc",
    authDomain: "paws-e3326.firebaseapp.com",
    databaseURL: "https://paws-e3326.firebaseio.com",
    projectId: "paws-e3326",
    storageBucket: "paws-e3326.appspot.com",
    messagingSenderId: "804759165602"
  };
  firebase.initializeApp(config);

module.exports = firebase;

