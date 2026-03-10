import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRef, useEffect, useState } from "react"

interface Props {
  onNext?: (data:any,photos:string[])=>void
}

const DataDiriTab = ({onNext}:Props)=>{

  const videoRef = useRef<HTMLVideoElement>(null)

  const [instruction,setInstruction] = useState("Siap untuk verifikasi wajah")
  const [progress,setProgress] = useState(0)

  const [userId,setUserId] = useState<number|null>(null)

  const [capturedPhotos,setCapturedPhotos] = useState<string[]>([])

  const [formData,setFormData] = useState({
    nama:"",
    email:"",
    tempatLahir:"",
    tanggalLahir:"",
    noHp:"",
    instagram:"",
  })

  /* =====================
     AMBIL USER ID
  ===================== */

  const fetchProfile = async()=>{

    const token = localStorage.getItem("auth_token")

    const res = await fetch("http://127.0.0.1:8000/api/profile",{
      headers:{
        Authorization:`Bearer ${token}`,
        Accept:"application/json"
      }
    })

    const data = await res.json()

    const uid = data?.user_id || data?.data?.user_id

    if(uid){
      setUserId(uid)
    }

  }

  useEffect(()=>{
    fetchProfile()
  },[])

  /* =====================
     START CAMERA
  ===================== */

  const startCamera = async()=>{

    const stream = await navigator.mediaDevices.getUserMedia({
      video:true
    })

    if(videoRef.current){
      videoRef.current.srcObject = stream
    }

  }

  /* =====================
     CAPTURE FRAME
  ===================== */

  const captureFrame = ()=>{

    if(!videoRef.current) return null

    const video = videoRef.current

    const canvas = document.createElement("canvas")

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext("2d")

    if(!ctx) return null

    ctx.drawImage(video,0,0)

    return canvas.toDataURL("image/jpeg")

  }

  /* =====================
     VERIFICATION FLOW
  ===================== */

  const startVerification = async()=>{

    if(!userId){
      setInstruction("User belum terdeteksi")
      return
    }

    setInstruction("🔍 Mendeteksi wajah")
    setProgress(20)

    await new Promise(r=>setTimeout(r,2000))

    setInstruction("😉 Silakan kedipkan mata")
    setProgress(40)

    await new Promise(r=>setTimeout(r,2000))

    setInstruction("➡️ Hadapkan wajah ke kanan")
    setProgress(60)

    await new Promise(r=>setTimeout(r,2000))

    setInstruction("⬅️ Hadapkan wajah ke kiri")
    setProgress(80)

    await new Promise(r=>setTimeout(r,2000))

    setInstruction("📸 Mengambil gambar")
    setProgress(90)

    const image = captureFrame()

    await sendToAI(image)

  }

  /* =====================
     SEND TO AI
  ===================== */

  const sendToAI = async(image:string|null)=>{

    if(!image) return

    setInstruction("🤖 Memproses AI...")
    setProgress(100)

    const res = await fetch(
      "http://127.0.0.1:8001/face/register-realtime",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          user_id:userId,
          image:image
        })
      }
    )

    const data = await res.json()

    if(data.success){

      setInstruction("✅ Verifikasi wajah berhasil")

      setCapturedPhotos(["done"])

    }else{

      setInstruction("❌ Verifikasi gagal")

    }

  }

  /* =====================
     VALIDASI FORM
  ===================== */

  const isFormLengkap =
    capturedPhotos.length>0 &&
    Object.values(formData).every(v=>v!=="")

  /* =====================
     UI
  ===================== */

  return(

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

      {/* CAMERA */}

      <div className="flex flex-col items-center gap-4">

        <div className="relative w-72 h-72 flex items-center justify-center">

          <svg className="absolute w-full h-full -rotate-90">

            <circle
              cx="144"
              cy="144"
              r="130"
              stroke="#eee"
              strokeWidth="6"
              fill="transparent"
            />

            <circle
              cx="144"
              cy="144"
              r="130"
              stroke="#3b82f6"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={816}
              strokeDashoffset={816-(816*progress)/100}
              strokeLinecap="round"
            />

          </svg>

          <div className="w-60 h-60 rounded-full overflow-hidden border-4 border-white shadow-xl">

            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

          </div>

        </div>

        <p className="text-sm font-bold">{instruction}</p>

        {capturedPhotos.length===0 &&(

          <Button
            onClick={async()=>{
              await startCamera()
              startVerification()
            }}
          >
            Mulai Verifikasi Wajah
          </Button>

        )}

      </div>

      {/* FORM */}

      <div className="flex flex-col gap-4">

        <Input
          placeholder="Nama"
          onChange={(e)=>setFormData({...formData,nama:e.target.value})}
        />

        <Input
          placeholder="Email"
          onChange={(e)=>setFormData({...formData,email:e.target.value})}
        />

        <Input
          placeholder="Tempat Lahir"
          onChange={(e)=>setFormData({...formData,tempatLahir:e.target.value})}
        />

        <Input
          type="date"
          onChange={(e)=>setFormData({...formData,tanggalLahir:e.target.value})}
        />

        <Input
          placeholder="No HP"
          onChange={(e)=>setFormData({...formData,noHp:e.target.value})}
        />

        <Input
          placeholder="Instagram"
          onChange={(e)=>setFormData({...formData,instagram:e.target.value})}
        />

        <Button
          disabled={!isFormLengkap}
          onClick={()=>onNext?.(formData,capturedPhotos)}
        >
          NEXT
        </Button>

      </div>

    </div>

  )

}

export default DataDiriTab