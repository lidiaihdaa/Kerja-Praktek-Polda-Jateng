import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, CheckCircle, Upload, FileText, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export type StatusType =
  | "pending"
  | "daftar"
  | "pengumuman_lolos"
  | "pengumuman_tidak_lolos"
  | "berkas"
  | "diterima";

type TimelineKey = "pending" | "pengumuman" | "berkas" | "diterima";

interface TimelineProps {
  currentStatus?: StatusType;
  detail?: any;
  onStatusChange?: (newStatus: StatusType) => void;
}

interface FileUploadRowProps {
  label: string;
  file: File | null;
  onSelect: (f: File | null) => void;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
}

const FileUploadRow = ({ label, file, onSelect, inputRef }: FileUploadRowProps) => (
  <div className="flex items-center justify-between w-full border rounded-xl px-4 py-3 bg-gray-50">
    <div className="flex items-center gap-3">
      <FileText className="w-5 h-5 text-gray-400" />
      <div className="text-left">
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        {file ? (
          <p className="text-sm text-green-600 font-semibold truncate max-w-[200px]">{file.name}</p>
        ) : (
          <p className="text-sm text-gray-400 italic">Belum dipilih</p>
        )}
      </div>
    </div>
    <div className="flex items-center gap-2">
      {file && (
        <button onClick={() => onSelect(null)} className="text-red-400 hover:text-red-600">
          <X className="w-4 h-4" />
        </button>
      )}
      <Button
        size="sm"
        variant="outline"
        className="text-xs"
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="w-3 h-3 mr-1" /> Pilih
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => onSelect(e.target.files?.[0] || null)}
      />
    </div>
  </div>
);

const Timeline = ({ currentStatus = "pending", detail, onStatusChange }: TimelineProps) => {
  const navigate = useNavigate();

  const [cv, setCv] = useState<File | null>(null);
  const [suratPengantar, setSuratPengantar] = useState<File | null>(null);
  const [proposal, setProposal] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const cvRef = useRef<HTMLInputElement | null>(null);
  const suratRef = useRef<HTMLInputElement | null>(null);
  const proposalRef = useRef<HTMLInputElement | null>(null);

  const isPengumumanStatus = (status: StatusType) =>
    status === "pengumuman_lolos" || status === "pengumuman_tidak_lolos";

  const isStatus = (status: StatusType) => currentStatus === status;

  const getCurrentKey = (): TimelineKey => {
    if (currentStatus === "pending" || currentStatus === "daftar") return "pending";
    if (isPengumumanStatus(currentStatus)) return "pengumuman";
    if (currentStatus === "berkas") return "berkas";
    if (currentStatus === "diterima") return "diterima";
    return "pending";
  };

  // Timeline dinamis: pending hanya 2 step, selainnya 4 step
  const getTimelineData = (): { key: TimelineKey; label: string }[] => {
    if (currentStatus === "pending" || currentStatus === "daftar") {
      return [
        { key: "pending", label: "Pendaftaran" },
        { key: "pengumuman", label: "Pengumuman" },
      ];
    }
    return [
      { key: "pending", label: "Pendaftaran" },
      { key: "pengumuman", label: "Pengumuman" },
      { key: "berkas", label: "Upload Berkas" },
      { key: "diterima", label: "Diterima" },
    ];
  };

  const [activePreview, setActivePreview] = useState<TimelineKey>(getCurrentKey());

  const isActive = (key: TimelineKey) => {
    const order: TimelineKey[] = ["pending", "pengumuman", "berkas", "diterima"];
    const currentKey = getCurrentKey();
    const currentIndex = order.indexOf(currentKey);
    const itemIndex = order.indexOf(key);

    if (key === "berkas") {
      return currentStatus === "berkas" || currentStatus === "diterima";
    }

    return itemIndex <= currentIndex;
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
  const estimasiPengumuman = detail?.created_at
    ? formatTanggal(
        new Date(
          new Date(detail.created_at).getTime() + 7 * 24 * 60 * 60 * 1000
        ).toISOString()
      )
    : "-";

  const handleUploadBerkas = async () => {
    if (!cv || !suratPengantar || !proposal) {
      setUploadError("Semua berkas wajib diupload (CV, Surat Pengantar, Proposal).");
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const token = localStorage.getItem("auth_token");
      const formData = new FormData();
      formData.append("berkas_cv", cv);
      formData.append("berkas_surat_pengantar", suratPengantar);
      formData.append("berkas_proposal", proposal);

      await axios.post("http://127.0.0.1:8000/api/profile/upload-berkas", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadSuccess(true);
      if (onStatusChange) onStatusChange("berkas");

    } catch (err: any) {
      setUploadError(err?.response?.data?.message || "Gagal mengupload berkas.");
    } finally {
      setUploading(false);
    }
  };

  const renderContent = () => {
    if (activePreview === "pending") {
      return (
        <p className="text-gray-600 leading-relaxed">
          Pendaftaran Anda telah berhasil diterima oleh sistem. Data Anda
          sedang <span className="text-blue-600 font-bold">diverifikasi</span> oleh
          tim administrasi Polda Jateng.
        </p>
      );
    }

    if (activePreview === "pengumuman") {
      if (isStatus("pengumuman_lolos")) {
        return (
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-700 font-medium">
              Selamat! Anda dinyatakan{" "}
              <span className="text-green-600 font-bold">LOLOS</span>. Silahkan
              upload berkas persyaratan berupa CV, Surat Pengantar Kampus, dan
              Proposal Magang.
            </p>
            <Button
              className="text-white bg-green-600 hover:bg-green-700 px-10 shadow-lg shadow-green-200"
              onClick={() => setActivePreview("berkas")}
            >
              Upload Berkas Sekarang
            </Button>
          </div>
        );
      }
      if (isStatus("pengumuman_tidak_lolos")) {
        return (
          <p className="text-red-600 font-medium">
            Mohon Maaf Anda dinyatakan <b>TIDAK LOLOS</b>. Anda bisa mencoba
            pendaftaran magang di periode berikutnya. Tetap semangat!
          </p>
        );
      }
      return (
        <p className="text-gray-400 leading-relaxed italic">
          Pengumuman hasil seleksi akan ditampilkan di sini setelah proses verifikasi selesai.
        </p>
      );
    }

    if (activePreview === "berkas") {
      if (isStatus("berkas") && uploadSuccess) {
        return (
          <div className="flex flex-col items-center gap-4">
            <p className="text-blue-600 font-medium">
              ✅ Berkas berhasil dikirim! Menunggu konfirmasi admin.
            </p>
          </div>
        );
      }

      if (isStatus("berkas") && !uploadSuccess) {
        return (
          <div className="flex flex-col items-center gap-4">
            <p className="text-blue-600 font-medium">
              ✅ Berkas Anda sudah terkirim. Menunggu konfirmasi dari admin Polda Jateng.
            </p>
          </div>
        );
      }

      if (isStatus("diterima")) {
        return (
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-700 font-medium">
              Berkas Anda sudah terkirim! Silahkan unduh Surat Balasan resmi
              dari Polda Jateng di bawah ini.
            </p>
            <Button
              className="text-white bg-slate-700 hover:bg-slate-800 px-10"
              onClick={() =>
                (window.location.href = "http://127.0.0.1:8000/api/download-surat")
              }
            >
              Unduh Surat Balasan
            </Button>
          </div>
        );
      }

      if (isStatus("pengumuman_lolos")) {
        return (
          <div className="flex flex-col items-center gap-4 w-full">
            <p className="text-gray-700 font-medium">
              Upload ketiga berkas berikut dalam format <b>PDF</b> (maks. 5MB per file).
            </p>
            <div className="flex flex-col gap-3 w-full max-w-md">
              <FileUploadRow label="CV" file={cv} onSelect={setCv} inputRef={cvRef} />
              <FileUploadRow label="Surat Pengantar Kampus" file={suratPengantar} onSelect={setSuratPengantar} inputRef={suratRef} />
              <FileUploadRow label="Proposal Magang" file={proposal} onSelect={setProposal} inputRef={proposalRef} />
            </div>
            {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
            <Button
              className="text-white bg-green-600 hover:bg-green-700 px-10 shadow-lg shadow-green-200 disabled:opacity-50"
              disabled={!cv || !suratPengantar || !proposal || uploading}
              onClick={handleUploadBerkas}
            >
              {uploading ? "Mengirim..." : "Kirim Berkas"}
            </Button>
          </div>
        );
      }

      return (
        <p className="text-gray-400 leading-relaxed italic">
          Tahap upload berkas akan tersedia setelah pengumuman hasil seleksi.
        </p>
      );
    }

    if (activePreview === "diterima") {
      if (isStatus("diterima")) {
        return (
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
        );
      }
      return (
        <p className="text-gray-400 leading-relaxed italic">
          Anda akan resmi diterima setelah berkas berhasil dikirim dan dikonfirmasi admin.
        </p>
      );
    }
  };

  const timelineData = getTimelineData();

  return (
    <div className="mt-10 mb-10">
      <h2 className="mb-14 text-xl font-semibold text-center">Timeline Kamu</h2>

      <div className="relative flex items-center justify-center mb-12">
        {timelineData.map((item, index) => (
          <div key={item.key} className="flex items-center">
            <div className="relative flex flex-col items-center">
              {isCurrent(item.key) && (
                <ArrowDown className="absolute -top-8 text-blue-600 animate-bounce" />
              )}
              <div
                onClick={() => setActivePreview(item.key)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm cursor-pointer hover:scale-125
                ${isActive(item.key) ? "bg-green-500 scale-110" : "bg-gray-200"}
                ${activePreview === item.key ? "ring-4 ring-blue-300" : ""}`}
              >
                {isActive(item.key) ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : (
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                )}
              </div>
              <span
                className={`mt-3 text-[10px] md:text-xs font-bold uppercase tracking-tighter text-center absolute top-10 w-24
                ${isActive(item.key) ? "text-gray-800" : "text-gray-400"}
                ${activePreview === item.key ? "text-blue-600" : ""}`}
              >
                {item.label}
              </span>
            </div>

            {index !== timelineData.length - 1 && (
              <div
                className={`w-16 md:w-24 h-[4px] mx-1 rounded-full transition-colors duration-500
                ${isActive(timelineData[index + 1].key) ? "bg-green-500" : "bg-gray-200"}`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="max-w-2xl p-8 mx-auto border-2 border-gray-50 rounded-2xl shadow-sm bg-white text-center mt-20 min-h-[120px] transition-all duration-300">
        {renderContent()}
      </div>

      <div className="mt-6 pt-6 border-t text-sm text-gray-500 space-y-1">
        <p>📅 Tanggal Pendaftaran: <b>{tanggalDaftar}</b></p>
        <p>📢 Estimasi Pengumuman: <b>{estimasiPengumuman}</b></p>
      </div>
    </div>
  );
};

export default Timeline;