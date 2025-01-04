"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState();
  const server = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    if (!message) {
      fetch(server)
        .then((res) => res.json())
        .then((data) => setMessage(data.message));
    }
  }, []);
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">
        LearnXcel : The Smart Learning Ecosystem App
      </h1>
      <br />
      <p className="text-2xl">message : {message}</p>
    </main>
  );
}
