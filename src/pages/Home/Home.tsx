import Aboutus from "@/features/Homepage/Components/Aboutus";
import Homepage from "../../features/Homepage/Homepage";
import Capaian from "@/features/Homepage/Components/Capaian";
import Alur from "@/features/Homepage/Components/Alur";
import Showcase from "@/features/Homepage/Components/Showcase";

export const Home = () => {
  return (
    <div>
      <Homepage />
      <Aboutus />
      <Capaian />
      <Alur />
      <Showcase />
    </div>
  );
};
