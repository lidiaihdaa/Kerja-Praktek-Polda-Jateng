import bgImage from "@/assets/img/bg.png";
import Hero from "./Components/Hero";

const Homepage = () => {
  return (
    <div
      className="relative bg-center bg-cover md:min-h-screen"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative pt-16">
        <Hero />
      </div>
    </div>
  );
};

export default Homepage;
