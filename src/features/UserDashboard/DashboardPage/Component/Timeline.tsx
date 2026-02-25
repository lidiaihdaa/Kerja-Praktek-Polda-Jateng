import { Button } from "@/components/ui/button";
import { ArrowDown, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

type StatusType =
  | "daftar"
  | "review"
  | "pengumuman_lolos"
  | "pengumuman_tidak_lolos"
  | "berkas"
  | "diterima";

let CURRENT_STATUS: StatusType = "berkas";

type TimelineKey = "daftar" | "review" | "pengumuman" | "berkas" | "diterima";

const timelineData: { key: TimelineKey; label: string }[] = [
  { key: "daftar", label: "Pendaftaran" },
  { key: "review", label: "Review Admin" },
  { key: "pengumuman", label: "Pengumuman" },
  { key: "berkas", label: "Upload Berkas" },
  { key: "diterima", label: "Diterima" },
];

const isPengumumanStatus = (status: StatusType) =>
  status === "pengumuman_lolos" || status === "pengumuman_tidak_lolos";

const isStatus = (status: StatusType) => CURRENT_STATUS === status;

const Timeline = () => {
  const navigate = useNavigate();

  const isActive = (key: TimelineKey) => {
    const currentKey: TimelineKey = isPengumumanStatus(CURRENT_STATUS)
      ? "pengumuman"
      : (CURRENT_STATUS as TimelineKey);

    const currentIndex = timelineData.findIndex((i) => i.key === currentKey);
    const itemIndex = timelineData.findIndex((i) => i.key === key);

    return itemIndex <= currentIndex;
  };

  const isCurrent = (key: TimelineKey) =>
    isPengumumanStatus(CURRENT_STATUS)
      ? key === "pengumuman"
      : key === CURRENT_STATUS;

  return (
    <div className="mt-10">
      <h2 className="mb-6 text-xl font-semibold text-center">Timeline Kamu</h2>

      {/* TIMELINE */}
      <div className="relative flex items-center justify-center mb-8">
        {timelineData.map((item, index) => (
          <div key={item.key} className="flex items-center">
            <div className="relative flex flex-col items-center">
              {isCurrent(item.key) && (
                <ArrowDown className="absolute -top-6 text-abu" />
              )}

              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center
                ${isActive(item.key) ? "bg-green-500" : "bg-gray-300"}`}
              >
                {isActive(item.key) && (
                  <CheckCircle className="w-4 h-4 text-white" />
                )}
              </div>

              <span className="mt-2 text-xs text-center">{item.label}</span>
            </div>

            {index !== timelineData.length - 1 && (
              <div className="w-16 h-[2px] bg-gray-300 mx-2" />
            )}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="max-w-xl p-6 mx-auto border rounded-lg shadow-sm">
        {isStatus("daftar") && (
          <p>
            Pendaftaran Anda telah berhasil diterima oleh sistem pada 10 Janurai
            2026 pukul 10.45. Data Anda sudah direview dan diverifikasi oleh tim
            administrasi.
          </p>
        )}

        {isStatus("review") && (
          <p>
            Tim admin sudah memeriksa Data Anda. Pengumuman hasil akan kami
            berikan pada halaman berikutnya.
          </p>
        )}

        {isStatus("pengumuman_lolos") && (
          <>
            <p className="mb-4">
              Selamat! Anda dinyatakan LOLOS. Silahkan Upload berkas persyaratan
              berupa CV, Surat Pengantar Kampus, dan Proposal Magang.
            </p>
            <Button
              className="text-white bg-biru"
              onClick={() => navigate("/user/berkas")}
            >
              Upload
            </Button>
          </>
        )}

        {isStatus("pengumuman_tidak_lolos") && (
          <p>
            Mohon Maaf Anda dinyatakan <b>TIDAK LOLOS</b>. Anda bisa mencoba
            pendaftaran magang di periode berikutnya!
          </p>
        )}

        {isStatus("berkas") && (
          <>
            <p className="mb-4">
              Berkas Anda sudah terkirim! Unduh Surat balasan dan ... berikut.
            </p>
            <Button
              className="text-white bg-biru"
              onClick={() => alert("Fitur unduh belum tersedia")}
            >
              Unduh Surat
            </Button>
          </>
        )}

        {isStatus("diterima") && (
          <>
            <p className="mb-4">Mulai perjalanan magangmu di Polda Jateng!</p>
            <Button
              className="text-white bg-biru"
              onClick={() => navigate("/user/magangmu")}
            >
              Mulai
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Timeline;
