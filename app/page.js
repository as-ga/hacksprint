import Link from "next/link";

export default function Home() {
  const cardData = [
    {
      title: "Profile",
      description: "View and edit your profile",
      link: "/profile",
    },
    {
      title: "Resources",
      description: "Access learning resources",
      link: "/resources",
    },
    {
      title: "Performance",
      description: "Track your performance",
      link: "/performance",
    },
    {
      title: "Mock Tests",
      description: "Take mock tests to prepare",
      link: "/mock-tests",
    },
    {
      title: "Forums",
      description: "Join the discussion in forums",
      link: "/forums",
    },
    {
      title: "AI Chatbot",
      description: "Interact with the AI chatbot",
      link: "/ai-assistant",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <Link key={index} href={card.link}>
            <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
              <p className="text-gray-700">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}