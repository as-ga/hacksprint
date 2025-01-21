"use client";
import { useSession, signOut } from "next-auth/react";

export default function ProfilePage() {
  const session = useSession();

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Profile</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-2">
          Name:{session?.data?.user?.name}
        </h3>
        <p className="text-gray-700 mb-4">
          Email: {session?.data?.user?.email}
        </p>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
