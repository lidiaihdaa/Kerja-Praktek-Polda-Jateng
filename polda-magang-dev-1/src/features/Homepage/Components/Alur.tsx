import { Link } from "react-router-dom";

const alurData = [
  {
    title: "Lorem Ipsum",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "Lorem Ipsum",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "Lorem Ipsum",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "Lorem Ipsum",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const Alur = () => {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <h2 className="mb-16 text-2xl font-semibold text-center">
          Alur Pendaftaran
        </h2>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-[2px] bg-gray-300 -translate-x-1/2" />

          <div className="space-y-12">
            {alurData.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <div
                    className={`w-full md:w-1/2 ${
                      isLeft ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div className="p-6 text-white rounded-lg shadow-md bg-abu">
                      <h3 className="mb-2 font-semibold">{item.title}</h3>
                      <p className="text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/auth/login"
            className="inline-block px-6 py-3 font-medium text-white transition rounded-lg bg-biru hover:bg-gray-800"
          >
            Lanjut Daftar
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Alur;