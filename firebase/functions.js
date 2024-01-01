import { functions } from "./firebase";
import { httpsCallable } from "firebase/functions";

export const processDocument = httpsCallable(functions, 'processDocument');