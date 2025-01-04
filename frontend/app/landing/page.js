"use client";
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold text-primary mb-4 sm:text-6xl md:text-7xl lg:text-8xl">
        LearnXcel
      </h1>
      <p className="text-2xl text-text mb-8 sm:text-3xl md:text-4xl lg:text-5xl">
        Combining learning with excellence. The Smart Learning Ecosystem App.
      </p>
      <Link href="/login" className="bg-primary text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary-dark transition transform hover:scale-105 duration-300">
        Get Started
      </Link>
    </div>
  );
}