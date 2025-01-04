"use client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch profile data
    fetch('/api/profile')
      .then(response => response.json())
      .then(data => setProfile(data))
      .catch(err => console.error(err));
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Profile</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-2">{profile.name}</h3>
        <p className="text-gray-700 mb-4">Email: {profile.email}</p>
        <p className="text-gray-700 mb-4">Bio: {profile.bio}</p>
        {/* Add more profile details as needed */}
      </div>
    </div>
  );
}