import aboutimg from "@/assets/img/aboutimg.png";

const Aboutus = () => {
  return (
    <div className="md:p-16">
      <div className="flex flex-col items-center gap-10 md:flex-row">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mt-4 text-2xl font-bold md:mt-0">Tentang Kami</h1>
          <p className="px-5 mt-4 text-lg text-justify md:px-10">
            SIMAGANG (Sistem Informasi Magang) merupakan platform digital
            terintegrasi yang dirancang untuk menjembatani kebutuhan talenta
            teknologi di lingkungan Kepolisian Daerah Jawa Tengah dengan dunia
            akademik.
          </p>
        </div>
        <div className="flex items-center justify-center w-full md:w-1/2">
          <img src={aboutimg} alt="About Us" className="w-full max-w-md" />
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
