import { uploadBytes } from "firebase/storage";

const BUCKET_URL = "gs://architecture-grandma-bea3b.appspot.com";

export async function uploadDocument(document, uid, documentName) {
    const formatedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
    const name = document.name;
    const bucket = '${BUCKETURL}/${uid}/${documentName}-${formatedDate}.docx';
    const storageRef = ref(storage, bucket);
    await uploadBytes(storageRef, document);
    return bucket;
}