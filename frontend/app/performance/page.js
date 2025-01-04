"use client";
import { useEffect, useState } from "react";

export default function PerformancePage() {
  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    // Fetch performance data
    fetch('/api/performance')
      .then(response => response.json())
      .then(data => setPerformance(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {performance.map(record => (
          <div key={record.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">{record.subject}</h3>
            <p className="text-gray-700 mb-4">Score: {record.score}</p>
            <p className="text-gray-700 mb-4">Date: {record.date}</p>
            {/* Add more performance details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}