import { storage } from "../firebaseConfig";

export async function uploadImage(file) {
  const ref = storage.ref(`images/${file.name}`);
  await ref.put(file);
  return ref.getDownloadURL();
}