'use server'

import { functions } from "./firebase";
import { httpsCallable } from "firebase/functions";
import { revalidateTag } from 'next/cache'

export const processDocument = httpsCallable(functions, 'processDocument');

export default async function action() {
    revalidateTag('document');
}