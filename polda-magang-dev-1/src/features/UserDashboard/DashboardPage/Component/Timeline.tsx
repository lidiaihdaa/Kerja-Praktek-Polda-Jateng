import { Button } from "@/components/ui/button";
import { ArrowDown, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// 🔥 PERBAIKAN 1: Tambahkan "pending" ke dalam StatusType
export type StatusType =
  | "pending"
  | "daftar"
  | "review"
  | "pengumuman_lolos"
  | "pengumuman_tidak_lolos"
  | "berkas"
  | "diterima";

// Kita arahkan "pending" agar dianggap sebagai tahap pertama (Pendaftaran)
type TimelineKey =
  | "pending"
  | "daftar"
  | "review"
  | "pengumuman"
  | "berkas"
  | "diterima";

const timelineData: { key: TimelineKey; label: string }[] = [
  { key: "pending", label: "Pendaftaran" }, // Gunakan pending sebagai kunci awal
  { key: "review", label: "Seleksi Administrasi" },
  { key: "pengumuman", label: "Pengumuman" },
  { key: "berkas", label: "Upload Berkas" },
  { key: "diterima", label: "Diterima" },
];

interface TimelineProps {
  currentStatus?: StatusType;
  detail?: any;
}

const Timeline = ({ currentStatus = "pending", detail }: TimelineProps) => {
  const navigate = useNavigate();

  const isPengumumanStatus = (status: StatusType) =>
    status === "pengumuman_lolos" || status === "pengumuman_tidak_lolos";

  const isStatus = (status: StatusType) => currentStatus === status;

  const isActive = (key: TimelineKey) => {
    // 🔥 PERBAIKAN 2: Logic untuk menentukan posisi progress saat ini
    let currentKey: TimelineKey = "pending";

    if (isPengumumanStatus(currentStatus)) {
      currentKey = "pengumuman";
    } else if (currentStatus === "daftar") {
      currentKey = "pending"; // Sapaan untuk status awal
    } else {
      currentKey = currentStatus as TimelineKey;
    }

    const currentIndex = timelineData.findIndex((i) => i.key === currentKey);
    const itemIndex = timelineData.findIndex((i) => i.key === key);

    return itemIndex <= currentIndex;
  };

  const isCurrent = (key: TimelineKey) => {
    if (isPengumumanStatus(currentStatus)) return key === "pengumuman";
    if (currentStatus === "daftar") return key === "pending";
    return key === currentStatus;
  };

  const formatTanggal = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const tanggalDaftar = formatTanggal(detail?.created_at);

  const estimasiPengumuman = detail?.created_at
    ? formatTanggal(
        new Date(
          new Date(detail.created_at).getTime() + 7 * 24 * 60 * 60 * 1000,
        ).toISOString(),
      )
    : "-";

  return (
    <div className="mt-10 mb-10">
      <h2 className="mb-14 text-xl font-semibold text-center">Timeline Kamu</h2>

      {/* TIMELINE VISUAL */}
      <div className="relative flex items-center justify-center mb-12">
        {timelineData.map((item, index) => (
          <div key={item.key} className="flex items-center">
            <div className="relative flex flex-col items-center">
              {/* Panah ke bawah untuk status saat ini */}
              {isCurrent(item.key) && (
                <ArrowDown className="absolute -top-8 text-blue-600 animate-bounce" />
              )}

              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm
                ${isActive(item.key) ? "bg-green-500 scale-110" : "bg-gray-200"}`}
              >
                {isActive(item.key) ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : (
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                )}
              </div>

              <span
                className={`mt-3 text-[10px] md:text-xs font-bold uppercase tracking-tighter text-center absolute top-10 w-24 ${isActive(item.key) ? "text-gray-800" : "text-gray-400"}`}
              >
                {item.label}
              </span>
            </div>

            {index !== timelineData.length - 1 && (
              <div
                className={`w-16 md:w-24 h-[4px] mx-1 rounded-full transition-colors duration-500 ${isActive(timelineData[index + 1].key) ? "bg-green-500" : "bg-gray-200"}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* CONTENT BOX DI BAWAH TIMELINE */}
      <div className="max-w-2xl p-8 mx-auto border-2 border-gray-50 rounded-2xl shadow-sm bg-white text-center mt-20">
        {/* Status Awal (Pending dari Laravel atau Daftar) */}
        {(isStatus("pending") || isStatus("daftar")) && (
          <p className="text-gray-600 leading-relaxed">
            Pendaftaran Anda telah berhasil diterima oleh sistem. Data Anda
            sedang <span className="text-blue-600 font-bold">direview</span> dan
            diverifikasi oleh tim administrasi Polda Jateng.
          </p>
        )}

        {isStatus("review") && (
          <p className="text-gray-600 leading-relaxed">
            Tim admin sedang memeriksa kelengkapan data Anda. Pengumuman hasil
            akan kami tampilkan di halaman ini segera.
          </p>
        )}

        {/* Tahap Lolos & Arahkan ke Profil */}
        {isStatus("pengumuman_lolos") && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-700 font-medium">
              Selamat! Anda dinyatakan{" "}
              <span className="text-green-600 font-bold">LOLOS</span>. Silahkan
              Upload berkas persyaratan berupa CV, Surat Pengantar Kampus, dan
              Proposal Magang.
            </p>
            <Button
              className="text-white bg-green-600 hover:bg-green-700 px-10 shadow-lg shadow-green-200"
              onClick={() => navigate("/user/profile")}
            >
              Lengkapi Berkas Sekarang
            </Button>
          </div>
        )}

        {isStatus("pengumuman_tidak_lolos") && (
          <p className="text-red-600 font-medium">
            Mohon Maaf Anda dinyatakan <b>TIDAK LOLOS</b>. Anda bisa mencoba
            pendaftaran magang di periode berikutnya. Tetap semangat!
          </p>
        )}

        {isStatus("berkas") && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-700 font-medium">
              Berkas Anda sudah terkirim! Silahkan unduh Surat Balasan resmi
              dari Polda Jateng di bawah ini.
            </p>
            <Button
              className="text-white bg-slate-700 hover:bg-slate-800 px-10"
              onClick={() =>
                (window.location.href =
                  "http://127.0.0.1:8000/api/download-surat")
              }
            >
              Unduh Surat Balasan
            </Button>
          </div>
        )}

        {isStatus("diterima") && (
          <div className="flex flex-col items-center gap-5">
            <p className="text-green-700 font-bold text-xl uppercase tracking-tight">
              Selamat Datang di Keluarga Besar Polda Jateng!
            </p>
            <Button
              className="text-white bg-blue-600 hover:bg-blue-700 px-12 py-7 text-lg rounded-2xl shadow-xl shadow-blue-100"
              onClick={() => navigate("/user/magangmu")}
            >
              Mulai Magang Sekarang
            </Button>
          </div>
        )}
      </div>
      <div className="mt-6 pt-6 border-t text-sm text-gray-500 space-y-1">
        <p>
          📅 Tanggal Pendaftaran: <b>{tanggalDaftar}</b>
        </p>
        <p>
          📢 Estimasi Pengumuman: <b>{estimasiPengumuman}</b>
        </p>
      </div>
    </div>
  );
};

export default Timeline;
