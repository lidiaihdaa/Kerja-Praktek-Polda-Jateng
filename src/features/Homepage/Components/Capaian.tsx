const capaianData = [
  {
    value: "100",
    label: "MAHASISWA",
  },
  {
    value: "100",
    label: "UNIVERSITAS",
  },
  {
    value: "100",
    label: "PROJEK SELESAI",
  },
];

const Capaian = () => {
  return (
    <section className="py-16 bg-abu">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-2xl font-semibold text-center text-white">
          Capaian Kami
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {capaianData.map((item, index) => (
            <div
              key={index}
              className="p-8 text-center bg-white shadow-md rounded-xl"
            >
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full">
                  🎓
                </div>
              </div>

              <h3 className="text-3xl font-bold text-gray-800">{item.value}</h3>
              <p className="mt-2 font-medium text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capaian;
