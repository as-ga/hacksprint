"use client";
import { useEffect, useState } from "react";

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // Fetch resources data
    fetch('/api/resources')
      .then(response => response.json())
      .then(data => setResources(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map(resource => (
          <div key={resource.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">{resource.title}</h3>
            <p className="text-gray-700 mb-4">{resource.description}</p>
            <a href={resource.link} className="text-primary font-semibold hover:underline">
              Access Resource
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}