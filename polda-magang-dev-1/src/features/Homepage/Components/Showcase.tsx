import { useState } from "react";
import { Link } from "react-router-dom";

const showcaseData = [
  { id: 1, title: "Search engine optimization" },
  { id: 2, title: "UI / UX Design" },
  { id: 3, title: "Web Development" },
  { id: 4, title: "Mobile App Development" },
  { id: 5, title: "System Integration" },
];

const Showcase = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedData = showAll ? showcaseData : showcaseData.slice(0, 2);

  return (
    <section className="py-20 bg-abu">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-2xl font-semibold text-center text-white">
          Showcase Project
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {displayedData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-6 bg-white shadow-md rounded-2xl"
            >
              <div>
                <span
                  className="inline-block px-3 py-1 mb-4 text-sm font-medium text-white rounded-md"
                  style={{ backgroundColor: "#425861" }}
                >
                  {item.title}
                </span>

                <div className="flex justify-end mb-6">
                  <img
                    src="https://dummyimage.com/150x80/eeeeee/aaaaaa&text=Illustration"
                    alt="illustration"
                  />
                </div>
              </div>

              <Link
                to="#"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-gray-900"
              >
                <span className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                  →
                </span>
                Learn more
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 text-white transition rounded-lg bg-biru hover:opacity-90"
            >
              Lihat Lebih Lengkap
            </button>
          ) : (
            <Link
              to="/proyek"
              className="inline-block px-6 py-3 text-white transition rounded-lg bg-biru hover:opacity-90"
            >
              Lihat lebih banyak lagi
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
