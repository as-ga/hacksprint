"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Header = ({ children }) => {
  const session = useSession();
  const user = session?.data?.user;

  return (
    <>
      <header className="bg-primary text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">LearnXcel</h1>
        {user ? (
          <div>
            <Link
              href="/profile"
              className="text-white font-semibold hover:underline"
            >
              welcome, {user?.name} !
            </Link>
          </div>
        ) : (
          <div>
            <Link
              href="/login"
              className="bg-white text-primary px-4 py-2 rounded-full font-semibold hover:bg-primary-dark hover:text-white transition transform hover:scale-105 duration-300 mr-2"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-white text-primary px-4 py-2 rounded-full font-semibold hover:bg-primary-dark hover:text-white transition transform hover:scale-105 duration-300"
            >
              Sign Up
            </Link>
          </div>
        )}
      </header>
      {user ? (
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      ) : (
        <main className="flex-1 p-6">{children}</main>
      )}
    </>
  );
};
export { Header };

function Sidebar() {
  const pathname = usePathname();

  const sidebar = [
    { name: "Dashboard", slug: "/" },
    { name: "Profile", slug: "/profile" },
    { name: "Resources", slug: "/resources" },
    { name: "Performance", slug: "/performance" },
    { name: "Mock Tests", slug: "/mock-tests" },
    { name: "Forums", slug: "/forums" },
    { name: "AI Assistant", slug: "/ai-assistant" },
    { name: "Team", slug: "/team" },

    // {name: "Performance", href: "/performance", slug: "/performance"},
    // {name: "Mock Tests", href: "/mock-tests", slug: "/mock-tests"},
    // {name: "Forums", href: "/forums", slug: "/forums"},
    // {name: "AI Assistant", href: "/ai-assistant", slug: "/ai-assistant"},
    // {name: "Team", href: "/logout", slug: "/team"}
  ];

  return (
    <aside className="w-64 bg-secondary text-white p-4">
      <nav>
        {sidebar.map(({ name, slug }) => (
          <Link
            key={name}
            href={slug}
            className={`mb-4 block p-4 transition transform hover:scale-105 duration-300 ${
              pathname === slug
                ? "bg-primary text-white hover:bg-white hover:text-primary"
                : "bg-white text-primary hover:text-white hover:bg-primary"
            }
            `}
          >
            {name}
          </Link>
        ))}
        {/* <li className="mb-4">
            <Link
              href="/"
              className="block p-4 bg-white text-primary hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300"
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/profile"
              className="block p-4 bg-white text-primary hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300"
            >
              Profile
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/resources"
              className="block p-4 bg-white text-primary hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300"
            >
              Resources
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/performance"
              className="block p-4 bg-white text-primary hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300"
            >
              Performance
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/mock-tests"
              className="block p-4 bg-white text-primary hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300"
            >
              Mock Tests
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/forums"
              className="block p-4 bg-white text-primary hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300"
            >
              Forums
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/ai-assistant"
              className="block p-4 bg-white text-primary hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300"
            >
              AI Assistant
            </Link>
          </li>
        </ul> */}
      </nav>
    </aside>
  );
}
