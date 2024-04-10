"use client";

import { useContext, useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  CollectionReference,
  addDoc,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import ChatContainer, {
  ChatMessageData,
  ResponseData,
} from "@/components/chat-container";
import { FirebaseUserContext } from "@/lib/firebase-user";

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
      followUpQuestions: [
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
        const messages = snapshot.docs.map((doc) => {
          const data = doc.data();
          if (data.response) {
            try {
              const parseResponse = JSON.parse(data.response) as ResponseData;
              // Prepare view model for the generated response.
              data.response = parseResponse.text;
              data.followUpQuestions = parseResponse.followUpQuestions;
            } catch (e) {
              // The response is not a valid JSON, just display it as text.
            }
          }
          return {
            id: doc.id,
            ...data,
          };
        });
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

  /** Send a message to Gemini Extension. */
  const sendMessage = async (userMsg: string) => {
    const data: ChatMessageData = {
      prompt: userMsg,
    };
    setMessages((prev) => [...prev, data]);
    const newMessageRef = await addDoc(messagesCollection, data);
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
