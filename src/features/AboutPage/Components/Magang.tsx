import img from "@/assets/img/magang.png";

const Magang = () => {
  return (
    <section className="flex items-center justify-center py-16">
      <div className="flex justify-center w-full px-6 mx-auto max-w-7xl">
        <img
          src={img}
          alt="Magang"
          className="w-[85%] sm:w-[70%] md:w-[55%] lg:w-[45%]object-contain transition-all duration-300"
        />
      </div>
    </section>
  );
};

export default Magang;
