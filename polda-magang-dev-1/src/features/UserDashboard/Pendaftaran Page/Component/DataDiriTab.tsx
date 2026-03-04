import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useEffect, useState } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";
import { UserCheck } from "lucide-react";

interface Props {
  onNext?: (data: any, photos: string[]) => void;
  initialData?: any;
  initialPhotos?: string[];
}

const DataDiriTab = ({ onNext, initialData, initialPhotos }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [instruction, setInstruction] = useState("Siap untuk pendaftaran");
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const [capturedPhotos, setCapturedPhotos] = useState<string[]>(
    initialPhotos || [],
  );

  const [formData, setFormData] = useState(
    initialData || {
      nama: "",
      email: "",
      tempatLahir: "",
      tanggalLahir: "",
      noHp: "",
      instagram: "",
    },
  );
  useEffect(() => {
    if (initialData) setFormData(initialData);
    if (initialPhotos) setCapturedPhotos(initialPhotos);
  }, [initialData, initialPhotos]);

  const stepRef = useRef(0);
  const progressRef = useRef(0);
  const photosKeranjang = useRef<string[]>([]);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    if (!isCameraActive) return;

    let streamTracks: MediaStream | null = null;
    let cameraInstance: cam.Camera | null = null;

    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
    });

    const grabFrame = () => {
      if (!videoRef.current) return null;
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(videoRef.current, 0, 0);
        return canvas.toDataURL("image/jpeg", 0.8);
      }
      return null;
    };

    faceMesh.onResults((results) => {
      if (
        !results.multiFaceLandmarks ||
        results.multiFaceLandmarks.length === 0
      ) {
        resetProgress();
        return;
      }

      const landmarks = results.multiFaceLandmarks[0];
      const currentStep = stepRef.current;

      const nose = landmarks[1].x;
      const cheekL = landmarks[234].x;
      const cheekR = landmarks[454].x;
      const distL = Math.abs(nose - cheekL);
      const distR = Math.abs(nose - cheekR);
      const eyeUpper = landmarks[159].y;
      const eyeLower = landmarks[145].y;
      const isEyeClosed = eyeLower - eyeUpper < 0.012;

      if (currentStep === 0) {
        if (isEyeClosed) {
          fillProgress(() => {
            const img = grabFrame();
            if (img) photosKeranjang.current.push(img);

            setStep(1);
            setInstruction("Bagus! Sekarang TENGOK KANAN");
          }, 25);
        }
      } else if (currentStep === 1) {
        if (distR / distL > 2.5) {
          fillProgress(() => {
            const img = grabFrame();
            if (img) photosKeranjang.current.push(img);

            setStep(2);
            setInstruction("Keren! Sekarang TENGOK KIRI");
          });
        } else {
          resetProgress();
        }
      } else if (currentStep === 2) {
        if (distL / distR > 2.5) {
          fillProgress(() => {
            const img = grabFrame();
            if (img) photosKeranjang.current.push(img);

            setStep(3);
            setInstruction("Terakhir, HADAP DEPAN & DIAM...");
          });
        } else {
          resetProgress();
        }
      } else if (currentStep === 3) {
        const faceCenterRatio = distL / (distR || 0.01);
        if (faceCenterRatio > 0.8 && faceCenterRatio < 1.2) {
          fillProgress(() => {
            const img = grabFrame();
            if (img) photosKeranjang.current.push(img);

            setStep(4);
            captureFinalProcess();
          }, 4);
        } else {
          resetProgress();
        }
      }
    });

    const fillProgress = (callback: () => void, speed = 10) => {
      if (progressRef.current < 100) {
        progressRef.current += speed;
        setProgress(progressRef.current);
      } else {
        progressRef.current = 0;
        setProgress(0);
        callback();
      }
    };

    const resetProgress = () => {
      if (stepRef.current !== 0) {
        progressRef.current = 0;
        setProgress(0);
      }
    };

    const captureFinalProcess = () => {
      setCapturedPhotos(photosKeranjang.current);
      setInstruction("Pendaftaran Wajah Berhasil");
      setIsCameraActive(false);
    };

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      streamTracks = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        cameraInstance = new cam.Camera(videoRef.current, {
          onFrame: async () => {
            if (videoRef.current && stepRef.current < 4) {
              await faceMesh.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 480,
        });
        cameraInstance.start();
      }
    });

    return () => {
      if (cameraInstance) cameraInstance.stop();
      if (streamTracks)
        streamTracks.getTracks().forEach((track) => track.stop());
      faceMesh.close();
    };
  }, [isCameraActive]);

  const isFormLengkap =
    capturedPhotos.length > 0 && Object.values(formData).every((v) => v !== "");

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* BAGIAN KIRI: SCAN KAMERA (Tetap Keren) */}
      <div className="flex flex-col items-center gap-6 p-4 border-r border-gray-100">
        <div className="space-y-1 text-center h-14">
          {isCameraActive || capturedPhotos.length > 0 ? (
            <>
              <h3
                className={`text-lg font-black uppercase tracking-tighter ${step === 4 ? "text-green-600" : "text-blue-700"}`}
              >
                {step === 4 ? "Terverifikasi" : "Scan Biometrik"}
              </h3>
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full animate-in fade-in slide-in-from-top-1">
                {instruction}
              </p>
            </>
          ) : (
            <h3 className="text-lg font-black uppercase tracking-tighter text-gray-400">
              Pendaftaran Wajah
            </h3>
          )}
        </div>

        <div className="relative w-72 h-72 flex items-center justify-center">
          {capturedPhotos.length === 0 && isCameraActive && (
            <svg className="absolute w-full h-full transform -rotate-90 z-10">
              <circle
                cx="144"
                cy="144"
                r="130"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-gray-100"
              />
              <circle
                cx="144"
                cy="144"
                r="130"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={816}
                strokeDashoffset={816 - (816 * progress) / 100}
                className="text-blue-500 transition-all duration-150 ease-out"
                strokeLinecap="round"
              />
            </svg>
          )}

          {capturedPhotos.length > 0 ? (
            <div className="w-60 h-60 border-4 border-green-500 rounded-full overflow-hidden flex flex-col items-center justify-center shadow-2xl relative">
              <img
                src={capturedPhotos[3] || capturedPhotos[0]}
                className="absolute inset-0 w-full h-full object-cover opacity-50"
                alt="Wajah Terdaftar"
              />
              <div className="bg-green-500 p-4 rounded-full text-white shadow-lg z-10">
                <UserCheck size={48} />
              </div>
            </div>
          ) : !isCameraActive ? (
            <div
              onClick={() => {
                setIsCameraActive(true);
                setStep(0);
                setProgress(0);
                progressRef.current = 0;
                photosKeranjang.current = [];
                if (!initialPhotos) {
                  setCapturedPhotos([]);
                }
                setInstruction("Posisikan wajah, lalu KEDIPKAN MATA");
              }}
              className="group w-60 h-60 border-2 border-gray-200 border-dashed rounded-full bg-white flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/30 transition-all duration-500 shadow-sm"
            >
              <div className="relative mb-3 text-gray-300 group-hover:text-blue-500 transition-colors duration-500">
                <div className="absolute inset-0 scale-150 blur-xl bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                  <path d="M12 4c4.4 0 8 3.6 8 8 0 1.1-.2 2.1-.6 3" />
                  <circle cx="12" cy="13" r="1" />
                </svg>
              </div>
              <p className="text-[11px] font-black text-gray-400 group-hover:text-blue-600 transition-colors uppercase tracking-widest">
                Mulai Scan
              </p>
              <span className="text-[9px] text-gray-300 mt-1 uppercase italic">
                Ketuk untuk menyalakan kamera
              </span>
            </div>
          ) : (
            <div className="w-60 h-60 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-black relative">
              <video
                ref={videoRef}
                className="w-full h-full object-cover scale-x-[-1]"
                autoPlay
                playsInline
                muted
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent h-1/2 animate-scan opacity-40 pointer-events-none" />
            </div>
          )}
        </div>

        {!capturedPhotos.length && (
          <div className="w-full max-w-[200px]">
            {isCameraActive && (
              <>
                <div className="flex justify-between text-[9px] font-black text-gray-400 uppercase mb-2">
                  <span>Proses Scan</span>
                  <span>{step + 1}/4</span>
                </div>
                <div className="flex gap-2 justify-center">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-500 ${step > i ? "bg-green-500" : step === i ? "bg-blue-500" : "bg-gray-100"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* BAGIAN KANAN: FORM INPUT (Gaya Standar Sesuai Gambar) */}
      <div className="flex flex-col gap-5 py-4 pl-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <Input
            name="nama"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            placeholder="Masukkan Nama Lengkap"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            type="email"
            placeholder="Masukkan Email"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Tempat Lahir <span className="text-red-500">*</span>
            </label>
            <Input
              name="tempatLahir"
              value={formData.tempatLahir}
              onChange={(e) =>
                setFormData({ ...formData, tempatLahir: e.target.value })
              }
              placeholder="Masukkan Tempat Lahir"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Tanggal Lahir <span className="text-red-500">*</span>
            </label>
            <Input
              type="date"
              value={formData.tanggalLahir}
              onChange={(e) =>
                setFormData({ ...formData, tanggalLahir: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            No. WhatsApp <span className="text-red-500">*</span>
          </label>
          <Input
            name="noHp"
            value={formData.noHp}
            onChange={(e) => setFormData({ ...formData, noHp: e.target.value })}
            placeholder="Masukkan Nomor WhatsApp"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Instagram <span className="text-red-500">*</span>
          </label>
          <Input
            name="instagram"
            value={formData.instagram}
            onChange={(e) =>
              setFormData({ ...formData, instagram: e.target.value })
            }
            placeholder="Masukkan Username Instagram"
          />
        </div>

        <div className="flex justify-end pt-4 mt-2">
          <Button
            className={`px-8 h-10 rounded text-sm font-semibold transition-all ${isFormLengkap ? "bg-slate-500 text-white hover:bg-slate-600" : "bg-gray-300 text-gray-100"}`}
            disabled={!isFormLengkap}
            onClick={() => onNext?.(formData, capturedPhotos)}
          >
            NEXT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataDiriTab;
