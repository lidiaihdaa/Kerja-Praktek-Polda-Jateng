import aboutImg from "@/assets/img/imgabout-2.png";

const AboutHero = () => {
  return (
    <section className="relative text-white bg-abu">
      <div className="pt-24 pb-5 md:pt-28 md:pb-10">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-10 md:flex-row">
            {/* TEXT */}
            <div className="w-full md:w-1/2">
              <h1 className="mb-6 text-3xl font-bold md:text-4xl">
                Tentang Kami
              </h1>

              <p className="text-sm leading-relaxed text-justify md:text-base">
                SIMAGANG (Sistem Informasi Magang) merupakan platform digital
                terintegrasi yang dirancang untuk menjembatani kebutuha talenta
                teknologi di lingkungan Kepolisian Daerah Jawa Tengah dengan
                dunia akademik. Melalui sistem yang transparan dan objektif,
                kami menerapkan penilaian berbasis data dan algoritma cerdas
                agar setiap kompetensi peserta terukur secara nyata. Inovasi ini
                memastikan proses magang berjalan lebih efisien, profesional,
                dan akuntabel.
              </p>
            </div>

            {/* IMAGE */}
            <div className="flex justify-center w-full md:w-1/2">
              <img
                src={aboutImg}
                alt="Polda Jawa Tengah"
                className="w-full max-w-lg rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
