import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, getDocs, query } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCj3WWbF3RnhWgITzpP2i9mtgMiJIeSmzE",
  authDomain: "crwn-clothing-db-80fc1.firebaseapp.com",
  projectId: "crwn-clothing-db-80fc1",
  storageBucket: "crwn-clothing-db-80fc1.appspot.com",
  messagingSenderId: "89055370135",
  appId: "1:89055370135:web:845dcbf2d0d4d1ddf8c2d2"
};

const fireBaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd)=>{
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object)
  });

  await batch.commit();
  console.log('done');
}

export const getCategoriesAndDocuments = async ()=>{
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef)
  
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
    },{}); 

    return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation)=>{
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    }
    catch(error){
      console.log("error", error.message)
    }
    return userDocRef;
  }
}

export const createAuthUserWithEmailAndPassword = async (email, password)=>{
  if(!email || !password) return; 
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthWithEmailAndPassword = async(email, password)=>{
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser =()=> signOut(auth)

export const onAuthStateChangedListener = (callback)=>{
  onAuthStateChanged(auth, callback)
}