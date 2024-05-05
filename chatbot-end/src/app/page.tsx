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
          ...prepareMessage(doc.data()),
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
      prompt: preparePrompt(userMsg, messages),
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
