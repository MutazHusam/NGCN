import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAbbSPzIJ-V4Nnvk1ppNqac-Sp6qwKSYlY",
  authDomain: "discord-clone-97dd4.firebaseapp.com",
  projectId: "discord-clone-97dd4",
  storageBucket: "discord-clone-97dd4.appspot.com",
  messagingSenderId: "178439007415",
  appId: "1:178439007415:web:692cbf91a3981427807132",
  measurementId: "G-PFR07243C7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
