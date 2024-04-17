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
        `images`
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
          <div className="flex-1">TODO Description</div>
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
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
    //     <div className="flex flex-col gap-4">
    //       <div className="flex gap-4">
    //         <Image
    //           src="/image-1.jpg"
    //           alt="Image 1"
    //           width={200}
    //           height={200}
    //         />
    //         <Image
    //           src="/image-2.jpg"
    //           alt="Image 2"
    //           width={200}
    //           height={200}
    //         />
    //       </div>
    //       <div className="flex gap-4">
    //         <Image
    //           src="/image-3.jpg"
    //           alt="Image 3"
    //           width={200}
    //           height={200}
    //         />
    //         <Image
    //           src="/image-4.jpg"
    //           alt="Image 4"
    //           width={200}
    //           height={200}
    //         />
    //       </div>
    //     </div>
    //     <div className="flex flex-col gap-4">
    //       <div className="flex gap-4">
    //         <Image
    //           src="/image-5.jpg"
    //           alt="Image 5"
    //           width={200}
    //           height={200}
    //         />
    //         <Image
    //           src="/image-6.jpg"
    //           alt="Image 6"
    //           width={200}
    //           height={200}
    //         />
    //       </div>
    //       <div className="flex gap-4">
    //         <Image
    //           src="/image-7.jpg"
    //           alt="Image 7"
    //           width={200}
    //           height={200}
    //         />
    //         <Image
    //           src="/image-8.jpg"
    //           alt="Image 8"
    //           width={200}
    //           height={200}
    //         />
    //       </div>
    //     </div>
    //   </div>

    //   <div className="flex justify-center mt-8">
    //     <button className="rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
    //       <span className="text-lg font-semibold">Upload</span>
    //     </button>
    //   </div>
    // </main>
  );
}
