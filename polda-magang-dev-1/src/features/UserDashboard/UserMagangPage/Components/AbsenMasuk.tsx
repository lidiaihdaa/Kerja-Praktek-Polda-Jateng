import { Button } from "@/components/ui/button";
import { Camera, Loader2 } from "lucide-react"; // Tambahkan Loader untuk animasi loading
import { useEffect, useRef, useState } from "react";

interface Props {
  onSuccess: () => void;
  onBack: () => void;
}

const AbsenMasuk = ({ onSuccess, onBack }: Props) => {
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
      // 1. Ambil Frame Gambar
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      // Hapus if(ctx) satu baris dan jadikan blok agar lebih rapi
      if (ctx) {
         ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      }
      const imageBase64 = canvas.toDataURL('image/jpeg');

      // 🔥 AMBIL TOKEN DARI LOCALSTORAGE DENGAN NAMA YANG BENAR
      const token = localStorage.getItem("auth_token");
      
      if (!token) {
        alert("Sesi Anda telah habis. Silakan login kembali.");
        return;
      }

      // 2. Kirim ke API Laravel
      const response = await fetch('http://127.0.0.1:8000/api/absensi/verify-face', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 🔥 NYALAKAN AUTHORIZATION INI:
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          image: imageBase64
          // user_id: 1 tidak perlu dikirim lagi, karena Laravel akan membaca token-nya
        })
      });

      const result = await response.json();

      if (response.ok) {
        // Asumsi API mengembalikan status sukses tanpa properti .success
        alert("✅ ABSEN MASUK BERHASIL! Wajah Cocok.");
        onSuccess();
      } else {
        // Jika gagal karena wajah tidak cocok atau hal lain
        alert("❌ ABSEN GAGAL: " + (result.message || "Wajah tidak dikenali"));
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Gagal terhubung ke Server AI. Pastikan Python & Laravel jalan!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h2 className="mb-4 text-lg font-semibold">Absen Masuk</h2>

      <div className="relative mx-auto mb-4 overflow-hidden border rounded-lg w-fit">
        <video ref={videoRef} autoPlay className="max-w-full h-auto scale-x-[-1]" />
      </div>

      <div className="flex justify-center gap-3">
        <Button
          className="text-white bg-biru"
          disabled={loading}
          onClick={handleCaptureAndVerify}
        >
          {loading ? <Loader2 className="mr-2 animate-spin" size={16} /> : <Camera className="mr-2" size={16} />}
          {loading ? "Memproses..." : "Ambil Foto"}
        </Button>

        <Button variant="outline" onClick={onBack} disabled={loading}>
          Kembali
        </Button>
      </div>
    </div>
  );
};

export default AbsenMasuk;