import { collection, doc, orderBy } from "firebase/firestore";
import { db } from "./firebase";

export const collectionRecipesName = "radekTesty";
export const collectionCommentsName = "commentsList";
export const collectionBannerName = "banner";
export const collectionUsers = "users";
export const folderStorage = "/images";
export const collectionRecipes = "recipes"; // nowe MAgda !!!

export const recipesCollectionMain = collection(db, collectionRecipes); // nowe MAgda
export const recipesCollection = collection(db, collectionRecipesName);

export const singleRecipeCollection = (docId) =>
  doc(db, collectionRecipesName, docId);

export const commentsRecipeCollection = (docId) =>
  collection(db, collectionRecipesName, docId, collectionCommentsName);

export const defaultQueryConstraint = orderBy("createdAt", "desc");

export const singleUserCollection = (userId) =>
  doc(db, collectionUsers, userId);

export const bannerCollection = collection(db, collectionBannerName);

export const bannerArrayDocument = (arrayId) =>
  doc(db, collectionBannerName, arrayId);

export const urlStorage =
  "https://firebasestorage.googleapis.com/v0/b/devs-project-edf3a.appspot.com/o/images%2F";
export const urlStorageCD =
  "?alt=media&token=04d9d94b-f79a-434c-804d-7989ede403e1";

export const urlStorageAvatars =
  "https://firebasestorage.googleapis.com/v0/b/devs-project-edf3a.appspot.com/o/avatar%2F";
export const urlStorageAvatarsCD =
  "?alt=media&token=447796ed-bf03-404d-902f-ab81082e8c0d";

export const authErrorsCodes = {
  "auth/invalid-email": "E-mail is invalid",
  "auth/weak-password": "Password should be at least 6 characters",
  "auth/email-already-in-use":
    "Account registered for this e-mail is already in use",
  "auth/user-not-found": "User account does not exist",
  "auth/wrong-password": "Provided wrong password",
  "auth/network-request-failed":
    "Something went wrong... Check you internet connection.",
};

export const firestoreErrorsCodes = {
  cancelled: "The operation was cancelled (typically by the caller).",
  unknown: "Unknown error or an error from a different error domain.",
  "invalid-argument":
    'Client specified an invalid argument. Note that this differs from "failed-precondition" "invalid-argument" indicates arguments that are problematic regardless of the state of the system (e.g. an invalid field name).',
  "deadline-exceeded":
    "Deadline expired before operation could complete. For operations that change the state of the system, this error may be returned even if the operation has completed successfully. For example, a successful response from a server could have been delayed long enough for the deadline to expire. ",
  "not-found": "Some requested document was not found.",
  "already-exists": "Some document that we attempted to create already exists.",
  "permission-denied":
    "The caller does not have permission to execute the specified operation.",
  "resource-exhausted":
    "Some resource has been exhausted, perhaps a per-user quota, or perhaps the entire file system is out of space.",
  "failed-precondition":
    "Operation was rejected because the system is not in a state required for the operation's execution.",
  aborted:
    "The operation was aborted, typically due to a concurrency issue like transaction aborts, etc.",
  "out-of-range": "Operation was attempted past the valid range.",
  unimplemented: "Operation is not implemented or not supported/enabled.",
  internal:
    "Internal errors. Means some invariants expected by underlying system has been broken. If you see one of these errors, something is very broken.",
  unavailable:
    "The service is currently unavailable. This is most likely a transient condition and may be corrected by retrying with a backoff.",
  "data-loss": "Unrecoverable data loss or corruption.",
  unauthenticated:
    "The request does not have valid authentication credentials for the operation.",
};

export const storageErrorsCodes = {
  "storage/unknown": "An unknown error occurred.",
  "storage/object-not-found": "No object exists at the desired reference.",
  "storage/bucket-not-found": "No bucket is configured for Cloud Storage",
  "storage/project-not-found": "No project is configured for Cloud Storage",
  "storage/quota-exceeded":
    "Quota on your Cloud Storage bucket has been exceeded. If you're on the no-cost tier, upgrade to a paid plan. If you're on a paid plan, reach out to Firebase support.",
  "storage/unauthenticated":
    "User is unauthenticated, please authenticate and try again.",
  "storage/unauthorized":
    "User is not authorized to perform the desired action, check your security rules to ensure they are correct.",
  "storage/retry-limit-exceeded":
    "The maximum time limit on an operation (upload, download, delete, etc.) has been excceded. Try uploading again.",
  "storage/invalid-checksum":
    "File on the client does not match the checksum of the file received by the server. Try uploading again.",
  "storage/canceled": "User canceled the operation.",
  "storage/invalid-event-name":
    "Invalid event name provided. Must be one of [`running`, `progress`, `pause`]",
  "storage/invalid-url":
    "Invalid URL provided to refFromURL(). Must be of the form: gs://bucket/object or https://firebasestorage.googleapis.com/v0/b/bucket/o/object?token=<TOKEN>",
  "storage/invalid-argument":
    "The argument passed to put() must be `File`, `Blob`, or `UInt8` Array. The argument passed to putString() must be a raw, `Base64`, or `Base64URL` string.",
  "storage/no-default-bucket":
    "No bucket has been set in your config's storageBucket property.",
  "storage/cannot-slice-blob":
    "Commonly occurs when the local file has changed (deleted, saved again, etc.). Try uploading again after verifying that the file hasn't changed.",
  "storage/server-file-wrong-size":
    "File on the client does not match the size of the file recieved by the server. Try uploading again.",
};

export const tags = ["Breakfast", "Mains", "Snacks", "Desserts"];
export const specialDiets = ["Dairy-free", "Vegetarian", "Gluten-free"];
