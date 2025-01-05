"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ForumsPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/forums');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages');
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (input.trim() && session) {
      try {
        const response = await fetch('/api/forums', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: input, userId: session.user._id }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const newMessage = await response.json();
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInput("");
      } catch (err) {
        console.error('Error sending message:', err);
        setError('Failed to send message');
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Forums</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="bg-white p-6 rounded-lg shadow-md mb-4">
        <div className="h-64 overflow-y-scroll mb-4">
          {messages.map((message) => (
            <div key={message._id} className="mb-2">
              <span className="text-gray-700">{message.text}</span>
              <span className="text-gray-500 text-sm ml-2">
                {new Date(message.createdAt).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 rounded w-full mb-2"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}