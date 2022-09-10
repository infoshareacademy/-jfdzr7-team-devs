import { collection } from 'firebase/firestore'
import { db } from './firebase'

export const recipesCollection = collection(db, "recipes");
