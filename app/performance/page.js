"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function PerformancePage() {
  const { data: session, status } = useSession();
  const [performances, setPerformances] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      setError('You must be logged in to view performance data');
      return;
    }

    console.log("Session:", session); // Log the session object to verify its content

    const fetchPerformances = async () => {
      try {
        const response = await fetch(`/api/performance?userId=${session.user._id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPerformances(data);
      } catch (err) {
        console.error('Error fetching performances:', err);
        setError('Failed to load performances');
      }
    };

    fetchPerformances();
  }, [session, status]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Performance</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {performances.map((performance) => (
          <div key={performance._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">{performance.quizId.topic}</h3>
            <p className="text-gray-700 mb-4">Score: {performance.score}</p>
            <p className="text-gray-700 mb-4">Date: {new Date(performance.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}