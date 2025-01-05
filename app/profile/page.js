"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      setError('You must be logged in to view profile data');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile', {
          headers: {
            'Authorization': `Bearer ${session.accessToken}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProfile(data.user);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
      }
    };

    fetchProfile();
  }, [session, status]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-2">{profile.name}</h3>
        <p className="text-gray-700 mb-4">Email: {profile.email}</p>
        {/* Add more profile details as needed */}
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
}