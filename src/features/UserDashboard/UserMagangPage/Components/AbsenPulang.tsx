import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  onSuccess: () => void;
  onBack: () => void;
}

const AbsenPulang = ({ onSuccess, onBack }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Menunggu wajah...");

  useEffect(() => {
    let streamRef: MediaStream | null = null;
    let interval: any;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        streamRef = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // 🔥 AUTO SCAN SETIAP 2 DETIK
        interval = setInterval(() => {
          captureAndVerify();
        }, 2000);
      })
      .catch(() => {
        setStatus("❌ Kamera tidak dapat diakses");
      });

    return () => {
      if (streamRef) streamRef.getTracks().forEach((track) => track.stop());
      if (interval) clearInterval(interval);
    };
  }, []);

  const captureAndVerify = async () => {
    if (!videoRef.current || loading) return;

    setLoading(true);

    try {
      const canvas = document.createElement("canvas");

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
      }

      const imageBase64 = canvas.toDataURL("image/jpeg").split(",")[1];

      const token = localStorage.getItem("auth_token");

      if (!token) {
        setStatus("❌ Token tidak ditemukan");
        return;
      }

      const response = await fetch(
        "http://127.0.0.1:8000/api/absensi/verify-face",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            image: imageBase64,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setStatus("✅ Wajah dikenali. Absen pulang berhasil.");

        setTimeout(() => {
          onSuccess();
        }, 1000);
      } else {
        setStatus("❌ Wajah tidak cocok");
      }
    } catch (error) {
      console.error(error);
      setStatus("⚠️ Server AI tidak aktif");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">

      <h2 className="mb-4 text-lg font-semibold text-orange-600">
        Absen Pulang (Face Recognition)
      </h2>

      <div className="relative mx-auto mb-4 overflow-hidden border rounded-lg w-fit">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="max-w-full h-auto scale-x-[-1]"
        />
      </div>

      <p className="mb-4 text-sm text-gray-600">{status}</p>

      {loading && (
        <Loader2 className="mx-auto animate-spin text-orange-500" />
      )}

      <div className="flex justify-center gap-3">
        <Button variant="outline" onClick={onBack}>
          Kembali
        </Button>
      </div>

    </div>
  );
};

export default AbsenPulang;