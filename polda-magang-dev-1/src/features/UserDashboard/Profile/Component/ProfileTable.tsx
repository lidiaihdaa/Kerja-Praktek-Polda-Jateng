import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { FileText, Loader2, Lock, Camera, Save } from "lucide-react";

const ProfileTable = () => {
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusMagang, setStatusMagang] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profileData, setProfileData] = useState({
    nama: "",
    email: "",
    no_hp: "",
    fakultas: "",
    foto: "" 
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // 🔥 PERBAIKAN 1: Gunakan nama kunci yang benar 'auth_token'
      const token = localStorage.getItem("auth_token"); 
      
      const response = await fetch("http://127.0.0.1:8000/api/profile", {
        headers: { 
          "Authorization": `Bearer ${token}`, 
          "Accept": "application/json" 
        }
      });
      const result = await response.json();
      
      if (response.ok && result.data) {
        setProfileData({
          nama: result.data.nama || "",
          email: result.data.email || "",
          no_hp: result.data.no_hp || "",
          fakultas: result.data.fakultas || "",
          foto: result.data.foto_profil || "" 
        });
        setStatusMagang(result.data.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateIdentity = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) return alert("Sesi habis, silakan login kembali.");

    // 🔥 PERBAIKAN 2: Cegah pengiriman data jika nama kosong
    if (!profileData.nama.trim()) {
        return alert("Nama Lengkap tidak boleh kosong!");
    }

    setIsUpdating(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/profile/update", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(profileData) 
      });

      if (response.ok) {
        alert("Berhasil memperbarui identitas!");
        fetchProfile();
      } else {
        const err = await response.json();
        alert("Gagal update: " + (err.message || "Unauthenticated"));
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const token = localStorage.getItem("auth_token");
    const formData = new FormData();
    
    // Harus 'foto' agar dibaca oleh $request->file('foto') di Laravel
    formData.append("foto", e.target.files[0]);
    
    // Kirim juga data nama agar tidak kena error "nama cannot be null"
    formData.append("nama", profileData.nama);
    formData.append("email", profileData.email);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/profile/update", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }, 
        body: formData // Jangan set Content-Type manual kalau pakai FormData
      });

      if (response.ok) {
        alert("Foto berhasil disimpan ke database!");
        fetchProfile(); // Refresh tampilan
      }
    } catch (error) {
      console.error("Gagal upload:", error);
    }
  }
};
  const isLocked = statusMagang !== "pengumuman_lolos" && statusMagang !== "berkas" && statusMagang !== "diterima";

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 gap-3">
      <Loader2 className="animate-spin text-abu" />
      <p className="font-bold text-abu">Memuat profil...</p>
    </div>
  );

  return (
    <div className="bg-white border shadow rounded-xl border-abu overflow-hidden">
      <div className="flex items-center gap-6 p-6 bg-abu">
        <div 
          className="relative flex items-center justify-center w-24 h-24 bg-white rounded-full overflow-hidden border-4 border-white/20 cursor-pointer group"
          onClick={() => fileInputRef.current?.click()}
        >
          {profileData.foto ? (
            <img src={`http://127.0.0.1:8000/storage/fotos/${profileData.foto}`} alt="foto_profil" className="object-cover w-full h-full" />
          ) : (
            <div className="text-[10px] font-bold text-abu">FOTO</div>
          )}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="text-white w-5 h-5" />
          </div>
          <input type="file" ref={fileInputRef} className="hidden" onChange={handlePhotoChange} accept="image/*" />
        </div>
        <div className="text-white">
          <h2 className="text-2xl font-bold">{profileData.nama || "Mahasiswa"}</h2>
          <p className="text-sm opacity-90">Universitas Dian Nuswantoro</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
        <div className="border rounded-md">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-bold text-gray-600">Nama Lengkap</TableCell>
                <TableCell><Input value={profileData.nama} onChange={(e) => setProfileData({...profileData, nama: e.target.value})} /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-gray-600">Email</TableCell>
                <TableCell><Input value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-gray-600">No. HP Aktif</TableCell>
                <TableCell><Input value={profileData.no_hp} onChange={(e) => setProfileData({...profileData, no_hp: e.target.value})} /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-gray-600">Fakultas</TableCell>
                <TableCell><Input value={profileData.fakultas} onChange={(e) => setProfileData({...profileData, fakultas: e.target.value})} /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex justify-end p-4 bg-gray-50/50">
            <Button onClick={handleUpdateIdentity} disabled={isUpdating} className="bg-abu flex gap-2 text-white hover:bg-abu/90">
              {isUpdating ? <Loader2 className="animate-spin" size={16}/> : <Save size={16}/>}
              UPDATE IDENTITAS
            </Button>
          </div>
        </div>

        <div className={`p-6 border rounded-md relative ${isLocked ? 'bg-gray-100' : 'bg-white'}`}>
          {isLocked && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-900/5 backdrop-blur-[1px]">
              <Lock className="w-8 h-8 text-abu mb-2" />
              <p className="text-[10px] font-bold text-abu uppercase text-center">Fitur Upload Terkunci<br/>Tunggu Pengumuman Lolos</p>
            </div>
          )}
          <h3 className="mb-6 font-bold text-gray-800 border-b pb-2">Berkas Persyaratan</h3>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400">CV (CURRICULUM VITAE)</label>
              <div className="flex items-center gap-3"><FileText className="text-abu" /><Input type="file" disabled={isLocked} /></div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400">SURAT PENGANTAR KAMPUS</label>
              <div className="flex items-center gap-3"><FileText className="text-abu" /><Input type="file" disabled={isLocked} /></div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400">PROPOSAL MAGANG</label>
              <div className="flex items-center gap-3"><FileText className="text-abu" /><Input type="file" disabled={isLocked} /></div>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <Button disabled={isLocked} className="bg-gray-300 px-10 text-white cursor-not-allowed">SIMPAN BERKAS</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTable;