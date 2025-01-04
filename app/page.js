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
      description: "Take mock tests",
      link: "/mock-tests",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((card) => (
            <DashboardCard
              key={card?.title}
              title={card?.title}
              description={card?.description}
              link={card?.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
function DashboardCard({ title, description, link }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 duration-300">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <Link href={link} className="text-primary font-semibold hover:underline">
        Go to {title}
      </Link>
    </div>
  );
}

/*
function TopBar() {
  return (
    <div className="bg-primary text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">My Dashboard</h1>
      <div className="flex items-center">
        <img src="/path/to/avatar.jpg" alt="User Avatar" className="w-10 h-10 rounded-full mr-4" />
        <a href="/profile" className="text-white font-semibold hover:underline">
          Profile
        </a>
      </div>
    </div>
  );
}
 */
