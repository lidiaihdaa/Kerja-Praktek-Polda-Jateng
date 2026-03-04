import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Absensi from "./Components/Absensi";
import Progres from "./Components/Progres";
import Tugas from "./Components/Tugas";
import { Calendar, FileText, Laptop } from "lucide-react";

type TabType = "absensi" | "progres" | "tugas";

const UserMagangPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("absensi");
  const [status, setStatus] = useState<string | null>(null);
  const navigate = useNavigate();

  // 🔥 Ambil status dari backend
  useEffect(() => {
    const fetchStatus = async () => {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        navigate("/auth/login");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const result = await response.json();
        console.log("PROFILE:", result);

        if (response.ok && result.data) {
          setStatus(result.data.status);
        } else {
          setStatus("unknown");
        }
      } catch (error) {
        console.error("Error ambil status:", error);
        setStatus("unknown");
      }
    };

    fetchStatus();
  }, [navigate]);

  // 🔥 Loading dulu sebelum tahu status
  if (status === null) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500">Memeriksa status magang...</p>
      </div>
    );
  }

  // 🔒 Kalau belum diterima → kunci halaman
  if (status !== "diterima") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-xl font-bold text-red-600">
          Fitur Magang Belum Tersedia
        </h2>
        <p className="text-gray-500 mt-2 max-w-md">
          Fitur Absensi, Progres, dan Tugas hanya dapat diakses setelah Anda
          resmi <span className="font-semibold">diterima</span> sebagai peserta
          magang.
        </p>
      </div>
    );
  }

  // 🔥 Kalau sudah diterima baru tampilkan normal
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
