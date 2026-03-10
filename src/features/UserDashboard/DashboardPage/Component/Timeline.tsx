import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export type StatusType =
  | "pending"
  | "daftar"
  | "pengumuman_lolos"
  | "pengumuman_tidak_lolos"
  | "diterima";

type TimelineKey = "pending" | "pengumuman" | "diterima";

interface TimelineProps {
  currentStatus?: StatusType;
  detail?: any;
}

const Timeline = ({ currentStatus = "pending", detail }: TimelineProps) => {
  const navigate = useNavigate();
  const [activePreview, setActivePreview] = useState<TimelineKey>("pending");

  const getCurrentKey = (): TimelineKey => {
    if (currentStatus === "pending" || currentStatus === "daftar") return "pending";
    if (currentStatus === "pengumuman_lolos" || currentStatus === "pengumuman_tidak_lolos") return "pengumuman";
    if (currentStatus === "diterima") return "diterima";
    return "pending";
  };

  const timelineData: { key: TimelineKey; label: string }[] = [
  { key: "pending", label: "Pendaftaran" },
  { key: "pengumuman", label: "Pengumuman" },
  { key: "diterima", label: "Diterima" },
];

  const isActive = (key: TimelineKey) => {
    const order: TimelineKey[] = ["pending", "pengumuman", "diterima"];
    return order.indexOf(key) <= order.indexOf(getCurrentKey());
  };

  const isCurrent = (key: TimelineKey) => key === getCurrentKey();

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

  const renderContent = () => {
    if (activePreview === "pending") {
      return (
        <p className="text-gray-600">
          Pendaftaran Anda telah berhasil dikirim dan sedang diverifikasi oleh
          admin Polda Jateng.
        </p>
      );
    }

    if (activePreview === "pengumuman") {
      if (currentStatus === "pengumuman_lolos") {
        return (
          <p className="text-green-600 font-semibold">
            Selamat! Anda dinyatakan LOLOS seleksi magang.
          </p>
        );
      }

      if (currentStatus === "pengumuman_tidak_lolos") {
        return (
          <p className="text-red-600 font-semibold">
            Mohon maaf Anda belum lolos seleksi. Silakan mencoba di periode berikutnya.
          </p>
        );
      }

      return (
        <p className="text-gray-400 italic">
          Pengumuman akan ditampilkan setelah proses verifikasi selesai.
        </p>
      );
    }

    if (activePreview === "diterima") {
      if (currentStatus === "diterima") {
        return (
          <div className="flex flex-col items-center gap-4">
            <p className="text-green-700 font-bold text-lg">
              Selamat Anda Resmi Diterima Magang di Polda Jateng
            </p>

            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => navigate("/user/magangmu")}
            >
              Mulai Magang
            </Button>
          </div>
        );
      }

      return (
        <p className="text-gray-400 italic">
          Tahap ini akan aktif setelah Anda dinyatakan diterima.
        </p>
      );
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-center font-semibold text-xl mb-14">
        Timeline Kamu
      </h2>

      <div className="flex justify-center items-center mb-12">
        {timelineData.map((item, index) => (
          <div key={item.key} className="flex items-center">
            <div className="flex flex-col items-center relative">
              {isCurrent(item.key) && (
                <ArrowDown className="absolute -top-8 text-blue-600 animate-bounce" />
              )}

              <div
                onClick={() => setActivePreview(item.key as TimelineKey)}
                className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer
                ${isActive(item.key as TimelineKey) ? "bg-green-500" : "bg-gray-200"}`}
              >
                {isActive(item.key as TimelineKey) ? (
                  <CheckCircle className="text-white w-5 h-5" />
                ) : (
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                )}
              </div>

              <span className="text-xs mt-3 font-bold uppercase">
                {item.label}
              </span>
            </div>

            {index !== timelineData.length - 1 && (
              <div
                className={`w-24 h-[4px] mx-2
                ${isActive(timelineData[index + 1].key as TimelineKey)
                    ? "bg-green-500"
                    : "bg-gray-200"
                  }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="max-w-xl mx-auto p-6 border rounded-xl text-center bg-white shadow-sm">
        {renderContent()}
      </div>

      <div className="text-sm text-gray-500 mt-6 border-t pt-4">
        📅 Tanggal Pendaftaran: <b>{tanggalDaftar}</b>
      </div>
    </div>
  );
};

export default Timeline;