import proyekImg from "@/assets/img/proyekhero.png";

const HeroProyek = () => {
  return (
    <section className="relative text-white bg-abu">
      <div className="pt-24 pb-5 md:pt-28 md:pb-10">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-10 md:flex-row">
            {/* TEXT */}
            <div className="w-full md:w-1/2">
              <h1 className="mb-6 text-3xl font-bold md:text-4xl">
                Showcase Project
              </h1>

              <p className="text-sm leading-relaxed text-justify md:text-base">
                Halaman ini menampilkan berbagai proyek yang telah dikembangkan
                sebagai bentuk inovasi dan komitmen dalam mendukung peningkatan
                kualitas layanan. Setiap proyek dirancang dengan pendekatan yang
                terstruktur, berorientasi pada kebutuhan, serta mengutamakan
                efektivitas dan kebermanfaatan bagi masyarakat.
              </p>
            </div>

            {/* IMAGE */}
            <div className="flex justify-center w-full md:w-1/2">
              <img
                src={proyekImg}
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

export default HeroProyek;
