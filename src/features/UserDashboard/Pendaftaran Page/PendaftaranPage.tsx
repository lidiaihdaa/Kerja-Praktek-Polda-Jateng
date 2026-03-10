import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import DataDiriTab from "./Component/DataDiriTab";
import DataKampusTab from "./Component/DataKampusTab";
import DataMagangTab from "./Component/DataMagang";

const PendaftaranPage = () => {
  const [activeTab, setActiveTab] = useState("data-diri");
  const [isLoading, setIsLoading] = useState(false);
  const [unlockedTabs, setUnlockedTabs] = useState({
    dataDiri: true,
    dataKampus: false,
    dataMagang: false,
  });

  const [globalData, setGlobalData] = useState<{
    photos: string[];
    dataDiri: any;
    dataKampus: any;
  }>({
    photos: [],
    dataDiri: null,
    dataKampus: null,
  });

  // Fungsi MAJU
  const handleNextFromDataDiri = (data: any, capturedPhotos: string[]) => {
    setGlobalData((prev) => ({
      ...prev,
      dataDiri: data,
      photos: capturedPhotos,
    }));
    setUnlockedTabs((prev) => ({ ...prev, dataKampus: true }));
    setActiveTab("data-kampus");
  };

  const handleNextFromDataKampus = (data: any) => {
    setGlobalData((prev) => ({ ...prev, dataKampus: data }));
    setUnlockedTabs((prev) => ({ ...prev, dataMagang: true }));
    setActiveTab("data-magang");
  };

  // Fungsi MUNDUR
  const handleBackToDataDiri = () => setActiveTab("data-diri");
  const handleBackToDataKampus = () => setActiveTab("data-kampus");

  const handleSubmitAll = async (dataMagang: any) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("auth_token");

      const formData = new FormData();

      const allData = {
        ...globalData.dataDiri,
        ...globalData.dataKampus,
        ...dataMagang,
      };

      for (const key in allData) {
        if (key === "anggota" && Array.isArray(allData[key])) {
          allData[key].forEach((a: any, i: number) => {
            formData.append(`anggota[${i}][nama]`, a.nama);
            formData.append(`anggota[${i}][email]`, a.email);
            formData.append(`anggota[${i}][nim]`, a.nim);
            formData.append(`anggota[${i}][tgl_lahir]`, a.tgl_lahir);
            formData.append(`anggota[${i}][universitas]`, a.universitas);
            formData.append(`anggota[${i}][jurusan]`, a.jurusan);

            if (a.cv) formData.append(`anggota[${i}][cv]`, a.cv);
            if (a.surat_pengantar)
              formData.append(
                `anggota[${i}][surat_pengantar]`,
                a.surat_pengantar,
              );
            if (a.proposal)
              formData.append(`anggota[${i}][proposal]`, a.proposal);
          });
        } else {
          const value = allData[key];

          if (value instanceof File) {
            formData.append(key, value);
          } else if (value !== null && value !== undefined) {
            formData.append(key, value);
          }
        }
      }

      Object.entries(allData).forEach(([key, value]) => {
        if (key === "anggota" && Array.isArray(value)) {
          value.forEach((anggota: any, i: number) => {
            formData.append(`anggota[${i}][nama]`, anggota.nama);
            formData.append(`anggota[${i}][email]`, anggota.email);
            formData.append(`anggota[${i}][nim]`, anggota.nim);
            formData.append(`anggota[${i}][tgl_lahir]`, anggota.tgl_lahir);
            formData.append(`anggota[${i}][universitas]`, anggota.universitas);
            formData.append(`anggota[${i}][jurusan]`, anggota.jurusan);

            if (anggota.cv) formData.append(`anggota[${i}][cv]`, anggota.cv);

            if (anggota.surat_pengantar)
              formData.append(
                `anggota[${i}][surat_pengantar]`,
                anggota.surat_pengantar,
              );

            if (anggota.proposal)
              formData.append(`anggota[${i}][proposal]`, anggota.proposal);
          });
        } else if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== null && value !== undefined) {
          formData.append(key, value as any);
        }
      });

      const response = await fetch(
        "http://127.0.0.1:8000/api/register-peserta",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: formData,
        },
      );

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Pendaftaran Berhasil! Data Anda telah tersimpan di Database.");
        window.location.href = "/user/dashboard";
      } else {
        let pesanError = result.message || "Terjadi kesalahan";

        if (result.errors) {
          const detail = Object.values(result.errors).flat().join("\n- ");
          pesanError += "\n\nDetail Kesalahan:\n- " + detail;
        }

        alert("Gagal mendaftar: " + pesanError);
      }
    } catch (error) {
      alert("Terjadi kesalahan jaringan saat menyimpan data.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white border rounded-md shadow border-abu">
        <div className="p-6 border-b border-abu">
          <h1 className="text-2xl font-semibold">Pendaftaran Peserta Magang</h1>
        </div>

        <div className="p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="data-diri" disabled>
                DATA DIRI
              </TabsTrigger>
              <TabsTrigger value="data-kampus" disabled>
                DATA KAMPUS
              </TabsTrigger>
              <TabsTrigger value="data-magang" disabled>
                DATA MAGANG
              </TabsTrigger>
            </TabsList>

            <TabsContent value="data-diri">
              <DataDiriTab onNext={handleNextFromDataDiri} />
            </TabsContent>
            <TabsContent value="data-kampus">
              <DataKampusTab
                onNext={handleNextFromDataKampus}
                onBack={handleBackToDataDiri}
              />
            </TabsContent>
            <TabsContent value="data-magang">
              <div className="relative">
                <DataMagangTab
                  onSubmit={handleSubmitAll}
                  onBack={handleBackToDataKampus}
                />
                {isLoading && (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center font-bold text-blue-600">
                    Menyimpan data ke database...
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PendaftaranPage;
