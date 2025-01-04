"use client";
import { useEffect, useState } from "react";

export default function ForumsPage() {
  const [forums, setForums] = useState([]);

  useEffect(() => {
    // Fetch forums data
    fetch('/api/forums')
      .then(response => response.json())
      .then(data => setForums(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Forums</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forums.map(forum => (
          <div key={forum.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">{forum.title}</h3>
            <p className="text-gray-700 mb-4">{forum.description}</p>
            <a href={forum.link} className="text-primary font-semibold hover:underline">
              Join Forum
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}