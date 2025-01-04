"use client";
import './globals.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <html lang="en">
      <body className="bg-background text-text">
        {isLoggedIn ? (
          <>
            <Header />
            <div className="flex">
              <Sidebar />
              <main className="flex-1 p-6">{children}</main>
            </div>
            <Footer />
          </>
        ) : (
          <>
            <TopNav />
            <main className="flex-1 p-6">{children}</main>
          </>
        )}
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="bg-primary text-white p-4">
      <h1 className="text-2xl font-bold">LearnXcel</h1>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className="w-64 bg-secondary text-white p-4">
      <nav>
        <ul>
          <li className="mb-4">
            <Link href="/" className="block p-4 bg-white text-primary hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300">
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/profile" className="block p-4 bg-white text-primary hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300">
              Profile
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/resources" className="block p-4 bg-white text-primary hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300">
              Resources
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/performance" className="block p-4 bg-white text-primary hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300">
              Performance
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/mock-tests" className="block p-4 bg-white text-primary hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300">
              Mock Tests
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/forums" className="block p-4 bg-white text-primary hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300">
              Forums
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/ai-assistant" className="block p-4 bg-white text-primary hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300">
              AI Assistant
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

function TopNav() {
  return (
    <header className="bg-primary text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">LearnXcel</h1>
      <div>
        <Link href="/login" className="bg-white text-primary px-4 py-2 rounded-full font-semibold hover:bg-primary-dark hover:text-white transition transform hover:scale-105 duration-300 mr-2">
          Login
        </Link>
        <Link href="/signup" className="bg-white text-primary px-4 py-2 rounded-full font-semibold hover:bg-primary-dark hover:text-white transition transform hover:scale-105 duration-300">
          Sign Up
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-white p-4 text-center">
      <p>&copy; 2023 LearnXcel. All rights reserved.</p>
    </footer>
  );
}