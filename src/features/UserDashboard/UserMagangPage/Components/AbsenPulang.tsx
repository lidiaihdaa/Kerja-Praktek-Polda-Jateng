import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useEffect, useRef } from "react";

interface Props {
  onSuccess: () => void;
  onBack: () => void;
}

const AbsenPulang = ({ onSuccess, onBack }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });
  }, []);

  return (
    <div className="text-center">
      <h2 className="mb-4 text-lg font-semibold">Absen Pulang</h2>

      <video
        ref={videoRef}
        autoPlay
        className="mx-auto mb-4 border rounded-lg"
      />

      <div className="flex justify-center gap-3">
        <Button
          className="text-white bg-abu"
          onClick={() => {
            alert("Foto berhasil diambil");
            onSuccess();
          }}
        >
          <Camera className="mr-2" size={16} />
          Ambil Foto
        </Button>

        <Button variant="outline" onClick={onBack}>
          Kembali
        </Button>
      </div>
    </div>
  );
};

export default AbsenPulang; 
