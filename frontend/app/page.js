"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [message, setMesssage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const server = String(process.env.NEXT_SERVER_URL);

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      router.push("/landing");
    }
  }, [router]);

  useEffect(() => {
    if (isLoggedIn && !message) {
      fetch(server)
        .then((response) => response.json())
        .then((data) => {
          setMesssage(data.message);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [isLoggedIn, message, server]);

  if (!isLoggedIn) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <div className="p-6 flex-1">
        <p className="text-xl mb-8">Message from server: {message}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard title="Profile" description="View and edit your profile" link="/profile" />
          <DashboardCard title="Resources" description="Access learning resources" link="/resources" />
          <DashboardCard title="Performance" description="Track your performance" link="/performance" />
          <DashboardCard title="Mock Tests" description="Take mock tests" link="/mock-tests" />
          <DashboardCard title="Forums" description="Participate in forums" link="/forums" />
          <DashboardCard title="AI Assistant" description="Get help from AI Assistant" link="/ai-assistant" />
          {/* Add more cards as needed */}
        </div>
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div className="bg-primary text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">My Dashboard</h1>
      <div className="flex items-center">
        <img src="/path/to/avatar.jpg" alt="User Avatar" className="w-10 h-10 rounded-full mr-4" />
        <a href="/profile" className="text-white font-semibold hover:underline">
          Profile
        </a>
      </div>
    </div>
  );
}

function DashboardCard({ title, description, link }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 duration-300">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <a href={link} className="text-primary font-semibold hover:underline">
        Go to {title}
      </a>
    </div>
  );
}