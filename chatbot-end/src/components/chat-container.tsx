import React from "react";
import MarkdownContainer from "./markdown-container";

export interface ChatMessageData {
  prompt: string;
  response?: string;
  suggestedUserResponses?: string[];
}

export interface ChatContainerProps {
  messages: ChatMessageData[];
  onMessageSubmit: (userMsg: string) => Promise<void>;
}

/**
 * Chat container.
 *
 * The `messages` are taking up central space.
 * Using markdown for rendering.
 *
 * On the botton there are up to 4 buttons showing suggested topics.
 * Buttons captions are sourced from a last `suggestedUserResponses` value.
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
}) => {
  "use client";

  const [userMessage, setUserMessage] = React.useState("");
  const messageListRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  React.useEffect(() => {
    scrollToBottom();
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
      <div className="flex-1 overflow-y-auto py-4" ref={messageListRef}>
        {messages.map(({ prompt, response: responseMarkdown }, i) => {
          return (
            <div key={i} className="flex items-end">
              <div className="flex flex-col space-y-2 w-full pb-2">
                <div className="mr-4 px-4 py-2 rounded-lg inline-block bg-gray-200 text-gray-800 rounded-bl-none">
                  {prompt}
                </div>
                {responseMarkdown && (
                  <div className="ml-4 px-4 py-2 rounded-lg inline-block bg-gradient-to-r from-blue-500 to-purple-500 to-gray-400 text-white rounded-br-none">
                    <MarkdownContainer markdown={responseMarkdown} />
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
            {messages[messages.length - 1]?.suggestedUserResponses
              ?.slice(0, 4)
              .map((s) => (
                <button
                  key={s}
                  type="button"
                  className="flex-1 mr-2 mb-2 bg-blue-100 hover:bg-blue-200 text-gray-700 px-4 py-2 rounded-md"
                  onClick={() => onMessageSubmit(s)}
                >
                  {s}
                </button>
              ))}
          </div>
          <div className="flex items-center mt-2">
            <input
              name="user-message"
              className="flex-1 px-4 py-2 rounded-md text-gray-700 rounded-r-none"
              placeholder="Type a message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md rounded-l-none"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;
