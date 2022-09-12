import { collection, doc } from 'firebase/firestore'
import { db } from './firebase'

export const recipesCollection = collection(db, "recipes");

export const getSingleCollection = docId => doc(db, "recipes", docId);
