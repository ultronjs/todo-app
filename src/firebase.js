import Firebase from "firebase";

const firebaseApp = Firebase.initializeApp({
        apiKey: /*enter your key please*/,
        authDomain: "todo-app-34d10.firebaseapp.com",
        projectId: "todo-app-34d10",
        storageBucket: "todo-app-34d10.appspot.com",
        messagingSenderId: "160428787236",
        appId: "1:160428787236:web:d55a4790b3ec0afbb47ab1",
        measurementId: "G-CKFVX32R2J"

});

const db = firebaseApp.firestore();
export default  db ;