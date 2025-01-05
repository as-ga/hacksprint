"use client";
import { useEffect, useState } from "react";

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('/api/resources');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResources(data);
      } catch (err) {
        console.error('Error fetching resources:', err);
        setError('Failed to load resources');
      }
    };

    fetchResources();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Resources</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div key={resource._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">{resource.name}</h3>
            <p className="text-gray-700 mb-4">{resource.description}</p>
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Resource
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}