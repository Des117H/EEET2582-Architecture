import { deleteObject, getDownloadURL as getStorageDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

const BUCKET_URL = "gs://architecture-grandma-bea3b.appspot.com";

export async function uploadDocument(document, uid) {
	// const formatedDate = format(new Date(), "yyyy-MM-dd\\HH:mm:ss");
	const name = document.name;
	const bucket = `${BUCKET_URL}/${uid}/${name}`;
	const storageRef = ref(storage, bucket);
	await uploadBytes(storageRef, document);
	return bucket;
}

// Replaces existing document in storage and returns the storage bucket
export async function replaceDocument(document, bucket) {
	await uploadBytes(ref(storage, bucket), document);
}

// Deletes existing document in storage
export async function deleteDocumentBucket(bucket) {
	await deleteObject(ref(storage, bucket));
}

// Gets the download URL from the reference URL
export async function getDownloadURL(bucket) {
	return await getStorageDownloadURL(ref(storage, bucket));
}