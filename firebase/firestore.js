import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, where } from 'firebase/firestore';
import { db } from './firebase';
import { getDownloadURL } from './storage';

// Name of document collection in Firestore
const DOCUMENT_COLLECTION = 'documents';

/* 
 Adds document to Firestore with given document information:
 - date: date of uploaded
 - documentBucket: bucket at which document document is stored in Firebase Storage
 - uid: user ID who the expense is for
*/
export function addDocument(uid, date, documentBucket) {
	addDoc(collection(db, DOCUMENT_COLLECTION), { uid, date, documentBucket });
}

/* 
 Each document contains:
 - date: document date
 - id: document ID of document
 - documentURL: download URL of document document
 - documentBucket: Firebase Storage bucket of document document
 - uid: user id of which the document is for
 */
export async function getDocumentsMvp(uid) {
	const documents = query(collection(db, DOCUMENT_COLLECTION), where("uid", "==", uid), orderBy("date", "desc"));
	console.log(documents);
	return await processDocuments(documents);
}

export async function getDocumentsOcr(uid, isConfirmed) {
	let documents;
	if (isConfirmed) {
		// When getting documents that are confirmed, need to also get documents where there is no "isConfirmed" field
		documents = query(collection(db, DOCUMENT_COLLECTION), where("uid", "==", uid), orderBy("date", "desc"));

		// Filter out the documents where isConfirmed is false (hence leaving the ones without the isConfirmed field or isConfirmed as true)
		const snapshot = await getDocs(documents);

		let allDocuments = [];
		for (const documentSnapshot of snapshot.docs) {
			const document = documentSnapshot.data();
			console.log(document);
			allDocuments.push({
				...document,
				date: new Date(document['date']).toDateString(),
				id: documentSnapshot.id,
				documentUrl: await getDownloadURL(document['documentBucket']),
				documentBucket: document['documentBucket'],
			});
		}
		return allDocuments;
	} else {
		// When getting documents that aren't confirmed, can just get documents where isConfirmed is false
		documents = query(collection(db, DOCUMENT_COLLECTION), where("uid", "==", uid), orderBy("date", "desc"));
	}

	return processDocuments(documents);
}

async function processDocuments(documents) {
	const snapshot = await getDocs(documents);

	let allDocuments = [];
	for (const documentSnapshot of snapshot.docs) {
		const document = documentSnapshot.data();
		allDocuments.push({
			...document,
			date: new Date(document['date']).toDateString(),
			id: documentSnapshot.id,
			documentUrl: await getDownloadURL(document['documentBucket']),
			documentBucket: document['documentBucket'],
		});
	}
	return allDocuments;
}

// Updates document with @docId with given information.
export function updateDocument(docId, uid, date, documentBucket) {
	setDoc(doc(db, DOCUMENT_COLLECTION, docId), { uid, date, documentBucket });
}

// Deletes document with given @id.
export function deleteDocumentFirestore(id) {
	deleteDoc(doc(db, DOCUMENT_COLLECTION, id));
}