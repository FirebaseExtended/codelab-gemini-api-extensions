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

import { useContext, useEffect, useMemo, useState } from "react";
import {
  getFirestore,
  collection,
  CollectionReference,
  query,
  orderBy,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import ChatContainer from "@/components/chat-container";
import { FirebaseUserContext } from "@/lib/firebase-user";
import { preparePrompt } from "@/lib/prepare-prompt";
import {
  FirestoreMessageData,
  MessageData,
  prepareMessage,
} from "@/lib/message";

/**
 * A portal page with an ai chat.
 *
 * Using <ChatContainer>` component.
 *
 * Using `messages` (state variable) subscribed to Firestore collection `messages`
 * with `use` hook.
 */
const ChatPage = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);

  const user = useContext(FirebaseUserContext);
  const uid = user.currentUser?.uid;

  const messagesCollection = useMemo(
    () =>
      collection(
        getFirestore(),
        `users/${uid}/messages`
      ) as CollectionReference<FirestoreMessageData>,
    [uid]
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(messagesCollection, orderBy("createTime", "asc")),
      {},
      (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          // TODO: 2. Replace code next line with this:
          // ...prepareMessage(doc.data()),
          ...doc.data(),
        }));
        console.log(
          "Message doc changes: ",
          snapshot
            .docChanges()
            .map((ch) => ({ type: ch.type, id: ch.doc.id, doc: ch.doc.data() }))
        );
        setMessages(messages);
      }
    );
    return unsubscribe;
  }, [uid]);

  const sendMessage = async (userMsg: string) => {
    // Display the user message immediately.
    setMessages((prev) => [...prev, { prompt: userMsg }]);
    // Send a message to Gemini Extension.
    const newMessageRef = await addDoc(messagesCollection, {
      // TODO: 1. Replace code next line with this:
      // prompt: preparePrompt(userMsg, messages),
      prompt: userMsg,
    });
    console.log("New message added with ID: ", newMessageRef.id);
  };

  /** Delete a message pair. */
  const deleteMessage = async (messageId: string) => {
    await deleteDoc(doc(messagesCollection, messageId));
  };

  return (
    <ChatContainer
      messages={messages}
      onMessageSubmit={sendMessage}
      onMessageDelete={deleteMessage}
    ></ChatContainer>
  );
};

export default ChatPage;
