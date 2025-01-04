"use client";
import { useEffect, useState } from "react";

export default function MockTestsPage() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    // Fetch mock tests data
    fetch('/api/mock-tests')
      .then(response => response.json())
      .then(data => setTests(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Mock Tests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map(test => (
          <div key={test.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">{test.title}</h3>
            <p className="text-gray-700 mb-4">{test.description}</p>
            <a href={test.link} className="text-primary font-semibold hover:underline">
              Take Test
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}