"use client";

import ChatContainer, { ChatMessageData } from "@/components/chat-container";
import { use, useContext, useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  CollectionReference,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { FirebaseUserContext } from "../lib/firebase-user-context";

/**
 * A portal page with an ai chat.
 *
 * Using <ChatContainer>` component.
 *
 * Using `messages` (state variable) subscribed to Firestore collection `messages`
 * with `use` hook.
 */
const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessageData[]>([
    {
      response: "Hi, I'm a **large language model**, trained by Google.",
      prompt: "I want to know more about you",
      suggestedUserResponses: [
        "What is your name?",
        "I want to know more about you.",
        "Another longer message goes here and it wraps around.",
        "This is even more text.",
      ],
    },
  ]);

  const user = useContext(FirebaseUserContext);
  const uid = user.currentUser?.uid;

  const messagesCollection = collection(
    getFirestore(),
    `users/${uid}/messages`
  ) as CollectionReference<ChatMessageData>;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(messagesCollection, orderBy("createTime", "asc")),
      {},
      (snapshot) => {
        const messages = snapshot.docs.map((doc) => doc.data());
        console.log(
          "Doc changes: ",
          snapshot
            .docChanges()
            .map((ch) => ({ type: ch.type, doc: ch.doc.data() }))
        );
        setMessages(messages);
      }
    );
    return unsubscribe;
  }, [uid]);

  /** Send a message to the assistant. */
  const sendMessage = async (userMsg: string) => {
    const newMessageRef = await addDoc(messagesCollection, {
      prompt: userMsg,
    });
    console.log("New message added with ID: ", newMessageRef.id);
    // setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <ChatContainer
      messages={messages}
      onMessageSubmit={sendMessage}
    ></ChatContainer>
  );
};

export default ChatPage;
