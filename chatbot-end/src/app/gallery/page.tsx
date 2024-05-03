"use client";

import { FileInputContainer } from "@/components/file-input-container";
import { FirebaseUserContext } from "@/lib/firebase-user";
import {
  CollectionReference,
  FieldValue,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  or,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
// import Image from "next/image";

interface FirestoreImageData {
  id?: string;
  uid?: string;
  image?: string;
  output?: string;
  createTime?: Timestamp;
  published?: boolean;
  flagUid?: string;
}

export default function Gallery() {
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState<FirestoreImageData[]>([]);

  const imagesCollection = useMemo(
    () =>
      collection(
        getFirestore(),
        `gallery`
      ) as CollectionReference<FirestoreImageData>,
    []
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        imagesCollection,
        or(where("published", "==", true), where("uid", "==", uid))
      ),
      {},
      async (snapshot) => {
        const images = Promise.all(
          snapshot.docs.map(async (doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              image:
                data.image &&
                (await getDownloadURL(ref(getStorage(), data.image))),
            };
          })
        );
        console.log(
          "Image doc changes: ",
          snapshot
            .docChanges()
            .map((ch) => ({ type: ch.type, id: ch.doc.id, doc: ch.doc.data() }))
        );
        setImages(await images);
      }
    );
    return unsubscribe;
  }, []);

  const storageRef = useMemo(() => ref(getStorage(), "images"), []);

  const user = useContext(FirebaseUserContext);
  const uid = user.currentUser?.uid;

  const uploadImage = useCallback(
    async (file: File) => {
      const newUploadDocRef = doc(imagesCollection);
      const newUploadStorageRef = ref(
        storageRef,
        `${newUploadDocRef.id}/${file.name}`
      );
      await setDoc(newUploadDocRef, {
        uid,
        createTime: serverTimestamp(),
      });

      await uploadBytesResumable(newUploadStorageRef, file).on(
        "state_changed",
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        }
      );

      return new Promise<undefined>((resolve) => {
        // Wait for recently file to become available before updating the doc.
        setTimeout(() => {
          updateDoc(newUploadDocRef, {
            image: newUploadStorageRef.toString(),
            published: true,
          });
          resolve(undefined);
        }, 1000);
      });
    },
    [uid]
  );

  const deleteImage = useCallback(
    async (data: FirestoreImageData) => {
      if (data.image) {
        const storageRef = ref(getStorage(), data.image);
        await deleteObject(storageRef);
      }
      await deleteDoc(doc(imagesCollection, data.id));
    },
    [imagesCollection]
  );

  const flagImage = useCallback(
    async (data: FirestoreImageData) => {
      await updateDoc(doc(imagesCollection, data.id), {
        published: false,
        flagUid: uid,
      });
    },
    [imagesCollection]
  );

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      {images.map((image) => (
        <div
          key={image.id}
          className="w-full flex justify-start items-center gap-4 my-4 px-4 group"
        >
          {image.image && <img src={image.image} alt="Image" width={200} />}
          <div className="flex-1">{image.output}</div>
          {image.id && image.uid === uid && (
            <button
              type="button"
              className="ml-2 font-bold text-xl text-red-900 group-hover:text-red-600 opacity-60 hover:opacity-100"
              aria-label="Delete message"
              title="Delete message"
              onClick={() => deleteImage(image)}
            >
              x
            </button>
          )}
          {image.id && image.uid !== uid && (
            <button
              type="button"
              className="ml-2 font-bold text-xl text-red-900 group-hover:text-red-600 opacity-60 hover:opacity-100"
              aria-label="Delete message"
              title="Delete message"
              onClick={() => flagImage(image)}
            >
              🚩
            </button>
          )}
        </div>
      ))}

      <FileInputContainer onFileUpload={uploadImage} progress={progress} />
    </div>
  );
}
