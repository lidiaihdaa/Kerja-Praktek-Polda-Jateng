import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Sesuaikan import komponen di bawah ini dengan struktur foldermu
import HeaderDashboard from "./Component/HeaderDashboard";
import Timeline from "./Component/Timeline";
import { Loader2, FileText } from "lucide-react";

const DashboardPage = () => {
  const navigate = useNavigate();
  // State untuk melacak apakah user sudah isi form atau belum
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [statusSaatIni, setStatusSaatIni] = useState<any>(null);
  const [detail, setDetail] = useState<any>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("auth_token");

        // PERBAIKAN: Jika tidak ada token, langsung arahkan ke Login, jangan dibiarkan gantung
        if (!token) {
          navigate("/auth/login");
          return;
        }

        const response = await fetch("http://127.0.0.1:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil profile");
        }

        const result = await response.json();

        if (response.ok && result.status === "success") {
          setStatusSaatIni(result.data.status);
          setDetail(result.data);
          setIsRegistered(true);
        } else if (result.status === "empty") {
          setIsRegistered(false);
        } else {
          setIsRegistered(false);
        }
      } catch (error) {
        console.error("Gagal mengambil data", error);
        // PERBAIKAN: Jika server mati/error, matikan loading dan anggap belum daftar
        setIsRegistered(false);
      }
    };

    fetchProfileData();
  }, [navigate]); // Tambahkan navigate di sini agar React tidak protes

  // 1. TAMPILAN SAAT LOADING
  if (isRegistered === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-abu" />
        <p className="font-semibold text-gray-500">Memuat data Dashboard...</p>
      </div>
    );
  }

  // 2. TAMPILAN UNTUK AKUN BARU (BELUM DAFTAR)
  if (isRegistered === false) {
    return (
      <div className="p-6">
        <div className="flex flex-col items-center justify-center p-10 text-center bg-white border border-gray-100 shadow-sm rounded-xl min-h-[50vh]">
          <div className="p-4 mb-4 bg-blue-50 rounded-full">
            <FileText className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            Selamat Datang di Portal Magang!
          </h2>
          <p className="max-w-md mb-8 text-gray-500">
            Langkah pertama kamu adalah melengkapi data diri, data kampus, dan
            divisi magang yang dituju.
          </p>
          <button
            onClick={() => navigate("/user/pendaftaran")}
            className="px-6 py-3 font-bold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Mulai Pendaftaran Sekarang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <HeaderDashboard currentStatus={statusSaatIni} />
      <Timeline currentStatus={statusSaatIni} detail={detail} />
    </div>
  );
};

export default DashboardPage;
