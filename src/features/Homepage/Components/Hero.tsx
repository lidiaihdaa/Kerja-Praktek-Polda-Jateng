const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center h-[75vh] md:h-screen px-6 text-center text-white">
      <div className="flex flex-col items-center justify-center w-full max-w-3xl">
        <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
          SIMAGANG POLDA JATENG
        </h1>

        <p className="mb-8 text-sm md:text-base">
          Wujudkan potensi Anda Bersama Polda Jawa Tengah
        </p>

        <button className="px-6 py-3 text-sm transition rounded bg-biru hover:bg-birutua">
          Lihat Kuota
        </button>
      </div>
    </section>
  );
};

export default Hero;
