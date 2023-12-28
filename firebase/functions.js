import { functions } from "./firebase";
import { httpsCallable } from "firebase/functions";
// import HTMLtoDOCX from '../dist/html-to-docx.esm';

export const processDocument = httpsCallable(functions, 'processDocument');

export const html2Document = () => {

}