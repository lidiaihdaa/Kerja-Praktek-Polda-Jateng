import { Button } from "@/components/ui/button";
import { Camera, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  onSuccess: () => void;
  onBack: () => void;
}

const AbsenPulang = ({ onSuccess, onBack }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let streamRef: MediaStream | null = null;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        streamRef = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });
    return () => {
      if (streamRef) streamRef.getTracks().forEach(track => track.stop());
    };
  }, []);

  const handleCaptureAndVerify = async () => {
    if (!videoRef.current) return;
    setLoading(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.drawImage(videoRef.current, 0, 0);
      const imageBase64 = canvas.toDataURL('image/jpeg');

      // 🔥 1. AMBIL TOKEN DARI LOCALSTORAGE
      const token = localStorage.getItem("auth_token");
      if (!token) {
        alert("Sesi Anda telah habis. Silakan login kembali.");
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/api/absensi/verify-face', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Accept': 'application/json',
          // 🔥 2. SELIPKAN TOKEN KE DALAM HEADERS
          'Authorization': `Bearer ${token}` 
        },
        // 🔥 3. HAPUS user_id: 1 (Biar Laravel baca dari token)
        body: JSON.stringify({ image: imageBase64 })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("✅ ABSEN PULANG BERHASIL! Hati-hati di jalan.");
        onSuccess();
      } else {
        alert("❌ ABSEN GAGAL: " + (result.message || "Wajah tidak dikenali"));
      }
    } catch (error) {
      alert("⚠️ Server Error. Pastikan AI Python Aktif.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h2 className="mb-4 text-lg font-semibold text-orange-600">Absen Pulang</h2>
      <div className="relative mx-auto mb-4 overflow-hidden border rounded-lg w-fit">
        <video ref={videoRef} autoPlay className="max-w-full h-auto scale-x-[-1]" />
      </div>
      <div className="flex justify-center gap-3">
        <Button className="text-white bg-orange-500 hover:bg-orange-600" disabled={loading} onClick={handleCaptureAndVerify}>
          {loading ? <Loader2 className="mr-2 animate-spin" size={16} /> : <Camera className="mr-2" size={16} />}
          Ambil Foto Pulang
        </Button>
        <Button variant="outline" onClick={onBack} disabled={loading}>Kembali</Button>
      </div>
    </div>
  );
};

export default AbsenPulang;