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

import React from "react";
import MarkdownContainer from "@/components/markdown-container";
import useAutoFocus from "@/app/hooks/use-auto-focus";
import { MessageData } from "@/lib/message";

export interface ChatContainerProps {
  messages: MessageData[];
  onMessageSubmit: (userMsg: string) => Promise<void>;
  onMessageDelete: (messageId: string) => Promise<void>;
}

/**
 * Chat container.
 *
 * The `messages` are taking up central space.
 * Using markdown for rendering.
 *
 * On the botton there are up to 4 buttons showing suggested topics.
 * Buttons captions are sourced from a last `suggestedResponses` value.
 *
 * Then there is a text field with a send submit button for user input.
 *
 * After updating the messages list, the screen will auto-scroll to the bottom.
 *
 * Each few lines of code have a comment explaining what they do.
 *
 * Using Tailwind for all styling.
 *
 * @param props.onMessageSubmit Called upon submitting a message prompt.
 * @param props.messages
 */
const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  onMessageSubmit,
  onMessageDelete,
}) => {
  "use client";

  const [userMessage, setUserMessage] = React.useState("");
  const userMessageAutoFocus = useAutoFocus();

  const prevMessagesCountRef = React.useRef(messages.length);

  const endOfChatRef = React.useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (endOfChatRef.current) {
      endOfChatRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  React.useEffect(() => {
    // Do not auto-scroll if removing a message.
    if (prevMessagesCountRef.current <= messages.length) {
      scrollToBottom();
    }
    prevMessagesCountRef.current = messages.length;
  }, [messages]);

  const handleUserMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userMessage.trim() === "") {
      return;
    }
    onMessageSubmit(userMessage);
    setUserMessage("");
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-100 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="flex-1 py-4">
        {messages.map((message, i) => {
          const { prompt, response, createTime, status } = message;
          return (
            <div key={i} className="flex items-end">
              <div className="flex flex-col space-y-2 w-full pb-2">
                <div className="flex group items-end mr-4 px-4 py-2 rounded-lg inline-block bg-gray-200 text-gray-800 rounded-bl-none">
                  <div className="flex-1">
                    {prompt}
                    {message.id && (
                      <button
                        type="button"
                        className="ml-2 font-bold text-xl text-red-600 opacity-60 group-hover:opacity-100"
                        aria-label="Delete message"
                        title="Delete message"
                        onClick={() => onMessageDelete(message.id || "")}
                      >
                        x
                      </button>
                    )}
                  </div>
                  {createTime && (
                    <div className="text-gray-400 text-xs ml-4">
                      {createTime.toDate().toLocaleString()}
                    </div>
                  )}
                </div>

                {!status?.state && (
                  <div className="text-gray-900 text-xs ml-4">Sending...</div>
                )}

                {status?.state === "PROCESSING" && (
                  <div className="ml-4 px-4 py-2 rounded-lg inline-block rounded-br-none text-gray-900 bg-gradient-to-r from-blue-100 to-purple-100 to-gray-100 text-xs ml-4">
                    Generating...
                  </div>
                )}

                {status?.error && (
                  <div className="ml-4 px-4 py-2 rounded-lg inline-block bg-red-200 text-red-800 rounded-br-none">
                    {status.error}
                    {status?.updateTime && (
                      <div className="opacity-40 text-right text-xs mr-4 mt-2">
                        {status?.updateTime.toDate().toLocaleString()}
                      </div>
                    )}
                  </div>
                )}

                {response && (
                  <div className="ml-4 px-4 py-2 rounded-lg inline-block bg-gradient-to-r from-blue-500 to-purple-500 to-gray-400 text-white rounded-br-none">
                    <MarkdownContainer markdown={response} />
                    {status?.updateTime && (
                      <div className="text-gray-300 text-right text-xs mr-4 mt-2">
                        {status?.updateTime.toDate().toLocaleString()}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-gray-200 py-4">
        <form onSubmit={handleUserMessageSubmit}>
          <div className="items-center">
            {messages[messages.length - 1]?.followUpPrompts
              ?.slice(0, 4)
              .map((sugestion) => (
                <button
                  key={sugestion}
                  type="button"
                  className="flex-1 mr-2 mb-2 bg-blue-100 hover:bg-blue-200 text-gray-700 px-4 py-2 rounded-md text-left"
                  onClick={() => onMessageSubmit(sugestion)}
                >
                  {sugestion}
                </button>
              ))}
          </div>
          <div className="flex items-center mt-2">
            <input
              name="user-message"
              className="flex-1 px-4 py-2 rounded-md text-gray-700 rounded-r-none"
              placeholder="Type a message..."
              value={userMessage}
              ref={userMessageAutoFocus}
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md rounded-l-none"
            >
              Send
            </button>
            <div ref={endOfChatRef}></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;
