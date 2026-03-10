import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Loader2, Camera, Save } from "lucide-react";

const ProfileTable = () => {

  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userId,setUserId] = useState<number | null>(null);

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

  try{

    const token = localStorage.getItem("auth_token");

    const res = await fetch("http://127.0.0.1:8000/api/profile",{
      headers:{
        Authorization:`Bearer ${token}`,
        Accept:"application/json"
      }
    });

    const data = await res.json();

    // TAMBAHKAN INI
    console.log("PROFILE RESPONSE FULL:", JSON.stringify(data, null, 2));

  }catch(err){

    console.error("Gagal mengambil profile",err);

  }

};

  const handleUpdateIdentity = async () => {

    const token = localStorage.getItem("auth_token");

    if (!token) {
      alert("Sesi habis, silakan login kembali.");
      return;
    }

    if (!profileData.nama.trim()) {
      return alert("Nama Lengkap tidak boleh kosong!");
    }

    setIsUpdating(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/profile/update",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(profileData),
        }
      );

      if (response.ok) {

        alert("Berhasil memperbarui identitas!");
        fetchProfile();

      } else {

        const err = await response.json();
        alert("Gagal update: " + (err.message || "Unauthenticated"));

      }

    } catch (error) {

      console.error(error);

    } finally {

      setIsUpdating(false);

    }

  };


  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files[0]) {

      const token = localStorage.getItem("auth_token");

      const formData = new FormData();

      formData.append("foto", e.target.files[0]);
      formData.append("nama", profileData.nama);
      formData.append("email", profileData.email);

      try {

        const response = await fetch(
          "http://127.0.0.1:8000/api/profile/update",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: formData,
          }
        );

        if (response.ok) {

          alert("Foto berhasil diperbarui!");
          fetchProfile();

        }

      } catch (error) {

        console.error("Gagal upload:", error);

      }

    }

  };


  if (loading)
    return (
      <div className="flex flex-col items-center justify-center p-20 gap-3">
        <Loader2 className="animate-spin text-gray-500" />
        <p className="font-bold text-gray-500">Memuat profil...</p>
      </div>
    );


  return (

    <div className="bg-white border shadow rounded-xl overflow-hidden">

      {/* HEADER PROFIL */}

      <div className="flex items-center gap-6 p-6 bg-gray-700 text-white">

        <div
          className="relative flex items-center justify-center w-24 h-24 bg-white rounded-full overflow-hidden cursor-pointer group"
          onClick={() => fileInputRef.current?.click()}
        >

          {profileData.foto ? (

            <img
              src={`http://127.0.0.1:8000/storage/fotos/${profileData.foto}`}
              alt="foto_profil"
              className="object-cover w-full h-full"
            />

          ) : (

            <div className="text-xs font-bold text-gray-600">
              FOTO
            </div>

          )}

          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="text-white w-5 h-5" />
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handlePhotoChange}
            accept="image/*"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold">
            {profileData.nama || "Mahasiswa"}
          </h2>

          <p className="text-sm opacity-90">
            Universitas Dian Nuswantoro
          </p>

        </div>

      </div>


      {/* DATA IDENTITAS */}

      <div className="p-6 border rounded-md">

        <Table>

          <TableBody>

            <TableRow>
              <TableCell className="font-bold text-gray-600">
                Nama Lengkap *
              </TableCell>
              <TableCell>
                <Input
                  value={profileData.nama}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      nama: e.target.value,
                    })
                  }
                />
              </TableCell>
            </TableRow>


            <TableRow>
              <TableCell className="font-bold text-gray-600">
                Email *
              </TableCell>
              <TableCell>
                <Input
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      email: e.target.value,
                    })
                  }
                />
              </TableCell>
            </TableRow>


            <TableRow>
              <TableCell className="font-bold text-gray-600">
                No HP *
              </TableCell>
              <TableCell>
                <Input
                  value={profileData.no_hp}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      no_hp: e.target.value,
                    })
                  }
                />
              </TableCell>
            </TableRow>


            <TableRow>
              <TableCell className="font-bold text-gray-600">
                Fakultas *
              </TableCell>
              <TableCell>
                <Input
                  value={profileData.fakultas}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      fakultas: e.target.value,
                    })
                  }
                />
              </TableCell>
            </TableRow>

          </TableBody>

        </Table>


        <div className="flex justify-end p-4">

          <Button
            onClick={handleUpdateIdentity}
            disabled={isUpdating}
            className="bg-gray-700 flex gap-2 text-white"
          >

            {isUpdating ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Save size={16} />
            )}

            UPDATE IDENTITAS

          </Button>

        </div>

      </div>

    </div>

  );

};

export default ProfileTable;