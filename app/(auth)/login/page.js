"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      setLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        setError(result?.error || "Failed to Login. Please try again.");
        return;
      }

      alert("Logged in successfully");
      setTimeout(() => router.push("/"), 300);
    } catch (error) {
      setError(error?.message || "Failed to Login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold text-primary mb-6">Login</h2>
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
      >
        {error && <p className="text-red-500">{error}</p>}
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
        <div className="mb-6">
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
        <button
          type="submit"
          className={`w-full bg-primary text-white py-2 rounded-lg font-semibold  transition transform duration-300 ${
            loading
              ? "cursor-not-allowed hover:none"
              : "cursor-pointer hover:scale-105 hover:bg-primary-dark"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="mt-4 text-text">
        Don't have an account?{" "}
        <Link href="/signup" className="text-primary font-semibold">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
