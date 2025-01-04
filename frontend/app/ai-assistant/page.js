"use client";
import { useEffect, useState } from "react";

export default function AIAssistantPage() {
  const [assistant, setAssistant] = useState(null);

  useEffect(() => {
    // Fetch AI assistant data
    fetch('/api/ai-assistant')
      .then(response => response.json())
      .then(data => setAssistant(data))
      .catch(err => console.error(err));
  }, []);

  if (!assistant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">AI Assistant</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-2">{assistant.name}</h3>
        <p className="text-gray-700 mb-4">{assistant.description}</p>
        {/* Add more AI assistant details as needed */}
      </div>
    </div>
  );
}