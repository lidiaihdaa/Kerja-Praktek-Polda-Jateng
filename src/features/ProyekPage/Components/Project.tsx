import { useState } from "react";

const showcaseData = [
  { id: 1, title: "Search Engine Optimization" },
  { id: 2, title: "UI / UX Design" },
  { id: 3, title: "Web Development" },
  { id: 4, title: "Mobile App Development" },
  { id: 5, title: "System Integration" },
  { id: 6, title: "Database Management System" },
  { id: 7, title: "API Development" },
  { id: 8, title: "Cyber Security" },
  { id: 9, title: "Cloud Infrastructure" },
  { id: 10, title: "Data Analytics & Reporting" },
];

const Project = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedData = showAll ? showcaseData : showcaseData.slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto max-w-7xl">
        <h2 className="mb-12 text-2xl font-semibold text-center text-gray-800">
          Showcase Project
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
          {displayedData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-6 transition border shadow-sm bg-gray-50 rounded-2xl hover:shadow-md"
            >
              <div>
                <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-white rounded-md bg-biru">
                  {item.title}
                </span>

                <div className="flex justify-end mb-6">
                  <img
                    src="https://dummyimage.com/160x90/e5e7eb/9ca3af&text=Illustration"
                    alt="illustration"
                    className="rounded-md"
                  />
                </div>
              </div>

              <button className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900">
                <span className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                  →
                </span>
                Learn more
              </button>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        <div className="text-center mt-14">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 text-white transition rounded-lg bg-biru hover:opacity-90"
          >
            {showAll ? "Lebih sedikit" : "Lihat lebih lengkap"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Project;
