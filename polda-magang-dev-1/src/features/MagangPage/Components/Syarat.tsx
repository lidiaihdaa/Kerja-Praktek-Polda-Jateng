import leftImg from "@/assets/img/left.png";
import midImg from "@/assets/img/mid.png";
import rightImg from "@/assets/img/right.png";
import { Link } from "react-router-dom";

const Syarat = () => {
  return (
    <section className="py-20 bg-white">
      <div className="px-6 mx-auto text-center max-w-7xl">
        <h2 className="text-3xl font-bold mb-14 md:text-4xl">
          Persyaratan Magang
        </h2>

        <div className="grid gap-12 md:grid-cols-3">
          <div className="flex flex-col items-center">
            <img
              src={leftImg}
              alt="Curriculum Vitae"
              className="object-contain mb-6 w-28 md:w-36 lg:w-40"
            />
            <h3 className="text-lg font-semibold md:text-xl">
              Curriculum Vitae
            </h3>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={midImg}
              alt="Surat Pengantar Kampus"
              className="object-contain mb-6 w-28 md:w-36 lg:w-40"
            />
            <h3 className="text-lg font-semibold md:text-xl">
              Surat Pengantar Kampus
            </h3>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={rightImg}
              alt="Proposal Magang"
              className="object-contain mb-6 w-28 md:w-36 lg:w-40"
            />
            <h3 className="text-lg font-semibold md:text-xl">
              Proposal Magang
            </h3>
          </div>
        </div>

        <div className="mt-14">
          <Link
            to="/auth/login"
            className="inline-block px-8 py-3 text-sm font-medium text-white transition rounded-md bg-biru hover:bg-birutua"
          >
            Lanjut Daftar
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Syarat;