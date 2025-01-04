"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Markdown from "react-markdown";

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const loadingMessages = [
    "Thinking...",
    "Please wait...",
    "Fetching information...",
    "Processing your request...",
  ];

  const errorMessages = [
    "An error occurred. Please try again.",
    "Something went wrong. Let's retry!",
    "Error! Please try again.",
    "Oops! Let's give it another shot.",
  ];

  const getRandomMessage = (messagesArray) => {
    return messagesArray[Math.floor(Math.random() * messagesArray.length)];
  };

  // Load messages from sessionStorage when the component mounts
  useEffect(() => {
    const storedMessages = sessionStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Save messages to sessionStorage whenever they are updated
  useEffect(() => {
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    try {
      setIsTyping(true);
      setError(null);
      if (input.trim() === "") return;
      const MessageInput = input.trim();
      setInput("");
      const newMessages = [...messages, { sender: "user", text: MessageInput }];
      setMessages(newMessages);

      const response = await axios.post("/api/chat", {
        message: MessageInput,
        conversation: newMessages, // Include the entire conversation history
      });

      if (response.data.success) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "LearnXcel Assistant", text: response.data.dummyMessage },
        ]);
      } else {
        setError(
          response.data.message ||
            getRandomMessage(errorMessages)
        );
      }
    } catch (error) {
      setError(getRandomMessage(errorMessages));
    } finally {
      setInput("");
      setIsTyping(false);
      scrollToBottom(); // Ensure scroll to bottom after setting isTyping to false
    }
  };

  const clearChatHistory = () => {
    setMessages([]);
    sessionStorage.removeItem("chatMessages");
    scrollToBottom(); // Ensure scroll to bottom after clearing chat history
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-md p-6 flex flex-col space-y-4 h-full">
        <div className="header flex justify-between items-center mb-4 sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-semibold text-center text-primary">
            LearnXcel Assistant
          </h2>
          <button
            onClick={clearChatHistory}
            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-700 text-sm"
          >
            Clear Chat History
          </button>
        </div>
        <div className="chat-messages flex flex-col space-y-4 overflow-y-auto flex-grow">
          {error && (
            <div className="bg-red-500 text-white p-2 rounded-lg">{error}</div>
          )}
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col">
              <div
                className={`p-2 rounded-lg text-justify break-words ${
                  msg.sender === "user"
                    ? "bg-primary text-white self-end ml-10"
                    : "bg-secondary text-black self-start mr-10"
                }`}
              >
                <Markdown>{msg.text}</Markdown>
              </div>
              <span
                className={`text-xs mt-1 ${
                  msg.sender === "user"
                    ? "text-right text-primary"
                    : "text-left text-secondary"
                }`}
              >
                {msg.sender === "user" ? "You" : "LearnXcel Assistant"}
              </span>
              {isTyping && index === messages.length - 1 && (
                <div className="p-1 rounded-lg bg-secondary text-black self-start">
                  {getRandomMessage(loadingMessages)}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex space-x-2 items-center">
          <input
            type="text"
            autoFocus
            readOnly={isTyping}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text placeholder-gray-400"
            placeholder="Type your message..."
          />
          <button
            disabled={isTyping}
            onClick={sendMessage}
            className="p-2.5 min-w-20 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            {isTyping ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}