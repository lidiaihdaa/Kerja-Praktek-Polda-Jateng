import { useState } from "react";
import Absensi from "./Components/Absensi";
import Progres from "./Components/Progres";
import Tugas from "./Components/Tugas";
import { Calendar, FileText, Laptop } from "lucide-react";

type TabType = "absensi" | "progres" | "tugas";

const UserMagangPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("absensi");

  const renderContent = () => {
    switch (activeTab) {
      case "absensi":
        return <Absensi />;
      case "progres":
        return <Progres />;
      case "tugas":
        return <Tugas />;
      default:
        return null;
    }
  };

  const tabClass = (tab: TabType) =>
    `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition
     ${
       activeTab === tab
         ? "bg-abu text-white"
         : "border border-abu text-abu hover:bg-abu/10"
     }`;

  return (
    <div className="p-6 bg-white rounded-lg">
      <h1 className="mb-4 text-xl font-semibold">Magangmu</h1>

      <div className="flex gap-3 mb-6">
        <button
          className={tabClass("absensi")}
          onClick={() => setActiveTab("absensi")}
        >
          <Calendar size={18} />
          Absensi
        </button>

        <button
          className={tabClass("progres")}
          onClick={() => setActiveTab("progres")}
        >
          <Laptop size={18} />
          Progres
        </button>

        <button
          className={tabClass("tugas")}
          onClick={() => setActiveTab("tugas")}
        >
          <FileText size={18} />
          Tugas Akhir
        </button>
      </div>

      <div className="p-6 border border-black rounded-lg">
        {renderContent()}
      </div>
    </div>
  );
};

export default UserMagangPage;