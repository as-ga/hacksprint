"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMesssage] = useState("");
  const server = String(process.env.NEXT_SERVER_URL);
  useEffect(() => {
    if (!message) {
      fetch(server)
        .then((data) => {
          setMesssage(data.message);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  });
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">
        LearnXcel : The Smart Learning Ecosystem App
      </h1>
      <br />
      <p className="text-2xl">message:{message}</p>
    </main>
  );
}
