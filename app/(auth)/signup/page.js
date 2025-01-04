"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      setLoading(true);
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const response = await axios.post("api/auth/register", {
        name,
        email,
        password,
      });
      if (response?.data?.success) {
        alert("Registration successful");
        setTimeout(() => router.push("/"), 1000);
      } else {
        setError(response?.data?.message || "Registration failed");
      }
    } catch (error) {
      setError(error?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold text-primary mb-6">Sign Up</h2>
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
      >
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-text mb-2" htmlFor="name">
            Name*
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-text mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-text mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-text mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-primary text-white py-2 rounded-lg font-semibold transition transform duration-300
          ${
            loading
              ? "cursor-not-allowed hover:none"
              : "cursor-pointer hover:scale-105 hover:bg-primary-dark"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Sign Up"}
        </button>
      </form>
      <p className="mt-4 text-text">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
}
