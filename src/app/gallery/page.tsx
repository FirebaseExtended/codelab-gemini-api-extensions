/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use client";

import { FileInputContainer } from "@/components/file-input-container";
import MarkdownContainer from "@/components/markdown-container";
import { FirebaseUserContext } from "@/lib/firebase-user";
import {
  CollectionReference,
  Timestamp,
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

  const storageRef = useMemo(() => ref(getStorage(), "gallery"), []);

  const user = useContext(FirebaseUserContext);
  const uid = user.currentUser?.uid;

  const uploadImage = useCallback(
    async (file: File) => {
      const newUploadDocRef = doc(imagesCollection);
      const newUploadStorageRef = ref(
        storageRef,
        `${uid}/${newUploadDocRef.id}-${file.name}`
      );

      const uploadTask = uploadBytesResumable(newUploadStorageRef, file);
      uploadTask.on("state_changed", (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      });

      const uploadSnaphsot = await uploadTask;
      console.log("Upload complete", uploadSnaphsot);

      return new Promise<undefined>((resolve) => {
        // Wait for recently file to become available before updating the doc.
        setTimeout(() => {
          setDoc(newUploadDocRef, {
            uid,
            createTime: serverTimestamp(),
            image: newUploadStorageRef.toString(),
            published: true,
          });
          resolve(undefined);
        }, 2000);
      });
    },
    [uid]
  );

  const deleteImage = useCallback(
    async (data: FirestoreImageData) => {
      console.log("delete", data);
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
      console.log("flag", data);
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
          className={`w-full flex justify-start items-center gap-4 my-4 px-4 group ${
            image.published ? "" : "bg-red-900"
          }`}
        >
          {image.image && <img src={image.image} alt="Image" width={200} />}
          <div className="flex-1">
            <MarkdownContainer
              markdown={image.output || ""}
            ></MarkdownContainer>
          </div>
          {image.id && image.uid === uid && (
            <button
              type="button"
              className="ml-2 font-bold text-xl text-red-600 opacity-60 group-hover:opacity-100"
              title="Delete image"
              onClick={() => deleteImage(image)}
            >
              x
            </button>
          )}
          {image.id && image.uid !== uid && (
            <button
              type="button"
              className="ml-2 font-bold text-xl text-red-900 group-hover:text-red-600 opacity-60 hover:opacity-100"
              title="Flag image as inapropriate"
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
